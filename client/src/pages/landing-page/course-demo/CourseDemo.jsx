import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "../nav-bar/nav";
import Footer from "../footer/footer";
import "./CourseDemo.css";

const CourseDemo = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(location.state?.course || null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(!location.state?.course);

  useEffect(() => {
    // If course data wasn't passed via location state, fetch it
    if (!course) {
      const fetchCourse = async () => {
        try {
          // Replace with your actual API call
          const response = await fetch(`/api/courses/${courseId}`);
          if (!response.ok) throw new Error("Course not found");
          const data = await response.json();
          setCourse(data);
        } catch (error) {
          console.error("Error fetching course:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }

    // Check if user is already enrolled
    const checkEnrollment = async () => {
      try {
        // Replace with your actual enrollment check
        // This is a placeholder - you'll need to implement actual enrollment check
        const response = await fetch(`/api/enrollments/check/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setIsEnrolled(data.isEnrolled);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };
    checkEnrollment();
  }, [courseId, course]);

  const handleEnrollNow = () => {
    navigate(`/course-enrollment/${courseId}`, { state: { course } });
  };

  const handleGoToCourse = () => {
    navigate(`/my-courses/${courseId}`);
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="demo-loader-container">
          <div className="demo-loader"></div>
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Nav />
        <div className="demo-error-container">
          <h2>Course Not Found</h2>
          <p>The course you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/courses")} className="demo-back-button">
            Back to Courses
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="demo-container">
        <div className="demo-header">
          <h1>Course Demo: <span>{course.title}</span></h1>
          <p className="demo-subtitle">Get a preview of what you'll learn in this course</p>
        </div>

        <div className="demo-content">
          <div className="demo-video-section">
            <div className="demo-video-container">
              {course.demoVideo ? (
                <iframe
                  src={course.demoVideo}
                  title={`${course.title} Demo Video`}
                  allowFullScreen
                  className="demo-video"
                ></iframe>
              ) : (
                <div className="demo-video-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <p>Demo video coming soon</p>
                </div>
              )}
            </div>
            <h2 className="demo-section-title">Sample Lecture</h2>
            <p className="demo-video-description">
              This is a preview of the course content. Enroll to access all lectures and materials.
            </p>
          </div>

          <div className="demo-info-section">
            <div className="demo-instructor">
              <div className="instructor-avatar">
                <img 
                  src={course.instructorImage || "https://via.placeholder.com/100?text=Instructor"} 
                  alt={course.instructor || "Instructor"} 
                />
              </div>
              <div className="instructor-info">
                <h3>Instructor</h3>
                <p>{course.instructor || "Expert Instructor"}</p>
              </div>
            </div>

            <div className="demo-course-details">
              <h2 className="demo-section-title">About This Course</h2>
              <p className="demo-description">{course.description}</p>
              
              <div className="demo-highlights">
                <h3>What You'll Learn</h3>
                <ul>
                  {course.highlights ? (
                    course.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))
                  ) : (
                    <>
                      <li>Comprehensive understanding of the subject</li>
                      <li>Practical skills you can apply immediately</li>
                      <li>Industry-relevant knowledge and techniques</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="demo-course-meta">
                <div className="meta-item">
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">{course.duration || "Self-paced"}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Level:</span>
                  <span className="meta-value">{course.level || "All Levels"}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Price:</span>
                  <span className="meta-value price">
                    {course.price ? `₹${course.price}` : "Free"}
                  </span>
                </div>
              </div>

              <div className="demo-cta">
                {isEnrolled ? (
                  <button onClick={handleGoToCourse} className="demo-go-to-course-btn">
                    Go to Course
                  </button>
                ) : (
                  <button onClick={handleEnrollNow} className="demo-enroll-btn">
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="demo-sample-materials">
          <h2 className="demo-section-title">Sample Materials</h2>
          <div className="materials-grid">
            <div className="material-card">
              <div className="material-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Course Introduction</h3>
              <p>A brief overview of what you'll learn in this course.</p>
            </div>
            <div className="material-card">
              <div className="material-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>Sample Lesson Notes</h3>
              <p>Preview of the course materials and lesson structure.</p>
            </div>
          </div>
        </div>

        <div className="demo-footer">
          <button onClick={() => navigate("/courses")} className="demo-back-button">
            Back to Courses
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDemo; 