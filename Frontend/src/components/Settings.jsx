// src/components/Settings.jsx
import React from "react";
import { FaLock, FaBell, FaCog } from "react-icons/fa";

const Settings = () => {
  // Mock user data to display
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://i.pravatar.cc/150?img=1", // A random avatar service
    storageUsed: 7.2,
    storageTotal: 10,
  };

  return (
    <div className="settings-container">
      <h3 className="section-title">Profile</h3>
      <div className="profile-card">
        <img
          src={user.avatar}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p className="profile-name">
            <strong>{user.name}</strong>
          </p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <h3 className="section-title">Security & Preferences</h3>
      <div className="settings-options">
        <div className="pill-btn">
          <FaLock />
          <span>Change Password</span>
        </div>
        <div className="pill-btn">
          <FaBell />
          <span>Notification Settings</span>
        </div>
        <div className="pill-btn">
          <FaCog />
          <span>General Preferences</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;