import React, { useState, useEffect, useRef } from "react";
// import "./CourseCard.css";
import CourseCard from "./CourseCard";


import { getAllCourses } from "../landing-page/api/landingServices";

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
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="p-8">
              <div className="flex flex-col items-center">
                {/* Animated error icon */}
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative flex items-center justify-center w-full h-full bg-red-500 rounded-full animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                </div>
                
                {/* Error message with typing animation */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2 overflow-hidden whitespace-nowrap animate-pulse">
                  Oops! Something went wrong
                </h2>
                
                <div className="text-center">
                  <p className="text-red-600 font-medium mb-6 overflow-hidden">
                    {error.message || 'Unknown error occurred while loading courses'}
                  </p>
                  
                  {/* Animated button */}
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Try Again
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Animated border */}
            <div className="h-1 bg-gradient-to-r from-red-300 via-red-500 to-red-600 animate-pulse"></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
     
      <section 
        ref={sectionRef} 
       
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
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 bg-gray-200 rounded-full animate-ping opacity-75"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-gray-400 rounded-full animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-lg">No courses match your search.</p>
            </div>
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
    
    </>
  );
};

export default CoursePage;