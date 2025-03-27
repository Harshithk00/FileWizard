// import { S3 } from "aws-sdk";
// import { NextResponse } from "next/server";

// // Initialize AWS S3
// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// export async function GET() {
//   try {
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Prefix: "uploads/", // Only list files under the "uploads/" directory
//     };

//     const data = await s3.listObjectsV2(params).promise();

//     const files = data.Contents.map((file) => ({
//       key: file.Key,
//       lastModified: file.LastModified,
//     }));
    
//     return NextResponse.json({ files });
//   } catch (error) {
    
//     console.error("Error listing files:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

// export async function GET(request) {
//   try {
//     // Initialize the S3 client
//     const s3Client = new S3Client({
//       region: process.env.AWS_REGION || 'ap-south-1',
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
//       },
//     });

//     // Prepare the list objects command
//     const listParams = {
//       Bucket: process.env.S3_BUCKET_NAME || 'your-bucket-name',
//       MaxKeys: 100, // Limit to 100 files
//     };

//     const command = new ListObjectsV2Command(listParams);

//     // List objects in the bucket
//     const response = await s3Client.send(command);

//     // Extract file keys
//     const files = response.Contents?.map(obj => ({ key: obj.Key })) || [];

//     return NextResponse.json({ files }, { status: 200 });
//   } catch (err) {
//     console.error('Error listing files:', err);
//     return NextResponse.json({ error: 'Error listing files' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function GET(request) {
  try {
    console.log("Hello1")
    const region = 'ap-south-1';
    const bucketName = process.env.S3_BUCKET_NAME;
    console.log("hello2")
    if (!bucketName) {
      console.log("hello3")
      return NextResponse.json({ error: 'S3 Bucket name is not configured' }, { status: 500 });
    }
    console.log("hello4")
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

    // Prepare the list objects command
    const listParams = {
      Bucket: bucketName,
      MaxKeys: 100, // Limit to 100 files
    };

    const command = new ListObjectsV2Command(listParams);

    // List objects in the bucket
    const response = await s3Client.send(command);

    // Extract file keys
    const files = response.Contents?.map(obj => ({ key: obj.Key })) || [];

    return NextResponse.json({ files }, { status: 200 });
  } catch (err) {
    console.error('Error listing files:', err);
    return NextResponse.json({ 
      error: 'Error listing files', 
      details: err.message 
    }, { status: 500 });
  }
}