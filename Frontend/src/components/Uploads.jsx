import React from "react";
import { FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import "../Dashboard.css";

const statusIcon = {
  uploaded: <FaCheckCircle className="status-icon uploaded" />,
  pending: <FaClock className="status-icon pending" />,
  failed: <FaTimesCircle className="status-icon failed" />,
};

// 👈 Component now accepts a 'files' prop
const Uploads = ({ files }) => {
  return (
    <div className="uploads-container">
      <h3 className="section-title">Upload History</h3>
      <div className="upload-table">
        {files.length === 0 ? (
          <div className="empty-state">You haven't uploaded any files yet.</div>
        ) : (
          files.map((file, index) => (
            <div className="upload-row" key={index}>
              <div className="upload-left">
                <FaFileAlt className="file-icon" />
                <span className="upload-name">{file.originalName}</span>
              </div>
              <span className={`status-badge ${file.status}`}>
                {statusIcon[file.status]} {file.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Uploads; 