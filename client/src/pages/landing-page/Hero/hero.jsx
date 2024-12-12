import React, { useState } from 'react';
import './hero.css';
import imgs from './landing.svg';
import magnifyingGlass from './search.png';
const LandingSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="content-wrapper">
      <div className="content-left">
        <h1 className="main-heading">Skill Your Way<br />Up To Success<br />With Us</h1>
        <p className="main-description">Get the skills you need for<br />the future of work.</p>

        <div 
          className={`search-bar ${isFocused || searchTerm ? 'expanded' : ''}`}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => {
            if (!searchTerm) setIsFocused(false);
          }}
        >
          <input
            type="text"
            placeholder="Search the course you want"
            className="search-input"
            value={searchTerm}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!searchTerm) setIsFocused(false);
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className={`search-button ${searchTerm ? 'active' : ''}`} 
            onClick={handleSearch}
          >
            {searchTerm ? 'Search' : <img src={magnifyingGlass} alt="Search Icon" className="search-icon" />}
          </button>
        </div>

        <div className="course-tags">
          <button className="tag-button primary-tag">Cloud Computing</button>
          <button className="tag-button">Cyber Security</button>
          <button className="tag-button">DevOps</button>
          <button className="tag-button">Data Science</button>
          <button className="tag-button">Software Testing</button>
        </div>
      </div>

      <div className="content-right">
        <img className="home-img" src={imgs} alt="Display" />
      </div>
    </div>
  );
};

export default LandingSection;