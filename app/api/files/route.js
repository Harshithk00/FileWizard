import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";
import { poolAuth } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "@/utils/jwt";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.username;
    console.log(req.body);
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ error: "No fileName" }, { status: 400 });
    }
    const uuid = uuidv4();
    const fileName = formData.get("fileName");
    const fileName1 = fileName.split(".")[0];
    const fileExtension = fileName.split(".")[0];
    const newFileName = `${uuid}-${fileName1}.${fileExtension}`;

    console.log(fileName + "." + fileExtension);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: newFileName, // Use the new fileName,
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    poolAuth.query(
      "INSERT INTO files (userid, uuid, filename, extension) VALUES ($1, $2, $3, $4)",
      [userId, uuid, fileName, fileExtension]
    );

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        fileName,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "File upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// "SELECT 
//     *
// FROM 
//     files f
// JOIN 
//     users u ON f.userid = u.username
// WHERE 
//     f.userid LIKE '%1@1%';"