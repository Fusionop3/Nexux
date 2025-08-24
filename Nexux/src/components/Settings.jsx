// src/components/Settings.jsx
import React, { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="settings">
      <h3>Profile</h3>
      <div className="profile">
        <img src="https://via.placeholder.com/80" alt="Profile" />
        <p><strong>John Doe</strong></p>
        <p>johndoe@example.com</p>
      </div>

      <h3>Preferences</h3>
      <div className="toggle">
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          Dark Mode
        </label>
      </div>

      <h3>Storage</h3>
      <div className="storage-bar">
        <div className="used" style={{ width: "65%" }}></div>
      </div>
      <p>6.5 GB of 10 GB used</p>
    </div>
  );
};

export default Settings;
