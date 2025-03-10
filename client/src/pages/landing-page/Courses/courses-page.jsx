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
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error loading courses: {error.message || 'Unknown error'}</div>;
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