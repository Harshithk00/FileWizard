"use client";
import classes from "@/styles/Filedownload.module.css";
import { useState, useEffect } from "react";

export default function FilesList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/filed");

        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const data = await response.json();
        setFiles(data.files);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  // Handle file download
  const handleDownload = async (url, originalName) => {
    console.log(url, originalName);
    if (!url || typeof url !== "string") {
      console.error("Invalid URL:", url);
      return;
    }
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Create download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.all}>
      <h1 className="text-3xl font-bold mb-6 text-center">Uploaded Files</h1>
      {files.length === 0 ? (
        <p className="text-center text-gray-500">No files found</p>
      ) : (
        <div className={classes.fileCards}>
          {files.map((file) => (
            <div
              class={classes.card}
              key={file.key}
            >
              <h3 class={classes.filename}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes.svg1}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{height: "24px", width: "24px"}}
                 
                >
                  <path
                   
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    onclick={() => handleDownload(file.downloadUrl, file.originalName)}
                  />
                </svg>
                {file.originalName}
              </h3>

              <p class={classes.filesize}>Size: {formatFileSize(file.size)}</p>
              <p class={classes.filedate}>
                Date LastModified: {formatDate(file.lastModified)}
              </p>
              <div class={classes.cardactions}>
                <button class={classes.sharebtn} onclick="shareFile()">
                  Share
                </button>
                <button class={classes.deletebtn} onclick="deleteFile()">
                  Delete
                </button>
              </div>
            </div> 
          ))}
        </div>
      )}
    </div>
  );
}


// <div
            //   key={file.key}
            //   className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            //   onClick={() => handleDownload(file.downloadUrl, file.originalName)}
            // >
            //   <div className="flex justify-between items-center mb-4">
            //     <h2 className="text-xl font-semibold truncate">{file.originalName}</h2>
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   className="h-6 w-6 text-blue-500"
                //   fill="none"
                //   viewBox="0 0 24 24"
                //   stroke="currentColor"
                //   style={{height: "24px", width: "24px"}}
                // >
                //   <path
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //     strokeWidth={2}
                //     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                //   />
                // </svg>
            //   </div>
            //   <div className="text-gray-600">
            //     <p>Size: {formatFileSize(file.size)}</p>
            //     <p>Uploaded: {formatDate(file.lastModified)}</p>
            //   </div>
            //   <hr></hr>
            // </div>