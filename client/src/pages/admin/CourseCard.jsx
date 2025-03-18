import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";
import courrseService from "./api/courseService";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleLiveDemo = () => {
    navigate(`/course-demo/${course._id}`, { state: { course } });
  };

  const handleEnrollNow = () => {
    navigate(`/course-enrollment/${course._id}`, { state: { course } });
  };



  const handledelte = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the course "${course.title}"?`
    );
    if (confirmDelete) {
      try {
        await courrseService.deleteCourse(course._id);
        alert("Course deleted successfully.");
        document.location.reload();
        // Optionally, refresh the page or update the state to reflect the deletion
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete the course. Please try again.");
      }
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
        <button className="ld" onClick={handledelte}>Delete Course</button>
        <button className="btn" onClick={handleLiveDemo}>Live Demo</button>
        <button className="btn download-curriculum">Edit Course</button>
      </div>
    </div>
  );
};

export default CourseCard;
