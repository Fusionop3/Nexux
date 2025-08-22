// src/Auth.jsx
import { useState } from 'react';

const Auth = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleSignIn = () => {
    // Implement Firebase Google Auth here
    console.log("Signing in with Google...");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Logging in...");
    } else {
      // Handle signup logic
      console.log("Signing up...");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="auth-button">{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>
        <div className="divider">Or</div>
        <button className="google-auth-button" onClick={handleGoogleSignIn}>
          <img src="https://placehold.co/20x20" alt="Google" className="google-logo" />
          Continue with Google
        </button>
        <p className="toggle-auth-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;