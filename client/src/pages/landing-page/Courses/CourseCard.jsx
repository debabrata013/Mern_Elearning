import React from "react";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-container">
      <div className="course-card">
        <div className="card-header">
          <img src={course.coverImage} alt={`${course.title} Logo`} className="course-logo" />
        </div>
        <div className="card-body">
          <h3 className="course-title">{course.title}</h3>
          <p className="course-description">{course.description}</p>
        </div>
        
      </div>
      <div className="buttons">
          <button className="btn live-demo">Live Demo</button>
          <button className="btn enroll-now">Enroll Now</button>
          <button className="btn download-curriculum">Download Curriculum</button>
        </div>
    </div>
  );
};

export default CourseCard;
