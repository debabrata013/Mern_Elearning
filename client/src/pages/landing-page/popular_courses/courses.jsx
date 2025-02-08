import React, { useEffect, useRef } from 'react';
import './courses.css';
import ajs from './Ajs.png';
import aws from './aws.png';
import vue from './viewjs.png';
import bi from './PBI.png';
import pyy from './pyh.png';
import reat from './reactjs.png';
import sele from './selenium.png';
import core from './coreui.png';

const courses = [
  {
    id: 1,
    logo: ajs,
    title: 'Angular JS',
    description: 'A JavaScript-based open-source front-end web framework for developing single-page applications.',
  },
  {
    id: 2,
    logo: aws,
    title: 'AWS',
    description: 'AWS Coaching and Certification helps you build and validate your skills so you can get more out of the cloud.',
  },
  {
    id: 3,
    logo: vue,
    title: 'Vue JS',
    description: 'An open-source model with front end JavaScript framework for building user interfaces & single-page applications.',
  },
  {
    id: 4,
    logo: bi,
    title: 'Power BI',
    description: 'An interactive data visualization software developed by Microsoft with a primary focus on business intelligence.',
  },
  {
    id: 5,
    logo: pyy,
    title: 'Python',
    description: 'Python is an interpreted high-level general-purpose programming language.',
  },
  {
    id: 6,
    logo: reat,
    title: 'React JS',
    description: 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.',
  },
  {
    id: 7,
    logo: sele,
    title: 'Software Testing',
    description: 'The process of evaluating and verifying that a software product or application does what it is supposed to do.',
  },
  {
    id: 8,
    logo: core,
    title: 'Core UI',
    description: 'Learn the fastest way to build a modern dashboard for any platform, browser, or device.',
  },
];

const Courses = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('fade-in-bottom');
        } else {
          sectionRef.current.classList.remove('fade-in-bottom');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="popular-courses">
      <h2 className="section-titlam">Popular <span>Courses</span></h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-container">
            {/* Course Card */}
            <div className="course-card">
              <div className="card-header">
                <img src={course.logo} alt={`${course.title} Logo`} className="course-logo" />
              </div>
              <div className="card-body">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <a href='/coursed' className="btn live-demo">Live Demo</a>
              <a href='/coursed' className="btn enroll-now">Enroll Now</a>
            </div>
            <button className="btn download-curriculum">Download Curriculum</button>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All Courses</button>
    </section>
  );
};

export default Courses;
