// src/components/Shared.jsx
import React from "react";

const sharedFiles = [
  { id: 1, name: "Project.zip", link: "https://dummy.link/123" },
  { id: 2, name: "Invoice.pdf", link: "https://dummy.link/456" },
];

const Shared = () => {
  return (
    <div className="shared-list">
      <h3>Shared Files</h3>
      {sharedFiles.map((file) => (
        <div key={file.id} className="shared-card">
          <p><strong>{file.name}</strong></p>
          <input type="text" value={file.link} readOnly />
          <button onClick={() => navigator.clipboard.writeText(file.link)}>
            Copy Link
          </button>
          <button>Unshare</button>
        </div>
      ))}
    </div>
  );
};

export default Shared;
