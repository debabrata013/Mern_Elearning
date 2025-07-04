import React, { useState, useRef, useEffect } from "react";
import CourseCard from "./courseComponent/coursecard";
import { getAllCourses } from "../../pages/landing-page/api/landingServices";
import Sidebar from './studentComponent/Sidebar';
import { Menu, Search, Filter, X } from "lucide-react";
import TopBar from './studentComponent/Topbar';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="relative w-40 h-40 mb-6">
          {/* Main animated book */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-32 bg-gradient-to-br from-[#7670AC] to-[#5491CA] rounded-lg shadow-xl animate-book">
              {/* Book spine */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#5491CA] to-[#7670AC] rounded-l-lg"></div>
              {/* Pages */}
              <div className="absolute left-2 top-1 w-20 h-30 bg-white/90"></div>
              {/* Animated page */}
              <div className="absolute left-2 top-1 w-20 h-30 bg-white origin-left animate-page-flip"></div>
            </div>
          </div>
    
          {/* Floating circles */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#5491CA] rounded-full opacity-70 animate-float-1"></div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-[#7670AC] rounded-full opacity-70 animate-float-2"></div>
        </div>
    
        <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-[#7670AC] to-[#5491CA] bg-clip-text text-transparent">
          Preparing Your Courses
        </h2>
        <p className="text-gray-600 text-lg">Loading your learning materials...</p>
    
        <style jsx>{`
          @keyframes book {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          @keyframes page-flip {
            0%, 100% { transform: rotateY(0deg); }
            50% { transform: rotateY(30deg); }
          }
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(5px, -10px); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-5px, 10px); }
          }
          .animate-book {
            animation: book 3s ease-in-out infinite;
          }
          .animate-page-flip {
            animation: page-flip 3s ease-in-out infinite;
          }
          .animate-float-1 {
            animation: float-1 4s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float-2 5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#7670AC]/10 to-[#5491CA]/10 p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
          <div className="p-8">
            <div className="flex flex-col items-center">
              {/* Animated error icon */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-[#7670AC]/20 rounded-full animate-ping opacity-75"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-r from-[#7670AC] to-[#5491CA] rounded-full animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-[#5491CA] mb-2 overflow-hidden whitespace-nowrap animate-pulse">
                Oops! Something went wrong
              </h2>
              
              <div className="text-center">
                <p className="text-[#7670AC] font-medium mb-6 overflow-hidden">
                  {error.message || 'Unknown error occurred while loading courses'}
                </p>
                
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-3 bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-white font-medium rounded-lg shadow-md hover:from-[#7670AC]/80 hover:to-[#5491CA]/80 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:ring-opacity-50 transform transition-all duration-300 hover:-translate-y-1"
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
          <div className="h-1 bg-gradient-to-r from-[#7670AC] via-[#5491CA] to-[#7670AC] animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {isMobile && (
              <button
                onClick={toggleSidebar}
                className={`md:hidden fixed top-4 z-50 p-2 rounded-md bg-[#5491CA] text-white shadow-lg hover:bg-[#467bb0] transition-colors 
                  ${isSidebarOpen ? 'right-4' : 'left-4'}`}
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

      {/* Sidebar backdrop for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 ${
          isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-[280px]'
      }`}>
        <main 
          ref={sectionRef} 
          className="p-4 md:p-8 overflow-y-auto"
        >
          
        <TopBar />
          <div className="max-w-7xl mx-auto text-center">
            {/* Header Section */}
                <h1 className="text-2xl mb-4 md:text-3xl font-bold text-[#7670AC] dark:text-white" >
                  Explore <span className="text-[#5491CA] dark:text-[#7670AC]">Courses</span>
                </h1>

            {/* Search and Filter Section */}
            <div className="flex flex-col gap-4 mb-6 md:mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#5491CA]/20 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] dark:bg-gray-700 dark:border-[#7670AC]/30 dark:text-white placeholder-[#7670AC]/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-gray-400 border-[#5491CA]/20 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] dark:bg-gray-700 dark:border-[#7670AC]/30 dark:text-white appearance-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="All">All Courses</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="relative flex-1">
                  <select 
                    className="w-full pl-4 pr-4 py-2.5 rounded-xl text-gray-400 border border-[#5491CA]/20 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] dark:bg-gray-700 dark:border-[#7670AC]/30 dark:text-white appearance-none"
                    aria-label="Sort courses"
                  >
                    <option>Sort by Popularity</option>
                    <option>Sort by Newest</option>
                    <option>Sort by Rating</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-t border-[#5491CA]/10 dark:border-[#7670AC]/20 mb-6 md:mb-8" />

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 mb-6 md:mb-8 place-items-center">
                {currentCourses.map((course, index) => (
                  <CourseCard 
                    key={course._id || `course-${index}`} 
                    course={course} 
                  />
                ))}
              </div>

            ) : (
              <div className="flex flex-col items-center justify-center py-12 md:py-16">
                <div className="relative w-24 md:w-32 h-24 md:h-32 mb-6">
                  <div className="absolute inset-0 bg-[#5491CA]/20 dark:bg-[#7670AC]/20 rounded-full animate-ping opacity-75"></div>
                  <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-r from-[#7670AC] to-[#5491CA] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 md:w-16 h-12 md:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-[#5491CA] dark:text-[#7670AC] mb-3">No courses found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md text-sm md:text-base">
                  {searchQuery 
                    ? `No courses match your search for "${searchQuery}"` 
                    : "There are currently no courses available in this category"}
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  className="px-4 md:px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-[#5491CA]/10 dark:bg-gray-700 dark:text-white dark:hover:bg-[#7670AC]/30 disabled:opacity-50 text-sm md:text-base transition-colors duration-200"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    className={`px-4 md:px-5 py-2.5 rounded-xl text-sm md:text-base transition-colors duration-200 ${
                      currentPage === pageIndex + 1 
                        ? "bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-[#5491CA]/10 dark:bg-gray-700 dark:text-white dark:hover:bg-[#7670AC]/30"
                    }`}
                    onClick={() => setCurrentPage(pageIndex + 1)}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
                
                <button
                  className="px-4 md:px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-[#5491CA]/10 dark:bg-gray-700 dark:text-white dark:hover:bg-[#7670AC]/30 disabled:opacity-50 text-sm md:text-base transition-colors duration-200"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      
    </div>
  );
};

export default CoursePage;