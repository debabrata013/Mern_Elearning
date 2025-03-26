import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleLiveDemo = () => {
    navigate(`/course-demo/${course._id}`, { state: { course } });
  };

  const handleEnrollNow = () => {
    navigate(`/course-enrollment/${course._id}`, { state: { course } });
  };

  const handleDownloadCurriculum = () => {
    // Check if curriculum PDF exists
    if (course.curriculumPDF) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = course.curriculumPDF;
      link.download = `${course.title}-curriculum.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // If no PDF is available, show an alert
      alert("Curriculum PDF is not available for this course.");
    }
  };

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
        <button className="btn live-demo" onClick={handleLiveDemo}>Add to cart</button>
        <button className="btn enroll-now" onClick={handleEnrollNow}>Enroll Now</button>
        <button className="btn download-curriculum" onClick={handleDownloadCurriculum}>Download Curriculum</button>
      </div>
    </div>
  );
};

export default CourseCard;
