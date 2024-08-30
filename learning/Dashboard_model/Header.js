import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleBellClick = () => {
    setShowNav(!showNav);
    if (showProfile) setShowProfile(false);
  };

  const handleUserClick = () => {
    setShowProfile(!showProfile);
    if (showNav) setShowNav(false);
  };

  return (
    <header className="header">
      <center><title>Student Dashboard</title></center>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
     
      <div className="header-icons">
        <span className="icon" onClick={handleBellClick}>🔔</span>
        <span className="icon" onClick={handleUserClick}>👤</span>
      </div>
      
      {showProfile && (
        <div className="profile-details">
          <img src="user-image-placeholder.png" alt="User" className="profile-img" />
          <p className="profile-name">John Doe</p>
          <p className="profile-email">john.doe@example.com</p>
          <button className="btn">Logout</button>
        </div>

        

      )}
    </header>
  );
}


export default Header;
