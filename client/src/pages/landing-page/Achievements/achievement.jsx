// src/components/Achievements/Achievements.js
import React from 'react';
import './achievement.css';
import images1 from './achiev.png';
import images2 from './book.png';
import images3 from './teacher.png';

function Achievements() {
  return (
    <section className="achievements">
      <h2 className="achievements-title">
        <span className="title-primary">Our </span>
        <span className="title-secondary">Achievements</span>
      </h2>
      
      <div className="achievements-container">
        <div className="achievements-left">
          <img 
            src={images1}
            alt="Achievement illustration" 
            className="achievement-image"
          />
        </div>

        <div className="achievements-right">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">100</div>
              <div className="stat-description">
              <img src={images2} alt="Students icon" className="stat-icon"/>
                <span>Students Trained</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">50</div>
              <div className="stat-description">
                <img src={images3} alt="Courses icon" className="stat-icon"/>
                <span>Courses Available</span>
              </div>
            </div>

            <div className="stat-card wide">
              <div className="stat-number">70%</div>
              <div className="stat-description">
                Students Secured Jobs in Level 1 Companies
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;