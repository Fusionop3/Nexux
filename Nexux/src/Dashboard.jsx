import React, { useState } from "react";
import UploadModal from "./Uploadmodal";
import Uploads from "./components/Uploads";
import Settings from "./components/Settings";
import "./Dashboard.css";
import {
  FaHome,
  FaUpload,
  FaShareAlt,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaPlus,
  FaEye,
  FaDownload,
  FaTrash,
} from "react-icons/fa";
import { logout } from "./firebase";  // 👈 logout import

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");

  const files = [
    { id: 1, name: "example.pdf", size: "1.2 MB", date: "Aug 20, 2025" },
    { id: 2, name: "screenshot.png", size: "2.5 MB", date: "Aug 18, 2025" },
    { id: 3, name: "notes.txt", size: "300 KB", date: "Aug 15, 2025" },
  ];
  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  const sharedFiles = [
    { id: 1, name: "project.zip", link: "https://dummy.link/123" },
    { id: 2, name: "invoice.pdf", link: "https://dummy.link/456" },
  ];

  // 🔹 logout handler
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth.jsx"; // 👈 redirect to login
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
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
                  <button className="pill-btn">
                    <FaEye /> Preview
                  </button>
                  <button className="pill-btn">
                    <FaDownload /> Download
                  </button>
                  <button className="pill-btn">
                    <FaShareAlt /> Share
                  </button>
                  <button className="pill-btn danger">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }
    if (activeTab === "uploads") return <Uploads />;
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
    return <Settings />;
  };

  return (
    <div className="dashboard-container">
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

      <div className="main-content">
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

      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;