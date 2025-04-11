import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the course detail or progress page (adjust route as needed)
    navigate(`/mycourse/course/${course._id}`, { state: { course } });
  };

 

  return (
    <div className="course-container">
      <div className="course-card">
        <div className="card-header">
          <img
            src={course.coverImage}
            alt={`${course.title} Logo`}
            className="course-logo"
          />
        </div>
        <div className="card-body">
          <h3 className="course-title">{course.title}</h3>
          <p className="course-description">{course.description}</p>
        </div>
      </div>
      <div className="buttons">
        <button className="btn continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
