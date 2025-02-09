"use client";
import classes from "@/Styles/Fileupload.module.css";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", `${file.name}`);

    try {
      setUploadStatus("Uploading...");

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus("Upload failed");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className={`${classes.all}`}>
      <h1 className={classes.heading}>File Upload</h1>
      <div className={classes.upload}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <input
            type="file"
            onChange={handleFileChange}
            className={classes.input}
          />
          <button type="submit" className={classes.button}>
            Upload File
          </button>
        </form>
        {uploadStatus && <p className={classes.uploadStatus}>{uploadStatus}</p>}
      </div>
    </div>
  );
}
