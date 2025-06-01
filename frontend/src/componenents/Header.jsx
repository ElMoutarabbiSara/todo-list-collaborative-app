// src/components/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="header">
      <h1>To-Do Dashboard</h1>
      <div className="user-info">
        {user && <span>{user.name}</span>}
        <button onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/';
        }}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
