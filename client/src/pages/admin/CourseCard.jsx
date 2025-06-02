import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CourseCard.css";
import courrseService from "./api/courseService";
import toast from "react-hot-toast";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mountedRef = useRef(true);

  // Keep track of mount status
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      toast.dismiss(); // Dismiss all toasts on unmount/route change
    };
  }, [location]);

  const handleLiveDemo = () => {
    navigate(`/course-demo/${course._id}`, { state: { course } });
  };

  const handleEnrollNow = () => {
    navigate(`/course-enrollment/${course._id}`, { state: { course } });
  };

  const handledelte = () => {
    toast.dismiss(); // Dismiss any previous toasts

    toast(
      (t) => (
        <div style={{ padding: "10px" }}>
          <p>Are you sure you want to delete the course "{course.title}"?</p>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                backgroundColor: "white",
                color: "#5491CA",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  if (!mountedRef.current) return; // Prevent action if unmounted
                  await courrseService.deleteCourse(course._id);
                  toast.success("Course deleted successfully.");
                  document.location.reload();
                } catch (error) {
                  toast.error("Failed to delete the course. Please try again.");
                }
                toast.dismiss(t.id);
              }}
              style={{
                backgroundColor: "white",
                color: "#7670AC",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              OK
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: Infinity,
      }
    );
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
        <button className="ld" onClick={handledelte}>
          Delete Course
        </button>
        {/* Uncomment if needed */}
        {/* <button className="btn" onClick={handleLiveDemo}>Live Demo</button> */}
        {/* <button className="btn download-curriculum">Edit Course</button> */}
      </div>
    </div>
  );
};

export default CourseCard;
