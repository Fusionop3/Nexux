// App.jsx
import './App.css';
import { useState, useEffect } from 'react';
import Auth from './Auth';
import Dashboard from './Dashboard';
import logo from './assets/logo.jpg'; 
import { auth } from './firebase';   // ✅ firebase auth import
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [page, setPage] = useState("landing");

  useEffect(() => {
    // Firebase listener to check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPage("dashboard"); // user logged in
      } else {
        setPage("landing"); // user not logged in
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      {page === "landing" && (
        <div className="landing-page">
          {/* Navbar */}
          <nav className="navbar">
            <div className="navbar-logo">
              <img src={logo} alt="NEXUX" className="logo-icon" />
              <span className="logo-text">NEXUX</span>
            </div>
            <div className="navbar-links">
              <button className="cta-button small" onClick={() => setPage("auth")}>
                Log in / Sign up
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <header className="hero-section">
            <h1 className="hero-headline">Effortless File Sharing. Securely.</h1>
            <p className="hero-subheadline">
              Share, store, and access your files from anywhere, anytime.
            </p>
            <button className="cta-button" onClick={() => setPage("auth")}>
              Get Started
            </button>
          </header>

          {/* Features Section */}
          <section className="features-section" id="features">
            <div className="feature-card">
              <img src="https://placehold.co/64x64/8E89EE/white?text=S" alt="Secure Storage" />
              <h3>Secure Storage</h3>
              <p>Keep your files safe with end-to-end encryption and robust security.</p>
            </div>
            <div className="feature-card">
              <img src="https://placehold.co/64x64/8E89EE/white?text=C" alt="Easy Collaboration" />
              <h3>Easy Collaboration</h3>
              <p>Share files and folders with a single click and manage access permissions.</p>
            </div>
            <div className="feature-card">
              <img src="https://placehold.co/64x64/8E89EE/white?text=A" alt="Anywhere, Anytime Access" />
              <h3>Anywhere, Anytime Access</h3>
              <p>Access your files from any device, whether you're at your desk or on the go.</p>
            </div>
          </section>
        </div>
      )}

      {page === "auth" && (
        <Auth onBack={() => setPage("landing")} onSuccess={() => setPage("dashboard")} />
      )}

      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;
