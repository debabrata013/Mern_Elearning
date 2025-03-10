import React, { useState, useEffect } from "react";
import "./mentors.css";
import { getAllTeachers } from "../api/landingServices";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersData = await getAllTeachers();
        // Map API data to match existing component structure
        const formattedMentors = teachersData.map(teacher => ({
          src: teacher.profileImage || "/default-profile.png", // Fallback to default image
          alt: `Mentor ${teacher.userName}`,
          title: teacher.userName,
          description: teacher.description || "No description available"
        }));
        console.log(formattedMentors);
        setMentors(formattedMentors);
        setLoading(false);
      } catch (err) {
        setError("Failed to load mentors");
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handlePrev = () => {
    if (animating || loading) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mentors.length - 1));
      setAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (animating || loading) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < mentors.length - 1 ? prev + 1 : 0));
      setAnimating(false);
    }, 500);
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

  if (loading) {
    return <div className="mentor-container">Loading mentors...</div>;
  }

  if (error) {
    return <div className="mentor-container">{error}</div>;
  }

  return (  
    <div className="mentor-container">
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
