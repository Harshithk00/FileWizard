import { NextResponse } from 'next/server';
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from '@/lib/s3';
import { verifyToken } from '@/utils/jwt';
import { poolAuth } from '@/utils/db';

export async function GET(req) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      MaxKeys: 100
    });
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' },{status:401});
    }
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' },{status:401})
    }
    const userId = decodedToken.username;

    const user = await poolAuth.query("SELECT * FROM users WHERE username = $1", [userId], (error, results) => {NextResponse.json({ error: 'Unauthorized' },{status:401})});
    

    const response = await s3Client.send(command);

    // Generate pre-signed URLs for each file
    const filesWithUrls = await Promise.all(
      (response.Contents || []).map(async (file) => {
        const downloadCommand = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.Key
        });

        const url = await getSignedUrl(s3Client, downloadCommand, { 
          expiresIn: 600 // URL valid for 1 hour
        });

        return {
          key: file.Key,
          originalName: file.Key.split('-').slice(-1).join('-'), // Remove UUID prefix
          lastModified: file.LastModified,
          size: file.Size,
          downloadUrl: url
        };
      })
    );

    return NextResponse.json({ 
      files: filesWithUrls,
      total: filesWithUrls.length
    }, { status: 200 });

  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json({ 
      error: 'Failed to list files', 
      details: error.message 
    }, { status: 500 });
  }
}

