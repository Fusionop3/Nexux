// src/UploadModal.jsx
import React, { useState } from "react";
import "./Uploadmodal.css";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";

const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading:", file.name);
      // your upload logic here
      onClose();
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-card">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="upload-title">Upload File</h2>
        <p className="upload-subtitle">Drag and drop or click to select a file</p>

        {/* Upload Box */}
        <label htmlFor="fileInput" className="upload-box">
          <FaCloudUploadAlt className="upload-icon" />
          <p className="upload-text">
            {file ? file.name : "Drop your file here"}
          </p>
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={handleFileChange}
          />
        </label>

        {/* Action Buttons */}
        <div className="upload-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
