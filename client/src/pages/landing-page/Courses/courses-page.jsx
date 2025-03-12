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
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800">
          <div className="relative w-48 h-48 mb-8">
            {/* Outer orbit */}
            <div className="absolute top-1/2 left-1/2 w-40 h-40 -mt-20 -ml-20 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '4s' }}>
              <div className="absolute -top-2 left-1/2 w-4 h-4 -ml-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400"></div>
            </div>
            
            {/* Inner orbit */}
            <div className="absolute top-1/2 left-1/2 w-28 h-28 -mt-14 -ml-14 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
              <div className="absolute -top-2 left-1/2 w-4 h-4 -ml-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400"></div>
            </div>
            
            {/* Center star */}
            <div className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300 animate-pulse"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Preparing your learning journey...</h2>
          <p className="text-white/80 text-lg">Discovering amazing courses just for you</p>
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