import React, { useState, useEffect } from "react";
import "./courses-page.css";
import CourseCard from "./CourseCard";
import Nav from "../nav-bar/nav";
import AJS from "./images/Ajs.png";
import rjs from "./images/reactjs.png";
import py from "./images/pyh.png";
import st from "./images/selenium.png";
import Footer from '../footer/footer';

const CoursePage = () => {
  const allCourses = [
    { title: "Software Testing", status: "Opened", description: "Evaluate and verify software.", image: st },
    { title: "React JS", status: "Opened", description: "Learn to build dynamic UIs.", image: rjs },
    { title: "Python", status: "Coming Soon", description: "Master Python programming.", image: py },
    { title: "Angular JS", status: "Archived", description: "Develop modern web apps.", image: AJS },
    
  ];

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false); // Animation visibility state
  const coursesPerPage = 6;

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setVisible(position > 100); // Adjust the threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const matchesFilter = filter === "All" || course.status === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <>
      <nav className="navbar">
        <Nav />
      </nav>
      <section className={`course-page ${visible ? "fade-in-bottom" : ""}`}>
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
            currentCourses.map((course, index) => <CourseCard key={index} course={course} />)
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
  