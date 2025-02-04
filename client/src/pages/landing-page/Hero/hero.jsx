import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaVideo, FaLightbulb } from "react-icons/fa";
import { FaBookOpen, FaPlus } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import circle from "./assets/round.png";
import studentImage from "./assets/student-img.png"; // Ensure this image is in the correct path
import "./hero.css";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-container">
      {/* Left Side - Text & CTA */}
      <div className="hero-left">
        <h1 className="hero-title">
          Up Your <span className="highlights">Skills <br/></span> To  
          <span className="highlights"> Advance</span> Your<br/>
          <span className="highlights"> Career</span> Path
        </h1>
        <p className="hero-description">
          Learn UI-UX Design skills with weekend UX. The latest online <br/>
          learning system and material that help your knowledge growing.
        </p>
        <div className="hero-buttonn">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Get free trial</button>
        </div>
        
        {/* Feature Icons */}
        <div className="hero-features">
          <div className="feature-item">
            <MdRecordVoiceOver className="feature-icon icon-yellow" />
            <span>Public Speaking</span>
          </div>
          <div className="feature-item">
            <FaChalkboardTeacher className="feature-icon icon-red" />
            <span>Career-Oriented</span>
          </div>
          <div className="feature-item">
            <FaLightbulb className="feature-icon icon-purple" />
            <span>Creative Thinking</span>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Floating Cards */}
      <div className="hero-right">
        {/* Circular Background */}
        <div className="image-container">
          <img src={studentImage} alt="Student" className="student-image" />
        </div>
        <div className="ball">
          <img src={circle} alt="circle" />
        </div>
        
        <div class="orbit-container">
          <div class="orbit-circle circle-4"></div>
        </div>
        {/* Floating Statistic Cards */}
        <div className="floating-card-top-right" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <FaBookOpen className="bookl"/>
          <p className="stat-value">5K+</p>
          <p className="stat-text">Online Courses</p>
        </div>

        <div className="floating-card-middle-left" style={{ transform: `translateY(${scrollY * 0.15}px)` }}><FaVideo className="stat-icon" />
          <div>
            <p className="stat-value">2K+</p>
            <p className="stat-text">Video Courses</p>
          </div>
        </div>

        <div className="floating-card-bottom-right" style={{ transform: `translateY(${scrollY * 0.2}px)` }}><FaChalkboardTeacher className="stat-icon" />
          <div>
            <p className="stat-value">250+</p>
            <p className="stat-text">Tutors</p>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
