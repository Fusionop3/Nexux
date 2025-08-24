// src/components/Uploads.jsx
import React from "react";

const uploads = [
  { id: 1, name: "Video.mp4", status: "Uploaded" },
  { id: 2, name: "Music.mp3", status: "Pending" },
  { id: 3, name: "Design.fig", status: "Failed" },
];

const Uploads = () => {
  return (
    <div className="upload-list">
      <h3>Upload History</h3>
      <ul>
        {uploads.map((file) => (
          <li key={file.id}>
            {file.name} — <span className={`status ${file.status.toLowerCase()}`}>{file.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Uploads;
