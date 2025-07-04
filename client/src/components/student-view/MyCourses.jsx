import React, { useEffect, useState } from "react";
import CourseCard from "./course-card-after-buy/coursecard";
import Sidebar from "./studentComponent/Sidebar";
import { getAllCourses } from "../../pages/landing-page/api/landingServices";
import { Menu } from "lucide-react";
import TopBar from './studentComponent/Topbar';

const MyCourses = () => {
  const [myCourses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await getAllCourses();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const purchasedCourseIds = storedUser?.purchasedCourses || [];
        const filteredCourses = allCourses.filter(course =>
          purchasedCourseIds.includes(course._id)
        );
        setCourses(filteredCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`md:hidden fixed top-4 z-50 p-2 rounded-md bg-[#5491CA] text-white shadow-lg hover:bg-[#467bb0] transition-colors 
            ${sidebarOpen ? 'right-4' : 'left-4'}`}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar backdrop for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 ${
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="w-full lg:pl-64 px-4 sm:px-6 md:px-8 py-6 md:py-10 transition-all duration-300">
        
      <TopBar />
        <div className="max-w-7xl mx-auto px-8 ">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#7670AC] dark:text-white">
              My <span className="text-[#5491CA] dark:text-[#7670AC]">Courses</span>
            </h1>
          </header>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
              <div className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.707a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* No Courses */}
          {!loading && !error && myCourses.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
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
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                You haven't enrolled in any course yet.
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Browse Courses
              </button>
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !error && myCourses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {myCourses.map((course) => (
                <div
                  key={course._id}
                  className="transform transition hover:-translate-y-1 "
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCourses;
