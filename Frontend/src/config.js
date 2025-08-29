// API Configuration
const config = {
  // For development, use localhost
  // For production, use your deployed backend URL
  API_BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://nexux.onrender.com'
    : 'http://localhost:3000'
};

export default config;
