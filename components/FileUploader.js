"use client";
import React, { useState, useEffect } from "react";
import "../Styles/FileUploader.css";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/list-files");
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      setFilesList(data.files || []);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      alert("File uploaded successfully!");
      fetchFiles();
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    }
  };

  const handleGetFileUrl = async (fileKey) => {
    try {
      const response = await fetch("/api/file-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate pre-signed URL");
      }

      const data = await response.json();
      setFileUrl(data.url);
      window.open(data.url, '_blank');
    } catch (error) {
      console.error(error);
      alert("Failed to fetch file URL.");
    }
  };

  const handleDeleteFile = async (fileKey) => {
    try {
      const response = await fetch("/api/delete-file", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      alert("File deleted successfully!");
      fetchFiles();
    } catch (error) {
      console.error(error);
      alert("Failed to delete file.");
    }
  };

  const handleEditFileName = async (fileKey) => {
    try {
      const response = await fetch("/api/rename-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          fileKey, 
          newFileName 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rename file");
      }

      alert("File renamed successfully!");
      fetchFiles();
      setEditingFile(null);
      setNewFileName("");
    } catch (error) {
      console.error(error);
      alert("Failed to rename file.");
    }
  };

  return (
    <div className="file-management-container">
      <h1 className="page-title">File Management</h1>
      
      <div className="content-wrapper">
        {/* File Upload Section */}
        <div className="upload-section">
          <h2 className="section-title">Upload New File</h2>
          <div className="file-input-wrapper">
            <input 
              type="file" 
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <button 
            onClick={handleUpload} 
            disabled={!file}
            className="upload-button"
          >
            Upload File
          </button>
        </div>

        {/* Files List Section */}
        <div className="files-section">
          <h2 className="section-title">Uploaded Files</h2>
          <div className="files-list-wrapper">
            {filesList.length === 0 ? (
              <p className="empty-state">No files uploaded yet</p>
            ) : (
              <div className="files-list">
                {filesList.map((file) => (
                  <div 
                    key={file.key} 
                    className="file-item"
                  >
                    {editingFile === file.key ? (
                      <div className="file-rename-wrapper">
                        <input 
                          type="text" 
                          value={newFileName}
                          onChange={(e) => setNewFileName(e.target.value)}
                          className="rename-input"
                          placeholder="New file name"
                        />
                        <button 
                          onClick={() => handleEditFileName(file.key)}
                          className="save-button"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingFile(null)}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="file-name">{file.key}</span>
                        <div className="file-actions">
                          <button 
                            onClick={() => handleGetFileUrl(file.key)}
                            className="view-button"
                            title="View File"
                          >
                            👁️
                          </button>
                          <button 
                            onClick={() => {
                              setEditingFile(file.key);
                              setNewFileName(file.key);
                            }}
                            className="edit-button"
                            title="Rename File"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteFile(file.key)}
                            className="delete-button"
                            title="Delete File"
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;