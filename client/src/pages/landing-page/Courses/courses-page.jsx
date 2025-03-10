import React, { useState, useEffect, useRef } from "react";
import "./courses-page.css";
import CourseCard from "./CourseCard";
import Nav from "../nav-bar/nav";
import Footer from '../footer/footer';
import { getAllCourses } from "../api/landingServices";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const coursesPerPage = 6;
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const sectionElement = sectionRef.current;
      
      if (sectionElement && sectionElement.classList) {
        setVisible(position > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === "All" || course.status === filter;
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesFilter && matchesSearch;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  if (loading) {
    return (
      <>
        <nav className="navbar">
          <Nav />
        </nav>
        <div className="loader-container">
          <div className="loader">
            <div className="loader-circle"></div>
            <p className="loader-text">Loading courses...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <nav className="navbar">
          <Nav />
        </nav>
        <div className="error-container">
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>Error loading courses: {error.message || 'Unknown error'}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="navbar">
        <Nav />
      </nav>
      <section 
        ref={sectionRef} 
        className={`course-page ${visible ? "fade-in-bottom" : ""}`}
      >
        <h2 className="section-title">Explore <span>Courses</span></h2>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search for a course"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search courses"
          />
          <div className="filter-buttons">
            {["All", "Opened", "Coming Soon", "Archived"].map((status) => (
              <button
                key={status}
                className={`filter-btn ${filter === status ? "active" : ""}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <select className="sort-dropdown" aria-label="Sort courses">
            <option>Sort by Popular Class</option>
            <option>Sort by Recently Added</option>
          </select>
        </div>
        <hr className="text-bold" />
        <div className="courses-grid">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <CourseCard 
                key={course._id || `course-${index}`} 
                course={course} 
              />
            ))
          ) : (
            <p className="no-results">No courses match your search.</p>
          )}
        </div>
        <div className="pagination">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`page-btn ${currentPage === pageIndex + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CoursePage;