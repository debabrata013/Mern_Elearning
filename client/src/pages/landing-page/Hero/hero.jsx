import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaLightbulb } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdRecordVoiceOver } from "react-icons/md";
import circle from "./assets/round.png";
import studentImage from "./assets/student-img.png"; // Ensure this image is in the correct path
import "./hero.css";
import axios from "axios";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // API State Variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get("http://localhost:4400/data/totalstudent");
        const activeUsersResponse = await axios.get("http://localhost:4400/data/totaluser");
        const totalCoursesResponse = await axios.get("http://localhost:4400/data/totalcourse");
        const totalTeachersResponse = await axios.get("http://localhost:4400/data/totalteacher");

        setTotalStudents(studentResponse.data);
        setActiveUsers(activeUsersResponse.data);
        setTotalCourses(totalCoursesResponse.data);
        setTotalTeachers(totalTeachersResponse.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Scroll Effect
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
          Up Your <span className="highlights">Skills <br /></span> To
          <span className="highlights"> Advance</span> Your<br />
          <span className="highlights"> Career</span> Path
        </h1>
        <p className="hero-description">
          Learn UI-UX Design skills with weekend UX. The latest online <br />
          learning system and material that help your knowledge grow.
        </p>
        <div className="hero-buttonn">
          <Link to="/login" className="btn-primary">Get Started</Link>
          <Link to="/coursess" className="btn-secondary">Explore Courses</Link>
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

        <div className="orbit-container">
          <div className="orbit-circle circle-4"></div>
        </div>

        {/* Floating Statistic Cards */}
        <div
          className="floating-card-top-right"
          style={{ transform: `translateY(-${scrollY * 0.2}px)` }}
        >
          <FaBookOpen className="bookl" />
          <p className="stat-value">{totalCourses}+</p>
          <p className="stat-text">Online Courses</p>
        </div>

        <div
          className="floating-card-middle-left"
          style={{ transform: `translateY(-${scrollY * 0.15}px)` }}
        >
          <FaUserGraduate className="stat-icon" />
          <div>
            <p className="stat-value">{totalStudents}+</p>
            <p className="stat-text">Students</p>
          </div>
        </div>

        <div
          className="floating-card-bottom-right"
          style={{ transform: `translateY(-${scrollY * 0.2}px)` }}
        >
          <FaChalkboardTeacher className="stat-icon2" />
          <div>
            <p className="stat-value">{totalTeachers}+</p>
            <p className="stat-text">Tutors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
