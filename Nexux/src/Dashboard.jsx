// src/Dashboard.jsx
import React, { useState } from "react";
import UploadModal from "./Uploadmodal";
import "./Dashboard.css";
import {
  FaHome,
  FaUpload,
  FaShareAlt,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // "home" | "uploads" | "shared" | "settings"
  const [query, setQuery] = useState("");

  // Dummy data (UI only)
  const files = [
    { id: 1, name: "example.pdf", size: "1.2 MB", date: "Aug 20, 2025" },
    { id: 2, name: "screenshot.png", size: "2.5 MB", date: "Aug 18, 2025" },
    { id: 3, name: "notes.txt", size: "300 KB", date: "Aug 15, 2025" },
  ];
  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  const uploadsHistory = [
    { id: 1, name: "video.mp4", status: "Uploaded" },
    { id: 2, name: "music.mp3", status: "Pending" },
    { id: 3, name: "design.fig", status: "Failed" },
  ];

  const sharedFiles = [
    { id: 1, name: "project.zip", link: "https://dummy.link/123" },
    { id: 2, name: "invoice.pdf", link: "https://dummy.link/456" },
  ];

  const handleLogout = () => {
    // UI-only logout; route back to landing if you want
    window.location.href = "/";
  };

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <div className="file-grid">
          {filteredFiles.length === 0 ? (
            <div className="empty-state">No files found.</div>
          ) : (
            filteredFiles.map((file) => (
              <div key={file.id} className="file-card">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-meta">
                    {file.size} • {file.date}
                  </p>
                </div>
                <div className="file-actions">
                  <button className="pill-btn">Preview</button>
                  <button className="pill-btn">Download</button>
                  <button className="pill-btn">Share</button>
                  <button className="pill-btn danger">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activeTab === "uploads") {
      return (
        <div className="upload-list">
          <h3>Upload History</h3>
          <ul>
            {uploadsHistory.map((u) => (
              <li key={u.id}>
                <span>{u.name}</span>
                <span
                  className={`status-badge ${u.status.toLowerCase()}`}
                  title={u.status}
                >
                  {u.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (activeTab === "shared") {
      return (
        <div className="shared-list">
          <h3>Shared Files</h3>
          {sharedFiles.map((f) => (
            <div key={f.id} className="shared-card">
              <p className="shared-name">{f.name}</p>
              <div className="shared-controls">
                <input type="text" value={f.link} readOnly />
                <button
                  className="pill-btn"
                  onClick={() => navigator.clipboard.writeText(f.link)}
                >
                  Copy Link
                </button>
                <button className="pill-btn danger">Unshare</button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // settings
    return (
      <div className="settings">
        <h3>Profile</h3>
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/72"
            alt="avatar"
            className="avatar"
          />
          <div>
            <p className="profile-name">John Doe</p>
            <p className="profile-email">john@example.com</p>
          </div>
        </div>

        <h3>Preferences</h3>
        <div className="prefs">
          <label className="toggle">
            <input type="checkbox" />
            <span>Dark Mode</span>
          </label>
        </div>

        <h3>Storage</h3>
        <div className="storage-bar">
          <div className="used" style={{ width: "65%" }} />
        </div>
        <p>6.5 GB of 10 GB used</p>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">NEXUX</h2>
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
          <li
            className={activeTab === "shared" ? "active" : ""}
            onClick={() => setActiveTab("shared")}
          >
            <FaShareAlt /> Shared
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog /> Settings
          </li>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
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

        {/* Tab Content */}
        <div className="content">{renderContent()}</div>
      </div>

      {/* Upload Modal */}
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
