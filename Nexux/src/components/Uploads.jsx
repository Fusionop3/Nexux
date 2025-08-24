import React from "react";
import { FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const uploads = [
  { id: 1, name: "Video.mp4", status: "Uploaded" },
  { id: 2, name: "Music.mp3", status: "Pending" },
  { id: 3, name: "Design.fig", status: "Failed" },
];

const statusIcon = {
  Uploaded: <FaCheckCircle className="status-icon uploaded" />,
  Pending: <FaClock className="status-icon pending" />,
  Failed: <FaTimesCircle className="status-icon failed" />,
};

const Uploads = () => {
  return (
    <div>
      <h3 className="section-title">Upload History</h3>
      <div className="upload-table">
        {uploads.map((file) => (
          <div className="upload-row" key={file.id}>
            <FaFileAlt className="file-icon" />
            <span className="upload-name">{file.name}</span>
            <span className={`status-badge ${file.status.toLowerCase()}`}>
              {statusIcon[file.status]} {file.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;