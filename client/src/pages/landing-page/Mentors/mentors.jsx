import React, { useState, useEffect } from "react";
import "./mentors.css";
import { getAllTeachers } from "../api/landingServices";

import { Loader2, AlertCircle } from 'lucide-react';

// Loading Component
const AnimatedLoading = () => {
  return (
    <div className="mentor-container flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <Loader2 size={64} className="text-blue-500 animate-spin" />
      </div>
      
      <h3 className="text-xl font-medium mb-2 text-gray-700">Discovering Mentors</h3>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-pulse w-1/2"></div>
      </div>
      
      
    </div>
  );
};

// Error Component
const AnimatedError = ({ errorMessage }) => {
  return (
    <div className="mentor-container flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <div className="animate-pulse">
          <AlertCircle size={64} className="text-red-500" />
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-2 text-gray-700">Oops! Something went wrong</h3>
      
      <p className="text-gray-500 mb-6 max-w-md">
        {errorMessage || "We're having trouble loading your mentors. Please try again."}
      </p>
      
     
    </div>
  );
};

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
    return <AnimatedLoading />;
  }

  if (error) {
    return <AnimatedError errorMessage={error} />;
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
