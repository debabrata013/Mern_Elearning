import React, { useEffect, useRef } from 'react';
import './SkillDevelopment.css';
import image1 from './Groupicons-1.png';
import image2 from './Groupicons-2.png';
import image3 from './Groupicons-3.png';
import image4 from './Groupicons.png';
import groupImage from './Group 2224.png';
import master from './working.png';

const SkillDevelopment = () => {
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = skillRef.current.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-development" ref={skillRef}>
      <div className="who-can-join">
        <h3 className="section-subtitle fade-in">WHO CAN JOIN</h3>
        <h2 className="section fade-in">Skill Development<br />Schemes For All</h2>

        <div className="join-content fade-in">
          <div className="join-categories">
            <div className="category-item fade-in">
              <div className="category-number">01</div>
              <img src={image1} className="category-icon" alt="Colleges/Universities" />
              <p className="category-title">Individuals/Working Professionals</p>
            </div>
            <div className="category-item fade-in">
              <div className="category-number">02</div>
              <img src={image2} className="category-icon" alt="Startups" />
              <p className="category-title">Startups</p>
            </div>
            <div className="category-item fade-in">
              <div className="category-number">03</div>
              <img src={image3} className="category-icon" alt="Corporates" />
              <p className="category-title">Corporates</p>
            </div>
            <div className="category-item fade-in">
              <div className="category-number">04</div>
              <img src={image4} className="category-icon" alt="Colleges/Universities" />
              <p className="category-title">Colleges/Universities</p>
            </div>
          </div>
          <div className="illustration fade-in">
            <img src={master} alt="Learning illustration" />
          </div>
        </div>
      </div>

      <div className="how-it-works fade-in">
        <h2 className="workflow-title">How It Works</h2>
        <div className="workflow-container">
          <div className="workflow-endpoint start fade-in">
            <img className="image" src={groupImage} alt="Group" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopment;
