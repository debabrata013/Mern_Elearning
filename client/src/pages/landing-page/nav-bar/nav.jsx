import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './nav.css';
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-wrapper">
        <div className="nav-island merged-island">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-icon">
              <div className="logo-lines">
                <div className="logo-line"></div>
                <div className="logo-line"></div>
              </div>
            </div>
            <div className="logo-text">
              <span className="logo-ezy">DIGI</span>
              <span className="logo-skills">TORIA</span>
            </div>
          </div>

          {/* Navigation Section */}
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <a 
              href="/" 
              className={`nav-link ${isActiveLink('/') ? 'active-link' : ''}`}
            >
              Home
            </a>
            <a 
              href="/coursess" 
              className={`nav-link ${isActiveLink('/coursess') ? 'active-link' : ''}`}
            >
              Courses
            </a>
            <a 
              href="/pricing" 
              className={`nav-link ${isActiveLink('/pricing') ? 'active-link' : ''}`}
            >
              Pricing
            </a>
            <a 
              href="/faq" 
              className={`nav-link ${isActiveLink('/faq') ? 'active-link' : ''}`}
            >
              FAQ
            </a>
            <a 
              href="/contactus" 
              className={`nav-link ${isActiveLink('/contactus') ? 'active-link' : ''}`}
            >
              Contact Us
            </a>
            <a 
              href="/aboutus" 
              className={`nav-link ${isActiveLink('/aboutus') ? 'active-link' : ''}`}
            >
              About Us
            </a>
          </div>

          <div className="auth-buttons" >
          <Link to="/log">
      <button className="get-started-button">
        Get Started
      </button>
    </Link>
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;