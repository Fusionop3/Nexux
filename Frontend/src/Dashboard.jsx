import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadModal from "./UploadModal";
import Settings from "./components/Settings";
import Uploads from "./components/Uploads";
import "./Dashboard.css";
import {
  FaHome,
  FaUpload,
  FaShareAlt,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaPlus,
  FaDownload,
  FaTrash,
} from "react-icons/fa";
import { logout } from "./firebase";
import logo from './assets/logo.jpg'; // 👈 Import the logo file

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);
  const [shareMessage, setShareMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadQueue, setUploadQueue] = useState([]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://nexux.onrender.com/");
      const sortedFiles = response.data.sort(
        (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
      );
      setFiles(sortedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadStart = (file) => {
    setUploadQueue((prevQueue) => [
      ...prevQueue,
      { originalName: file.name, status: "pending" },
    ]);
    setActiveTab("uploads");
  };

  const handleUploadEnd = (fileName, status) => {
    setUploadQueue((prevQueue) =>
      prevQueue.map((item) =>
        item.originalName === fileName ? { ...item, status } : item
      )
    );
    if (status === "uploaded") {
      fetchFiles();
    }
  };

  const handleDelete = async (filename) => {
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      try {
        await axios.delete(`https://nexux.onrender.com/delete/${filename}`);
        alert("File deleted successfully!");
        fetchFiles();
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Failed to delete file.");
      }
    }
  };

  const handleDownload = (filename) => {
    window.location.href = `https://nexux.onrender.com/download/${filename}`;
  };

  const handleShare = (filename) => {
    const shareLink = `https://nexux.onrender.com/download/${filename}`;
    navigator.clipboard.writeText(shareLink);
    setShareMessage(`Download link copied to clipboard!`);
    setTimeout(() => {
      setShareMessage("");
    }, 3000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  };

  const filteredFiles = files.filter((f) =>
    f.Key.toLowerCase().includes(query.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return <div className="loading-state">Loading files...</div>;
    }

    if (activeTab === "home") {
      return (
        <div className="file-grid">
          {filteredFiles.length === 0 ? (
            <div className="empty-state">No files found.</div>
          ) : (
            filteredFiles.map((file) => (
              <div key={file.Key} className="file-card">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <p className="file-name">{file.Key}</p>
                  <p className="file-meta">
                    {(file.Size / 1024).toFixed(2)} KB •{" "}
                    {new Date(file.LastModified).toLocaleDateString()}
                  </p>
                </div>
                <div className="file-actions">
                  <button
                    className="pill-btn"
                    onClick={() => handleDownload(file.Key)}
                  >
                    <FaDownload /> Download
                  </button>
                  <button
                    className="pill-btn"
                    onClick={() => handleShare(file.Key)}
                  >
                    <FaShareAlt /> Share
                  </button>
                  <button
                    className="pill-btn danger"
                    onClick={() => handleDelete(file.Key)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }
    if (activeTab === "uploads") return <Uploads files={uploadQueue} />;

    if (activeTab === "shared") {
      return (
        <div className="shared-list">
          <h3>Shared Files</h3>
          <p>This section will list files you have shared with others.</p>
        </div>
      );
    }
    return <Settings />;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <img src={logo} alt="NEXUX Logo" className="logo-icon" />
          NEXUX
        </h2>
        <ul>
          <li
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            <FaHome /> Home
          </li>
          <li
            className={activeTab === "uploads" ? "active" : ""}
            onClick={() => setActiveTab("uploads")}
          >
            <FaUpload /> Uploads
          </li>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <div className="main-content">
        {shareMessage && <div className="share-message">{shareMessage}</div>}
        <div className="topbar">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files..."
            />
          </div>
          <button className="upload-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Upload
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>

      {showModal && (
        <UploadModal
          key="upload-modal"
          onClose={() => setShowModal(false)}
          onUploadStart={handleUploadStart}
          onUploadSuccess={(fileName) => handleUploadEnd(fileName, "uploaded")}
          onUploadFailure={(fileName) => handleUploadEnd(fileName, "failed")}
        />
      )}
    </div>
  );
};

export default Dashboard;
