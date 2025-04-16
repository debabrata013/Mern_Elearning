// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CourseCard from "./course-card-after-buy/coursecard";
// import Sidebar from "./studentComponent/Sidebar";
// import { getAllCourses } from "../../pages/landing-page/api/landingServices";
// const MyCourses = () => {
//   const [myCourses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//      const fetchCourses = async () => {
//        try {
//          const data = await getAllCourses();
//          setCourses(data);
//          setLoading(false);
//        } catch (err) {
//          console.error("Error fetching courses:", err);
//          setError(err);
//          setLoading(false);
//        }
//      };
//      fetchCourses();
//    }, []);

//   return (
// <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//   {/* Sidebar */}
//   <div className="bg-white dark:bg-gray-800 shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 dark:border-gray-700 z-40">
//     <Sidebar />
//   </div>

//   {/* Main Content */}
//   <div className="w-full lg:ml-[280px] px-4 sm:px-6 py-10 transition-all duration-300">
//     <h1 className="text-3xl font-bold text-center text-[#5491CA] mb-8">
//       My Courses
//     </h1>

//     {loading && (
//       <p className="text-center text-gray-600 dark:text-gray-400">Loading your courses...</p>
//     )}

//     {!loading && error && (
//       <p className="text-center text-red-500 font-medium">{error}</p>
//     )}

//     {!loading && myCourses.length === 0 && (
//       <p className="text-center text-gray-500 dark:text-gray-400">
//         You haven’t enrolled in any course yet.
//       </p>
//     )}

//     {/* Grid Layout for Courses */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
//       {myCourses.map((course) => (
//         <CourseCard key={course._id} course={course} />
//       ))}
//     </div>
//   </div>
// </div>

//   );
// };

// export default MyCourses;
import React, { useEffect, useState } from "react";
import CourseCard from "./course-card-after-buy/coursecard";
import Sidebar from "./studentComponent/Sidebar";
import { getAllCourses } from "../../pages/landing-page/api/landingServices";

const MyCourses = () => {
  const [myCourses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white shadow-lg transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div
        className={`bg-white dark:bg-gray-800 shadow-xl fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } lg:w-64`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content - Adjust padding based on screen size */}
      <div className="w-full lg:pl-64 px-4 sm:px-6 md:px-8 py-6 md:py-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
              My Courses
            </h1>
            <div className="h-1 w-24 bg-blue-500 mx-auto mt-3 rounded-full"></div>
          </header>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && myCourses.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                You haven't enrolled in any course yet.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Browse Courses
              </button>
            </div>
          )}

          {/* Grid Layout for Courses - Responsive grid with different columns based on screen size */}
          {!loading && !error && myCourses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {myCourses.map((course) => (
                <div 
                  key={course._id} 
                  className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
