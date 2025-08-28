import React, { useState } from "react";
import axios from "axios";
import "./UploadModal.css";
import { FaTimes, FaCloudUploadAlt, FaCheckCircle, FaExclamationCircle, FaClock } from "react-icons/fa";

const UploadModal = ({ onClose, onUploadStart, onUploadSuccess, onUploadFailure }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("pending");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file.");
      return;
    }

    setUploading(true);
    setUploadStatus("pending");
    setUploadMessage("Uploading...");
    onUploadStart(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus("uploaded");
      setUploadMessage(`File "${file.name}" uploaded successfully!`);
      onUploadSuccess(file.name);

      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setUploadStatus("failed");
      setUploadMessage("File upload failed. Please try again.");
      setUploading(false);
      console.error("Upload error:", error);
      onUploadFailure(file.name);

      setTimeout(() => onClose(), 2000);
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-card">
        <button className="close-btn" onClick={onClose} disabled={uploading}>
          <FaTimes />
        </button>
        <h2 className="upload-title">Upload File</h2>
        <p className="upload-subtitle">Drag and drop or click to select a file</p>
        <label htmlFor="fileInput" className="upload-box">
          <FaCloudUploadAlt className="upload-icon" />
          <p className="upload-text">
            {file ? file.name : "Drop your file here"}
          </p>
          <input type="file" id="fileInput" hidden onChange={handleFileChange} />
        </label>
        {uploadMessage && (
          <p className={`status-message status-${uploadStatus}`}>
            {uploadStatus === "uploaded" && <FaCheckCircle />}
            {uploadStatus === "failed" && <FaExclamationCircle />}
            {uploadStatus === "pending" && <FaClock />}
            {uploadMessage}
          </p>
        )}
        <div className="upload-actions">
          <button className="cancel-btn" onClick={onClose} disabled={uploading}>
            Cancel
          </button>
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
