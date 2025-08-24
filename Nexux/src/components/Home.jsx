// src/components/Home.jsx
import React from "react";

const dummyFiles = [
  { id: 1, name: "Report.pdf", size: "1.2 MB", date: "Aug 20, 2025" },
  { id: 2, name: "Photo.png", size: "2.5 MB", date: "Aug 18, 2025" },
  { id: 3, name: "Notes.txt", size: "300 KB", date: "Aug 15, 2025" },
];

const Home = () => {
  return (
    <div className="file-grid">
      {dummyFiles.map((file) => (
        <div key={file.id} className="file-card">
          <div className="file-icon">📄</div>
          <div className="file-info">
            <h4>{file.name}</h4>
            <p>{file.size} • {file.date}</p>
          </div>
          <div className="file-actions">
            <button>Preview</button>
            <button>Download</button>
            <button>Share</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
