// import { S3 } from "aws-sdk";
// import multer from "multer";
// import {nextConnect} from "next-connect";
// import { NextResponse } from "next/server";

// // Initialize AWS S3
// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Configure multer to store files in memory temporarily
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Initialize nextConnect to use multer middleware for file uploads
// const handler = nextConnect();

// // Handle POST requests for file upload
// handler.use(upload.single("file"));

// handler.post(async (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const fileName = `${Date.now()}_${file.originalname}`;
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `uploads/${fileName}`, // File will be uploaded in the "uploads/" folder
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   };

//   try {
//     const uploadResult = await s3.upload(params).promise();
//     res.status(200).json({
//       message: "File uploaded successfully",
//       fileKey: uploadResult.Key, // Return the S3 object key
//     });
//   } catch (error) {
//     console.error("S3 Upload Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export { handler as POST };


// import {nextConnect} from 'next-connect';
// import multer from 'multer';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// // Set up Multer for file upload handling
// const upload = multer({
//   storage: multer.memoryStorage(), // Store files in memory
// });

// const handler = nextConnect();

// // Apply Multer middleware to handle file upload
// handler.use(upload.single('file')); // 'file' is the name of the input field in the form

// // Handle POST request
// handler.post(async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // Initialize the S3 client
//   const s3Client = new S3Client({
//     region: 'ap-south-1', // Mumbai region
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//   });

//   // Prepare the S3 upload parameters
//   const uploadParams = {
//     Bucket: 'your-bucket-name',
//     Key: req.file.originalname, // Use the original file name
//     Body: req.file.buffer, // File buffer from memory
//   };

//   const command = new PutObjectCommand(uploadParams);

//   try {
//     // Upload the file to S3
//     await s3Client.send(command);
//     res.status(200).json({ message: 'File uploaded successfully' });
//   } catch (err) {
//     console.error('Error uploading file:', err);
//     res.status(500).json({ error: 'Error uploading file' });
//   }
// });

// export default handler;


import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { verifyToken } from '@/utils/jwt';
import { poolAuth } from '@/utils/db';

export async function POST(request) {
  const token = req.cookies.get('token')?.value;
  
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' },{status:401});
    }

  try {
    // Parse the form data
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' },{status:401})
    }
    const userId = decodedToken.username;

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const region = 'ap-south-1';
    const bucketName = process.env.S3_BUCKET_NAME;

    if (!bucketName) {
      return NextResponse.json({ error: 'S3 Bucket name is not configured' }, { status: 500 });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    // Prepare the S3 upload parameters
    const uploadParams = {
      Bucket: bucketName,
      Key: `${Date.now()}-${file.name}`, // Unique filename to prevent overwrites
      Body: buffer, // File buffer
      ContentType: file.type, // Preserve the original file type
    };

    const command = new PutObjectCommand(uploadParams);

    // Upload the file to S3
    await s3Client.send(command);

    const pgFile = await poolAuth.query(
      'INSERT INTO files (user_id, file_name) VALUES ($1, $2) RETURNING id',
      [userId, uploadParams.Key] // Assuming user_id is 1 for demonstration
    );
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      fileName: uploadParams.Key 
    }, { status: 200 });
  } catch (err) {
    console.error('Error uploading file:', err);
    return NextResponse.json({ 
      error: 'Error uploading file', 
      details: err.message 
    }, { status: 500 });
  }
}