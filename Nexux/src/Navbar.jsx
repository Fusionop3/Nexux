// src/Navbar.jsx
import React from 'react';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://placehold.co/40x40/white/white" alt="NEXUS" className="logo-icon" />
        <span className="logo-text">NEXUS</span>
      </div>
      <div className="navbar-links">
        <a href="#features" className="navbar-link">Features</a>
        <a href="#pricing" className="navbar-link">Pricing</a>
        <a href="#contact" className="navbar-link">Contact</a>
      </div>
      <div className="navbar-menu-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;