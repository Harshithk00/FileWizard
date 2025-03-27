// import { S3 } from "aws-sdk";
// import { NextResponse } from "next/server";

// // Initialize AWS S3
// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// export async function POST(req) {
//   try {
//     const { fileKey } = await req.json();

//     if (!fileKey) {
//       return NextResponse.json({ error: "File key is required" }, { status: 400 });
//     }

//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: fileKey,
//       Expires: 60 * 5, // URL will expire in 5 minutes
//     };
//     const signedUrl = s3.getSignedUrl("getObject", params);

//     return NextResponse.json({
//       message: "Pre-signed URL generated successfully",
//       url: signedUrl,
//     });
//   } catch (error) {
//     console.error("Error generating pre-signed URL:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// export async function POST(request) {
//   try {
//     // Parse the request body
//     const { fileKey } = await request.json();

//     if (!fileKey) {
//       return NextResponse.json({ error: 'File key is required' }, { status: 400 });
//     }

//     // Initialize the S3 client
//     const s3Client = new S3Client({
//       region: process.env.AWS_REGION || 'ap-south-1',
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
//       },
//     });

//     // Create a command to get the object
//     const command = new GetObjectCommand({
//       Bucket: process.env.S3_BUCKET_NAME || 'your-bucket-name',
//       Key: fileKey,
//     });

//     // Generate a pre-signed URL
//     const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour

//     return NextResponse.json({ url }, { status: 200 });
//   } catch (err) {
//     console.error('Error generating pre-signed URL:', err);
//     return NextResponse.json({ error: 'Error generating file URL' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(request) {
  try {
    // Parse the request body
    const { fileKey } = await request.json();

    if (!fileKey) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 });
    }

    const region = 'ap-south-1';
    const bucketName = process.env.S3_BUCKET_NAME;

    if (!bucketName) {
      return NextResponse.json({ error: 'S3 Bucket name is not configured' }, { status: 500 });
    }

    // Initialize the S3 client with explicit configuration for ap-south-1
    const s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
      endpoint: `https://s3.${region}.amazonaws.com`,
      forcePathStyle: true,
    });

    // Create a command to get the object
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    // Generate a pre-signed URL
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour

    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error('Error generating pre-signed URL:', err);
    return NextResponse.json({ 
      error: 'Error generating file URL', 
      details: err.message 
    }, { status: 500 });
  }
}