import React, { useState } from "react";
import CourseCard from "../../pages/landing-page/Courses/CourseCard";
import Sidebar from "./studentComponent/Sidebar";
import AJS from "../../pages/landing-page/Courses/images/Ajs.png";
import rjs from "../../pages/landing-page/Courses/images/reactjs.png";
import py from "../../pages/landing-page/Courses/images/pyh.png";
import st from "../../pages/landing-page/Courses/images/selenium.png";

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
  const coursesPerPage = 6;

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
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white  w-[250px] h-screen fixed top-0 left-0">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="ml-[250px] w-full p-6">
        <section className=" p-4  ">
          <h2 className="text-4xl font-bold text-center text-[#7670AC]">
            Explore <span className="text-[#5491CA]">Courses</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 mb-4 space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="Search for a course"
              className="w-full md:w-72 p-2 border border-gray-300 rounded-full  focus:outline-none focus:border-[#5491CA]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {["All", "Opened", "Coming Soon", "Archived"].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-md border border-[#5491CA] text-[#5491CA] transition-all ${filter === status ? "bg-[#5491CA] text-white" : "hover:bg-[#7670AC] hover:text-white"}`}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-t-2 border-gray-300" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => <CourseCard key={index} course={course} />)
            ) : (
              <p className="text-center text-gray-500 text-lg">No courses match your search.</p>
            )}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`px-3 py-1 rounded-md transition-all ${currentPage === pageIndex + 1 ? "bg-[#5491CA] text-white" : "bg-gray-200 hover:bg-[#7670AC] hover:text-white"}`}
                onClick={() => setCurrentPage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoursePage;
