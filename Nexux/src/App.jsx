// src/App.jsx
import './App.css';
import { useState } from 'react';
import Navbar from './Navbar';
import Auth from './Auth';

function App() {
  const [showAuth, setShowAuth] = useState(false);

  const handleBackToLanding = () => {
    setShowAuth(false);
  };

  return (
    <div className="app-container">
      {showAuth ? (
        <Auth onBack={handleBackToLanding} />
      ) : (
        <div className="landing-page">
          <Navbar />
          <header className="hero-section">
            <h1 className="hero-headline">Effortless File Sharing. Securely.</h1>
            <p className="hero-subheadline">
              Share, store, and access your files from anywhere, anytime.
            </p>
            <button className="cta-button" onClick={() => setShowAuth(true)}>
              Get Started
            </button>
          </header>

          <section className="features-section">
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
    </div>
  );
}

export default App;