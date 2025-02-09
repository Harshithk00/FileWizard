import { NextResponse } from 'next/server';
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from '@/lib/s3';

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      // Optional: limit the number of files
      MaxKeys: 20
    });

    const response = await s3Client.send(command);

    // Map the S3 objects to a more manageable format
    const files = response.Contents?.map(file => ({
      key: file.Key,
      lastModified: file.LastModified,
      size: file.Size
    })) || [];

    return NextResponse.json({ 
      files,
      total: files.length
    }, { status: 200 });

  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json({ 
      error: 'Failed to list files', 
      details: error.message 
    }, { status: 500 });
  }
}