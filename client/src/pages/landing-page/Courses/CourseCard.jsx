import React from "react";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-container">
       <div className="course-card">
         <div className="course-card-header">
           <img src={course.image} alt={course.title} className="course-icon" />
         </div>
         <div className="course-card-body">
           <h3 className="course-title">{course.title}</h3>
           <p className="course-description">{course.description}</p>
           <div className="course-buttons">
             <button className="course-btn live-demo-btn">Live Demo</button>
             <button className="course-btn enroll-now-btn">Enroll Now</button>
           </div>
         </div>
       </div>
         <div className="course-card-footer">
           <button className="download-btn"> Download Curriculum
           </button>
         </div>
    </div>
  );
};

export default CourseCard;
