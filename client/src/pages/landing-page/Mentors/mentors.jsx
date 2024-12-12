import React, { useState } from "react";
import "./mentors.css";
import p1 from "../Mentors/person-1.jpg";
import p2 from "../Mentors/person-2.jpg";
import p3 from "../Mentors/person-3.jpg";
import p4 from "../Mentors/person-4.jpg";
import p5 from "../Mentors/person-5.jpg";



const Mentors = () => {
  const mentors = [
    { 
      src: p1, 
      alt: "Mentor 1", 
      title: "Joe", 
      description: "Mentor 1 is an expert in web development and loves teaching React."
    },
    { 
      src: p2, 
      alt: "Mentor 2", 
      title: "Mark", 
      description: "Mentor 2 specializes in UI/UX design with years of experience in the field."
    },
    { 
      src: p3, 
      alt: "Mentor 3", 
      title: "stephen", 
      description: "Mentor 3 is a cloud computing expert, helping companies scale their infrastructure."
    },
    { 
      src: p4, 
      alt: "Mentor 4", 
      title: "Daniel Peterson", 
      description: "Mentor 4 focuses on data science and machine learning, guiding aspiring data scientists."
    },
    { 
      src: p5, 
      alt: "Mentor 5", 
      title: "William Hughes", 
      description: "Mentor 5 is a mobile app developer, passionate about creating impactful mobile experiences."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (animating) return; // Prevent new actions while animating
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mentors.length - 1));
      setAnimating(false);
    }, 500); // Matches the animation duration
  };

  const handleNext = () => {
    if (animating) return; // Prevent new actions while animating
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < mentors.length - 1 ? prev + 1 : 0));
      setAnimating(false);
    }, 500); // Matches the animation duration
  };

  const getClassName = (index) => {
    if (index === currentIndex - 1 || (currentIndex === 0 && index === mentors.length - 1)) {
      return "mentor-card past";
    } else if (index === currentIndex) {
      return "mentor-card present";
    } else if (index === currentIndex + 1 || (currentIndex === mentors.length - 1 && index === 0)) {
      return "mentor-card future";
    } else {
      return "mentor-card hidden";
    }
  };

  return (  
      <div className="mentor-container" >
        <h2 className="Heading-section">
          <span className="title-primary">Meet Our Professional</span><br />
          <span className="title-secondary">Mentors & Trainers</span>
        </h2>
    <div className="container">
      <div className="left-container">
        
        <div className="mentor-gallery">
          {mentors.map((mentor, index) => (
            <div className={getClassName(index)} key={index}>
              <img src={mentor.src} alt={mentor.alt} className="mentor-image" />
              <div className="mentor-details">
                <h2 className="mentor-name">{mentor.title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="mentor-actions">
          <button className="mentor-btn left-btn" onClick={handlePrev}>
            &lt; Prev
          </button>
          <button className="mentor-btn right-btn" onClick={handleNext}>
            Next &gt;
          </button>
        </div>
      </div>

      <div className="right-container">
        <div className={`mentor-description-card ${animating ? "animating" : ""}`}>
          <h2 className="mentor-description-title">{mentors[currentIndex].title}</h2>
          <p className="mentor-description">{mentors[currentIndex].description}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Mentors;
