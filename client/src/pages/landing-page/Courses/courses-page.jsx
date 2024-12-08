import React, { useState } from "react";
import "./courses-page.css";
import CourseCard from "./CourseCard";
import AJS from "./images/Ajs.png";
import rjs from "./images/reactjs.png";
import py from "./images/pyh.png";
import st from "./images/selenium.png";
import Nav from "../nav-bar/nav";

const CoursePage = () => {
  const allCourses = [
    { title: "Software Testing", status: "Opened", description: "Evaluate and verify software.", image:st },
    { title: "React JS", status: "Opened", description: "Learn to build dynamic UIs.", image:rjs},
    { title: "Python", status: "Coming Soon", description: "Master Python programming.", image:py },
    { title: "Angular JS", status: "Archived", description: "Develop modern web apps.", image:AJS },
    // Add more courses
  ];

  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const filteredCourses =
    filter === "All"
      ? allCourses
      : allCourses.filter((course) => course.status === filter);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <>
    <nav className="navbar ">
      <Nav />
    </nav>
    
    <div className="course-page">
      {/* Filter Bar */}
      <div className="filter-bar">
        <input type="text" placeholder="Search The Course" className="search-bar" />
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
        <select className="sort-dropdown">
          <option>Sort by Popular Class</option>
          <option>Sort by Recently Added</option>
        </select>
      </div>
      <hr className="text-bold"/>
      {/* Course Grid */}
      <div className="course-grid mt-3">
        {currentCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      {/* Pagination */}
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
    </div>
    </>
  );
};

export default CoursePage;
