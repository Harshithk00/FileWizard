'use client';

import { useState, useEffect } from 'react';

export default function FilesList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/filelist');
        
        if (!response.ok) {
          throw new Error('Failed to fetch files');
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
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return <div className="text-center mt-10">Loading files...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Files in S3 Bucket</h1>
      {files.length === 0 ? (
        <p className="text-center">No files found</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">File Name</th>
              <th className="border p-2 text-left">Size</th>
              <th className="border p-2 text-left">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.key} className="hover:bg-gray-50">
                <td className="border p-2">{file.key}</td>
                <td className="border p-2">{formatFileSize(file.size)}</td>
                <td className="border p-2">{formatDate(file.lastModified)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}