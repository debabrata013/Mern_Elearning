// src/components/Mentors/Mentors.js
import React, { useEffect, useRef } from 'react';
import './mentors.css';

function Mentors() {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const cards = document.querySelectorAll('.mentor-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mentors">
      <div className="mentors-title">
        <h2>
          <span className="title-primary">Meet Our Professional</span><br />
          <span className="title-secondary">Mentors & Trainers</span>
        </h2>
      </div>

      <div className="mentors-container">
        <div className="mentor-card" ref={cardRef}>
          <div className="best-trainer">
            <span className="trophy-icon">🏆</span>
            BEST TRAINER
          </div>
          
          <div className="mentor-profile">
            <div className="mentor-avatar">
              {/* Avatar image will be imported */}
            </div>
            
            <div className="mentor-info">
              <h3>Sandeep</h3>
              <p className="mentor-specialty">.Net & Azure</p>
              
              <div className="rating">
                <div className="stars">
                  {'★'.repeat(4)}{'☆'.repeat(1)}
                </div>
                <span className="reviews">72 Reviews</span>
              </div>
              
              <div className="stats">
                <div className="stat">
                  <span className="icon">📚</span>
                  <span>39 Modules</span>
                </div>
                <div className="stat">
                  <span className="icon">👥</span>
                  <span>375 Students</span>
                </div>
              </div>
              
              <p className="mentor-description">
                Sandeep is a Software Developer who expertised in .NET & Azure 
                for more than 24 years and training 100's of students to 
                accomplish their goals & dreams.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mentor-card">
          <div className="mentor-profile">
            <div className="mentor-avatar">
              {/* Avatar image will be imported */}
            </div>
            
            <div className="mentor-info">
              <h3>Sudhansu</h3>
              <p className="mentor-specialty">Cloud & Cyber Security, Forensic</p>
              
              <div className="rating">
                <div className="stars">
                  {'★'.repeat(4)}{'☆'.repeat(1)}
                </div>
                <span className="reviews">38 Reviews</span>
              </div>
              
              <div className="stats">
                <div className="stat">
                  <span className="icon">📚</span>
                  <span>27 Modules</span>
                </div>
                <div className="stat">
                  <span className="icon">👥</span>
                  <span>169 Students</span>
                </div>
              </div>
              
              <p className="mentor-description">
                Sudhansu is a Software Developer who expertised in Cloud security,
                Cyber Security, Data Center & Forensic for more than 22 years and
                training 100's of students to accomplish their goals & dreams.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Mentors;