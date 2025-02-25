import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './achievement.css';
import images1 from './achiev.png';
import images2 from './book.png';
import images3 from './teacher.png';

function Achievements() {
  const [numbers, setNumbers] = useState({
    studentsTrained: 0,
    coursesAvailable: 0,
    jobPercentage: 0,
  });

  const achievementsRef = useRef(null);

  const animateNumbers = async (key, apiUrl, duration) => {
    try {
      const response = await axios.get(apiUrl);
      const targetValue = response.data || 0; // Ensure a valid number

      let startValue = 0;
      const increment = Math.ceil(targetValue / (duration / 10));

      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= targetValue) {
          startValue = targetValue;
          clearInterval(timer);
        }
        setNumbers((prevNumbers) => ({
          ...prevNumbers,
          [key]: startValue,
        }));
      }, 10);
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  const handleIntersection = async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      animateNumbers('studentsTrained', 'http://localhost:4400/data/totalstudent', 2000);
      animateNumbers('coursesAvailable', 'http://localhost:4400/data/totalcourse', 2000);
      animateNumbers('jobPercentage', 'http://localhost:4400/data/totalteacher', 2000);
    } else {
      setNumbers({ studentsTrained: 0, coursesAvailable: 0, jobPercentage: 0 });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5, // Trigger when 50% of the section is visible
    });

    const currentRef = achievementsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="achievements" ref={achievementsRef}>
      <h2 className="achievements-title">
        <span className="title-primary">Our </span>
        <span className="title-secondary">Achievements</span>
      </h2>

      <div className="achievements-container">
        <div className="achievements-left">
          <img src={images1} alt="Achievement illustration" className="achievement-image" />
        </div>

        <div className="achievements-right">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{numbers.studentsTrained}</div>
              <div className="stat-description">
                <img src={images2} alt="Students icon" className="stat-icon" />
                <span>Students Trained</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">{numbers.coursesAvailable}</div>
              <div className="stat-description">
                <img src={images3} alt="Courses icon" className="stat-icon" />
                <span>Courses Available</span>
              </div>
            </div>

            <div className="stat-card wide">
              <div className="stat-number">{numbers.jobPercentage}%</div>
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
