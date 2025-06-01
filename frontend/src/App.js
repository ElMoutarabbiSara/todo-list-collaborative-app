import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Account from './Account';
import TaskList from './TaskList';
import Dashboard from './componenents/Dashboard';
import './App.css'; // main styles

function AuthPage({ onLoginSuccess }) {
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => setShowRegister(prev => !prev);

  return (
    
    <div className="auth-container">
      <div className="welcome-form">
        <h2>👋 Welcome to <span className="brand">FocusFlow</span></h2>
        <p>Your collaborative to-do list and project manager.</p>
      </div>

      <div className="auth-form">
        {showRegister ? (
          <>
            <Register />
            <p className="form-toggle">
              Already have an account?{' '}
              <button className="toggle-btn" onClick={toggleForm}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLoginSuccess={onLoginSuccess} />
            <p className="form-toggle">
              Don't have an account?{' '}
              <button className="toggle-btn" onClick={toggleForm}>Register</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    console.log('Logged in user:', user);
    localStorage.setItem('user', JSON.stringify(user));
    navigate(`/account/${user.id}`);
  };

  return (
    <Routes>
      <Route path="/" element={<AuthPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/account/:id" element={<Dashboard><Account /></Dashboard>} />
      <Route path="/projects/:projectId" element={<Dashboard><TaskList /></Dashboard>} />
    </Routes>
  );
}

export default App;
