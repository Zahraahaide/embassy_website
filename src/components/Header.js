import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import '../styles/Header.css';

function Header({ user, onSignOut }) {
  return (
    <header className="header">
      <div className="logo">Embassy Logo</div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/visas">Visas</Link></li>
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="auth-button">
        {user ? (
          <div className="user-info">
            <FaUser className="user-icon" />
            <span>{user.name}</span>
            <button onClick={onSignOut}>Sign Out</button>
          </div>
        ) : (
          <Link to="/signin" className="signin-button">
            <FaUser className="user-icon" />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;