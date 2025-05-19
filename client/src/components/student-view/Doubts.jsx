import React, { useEffect, useState } from "react";
import { Users, Calendar, Loader, BookOpen,Menu } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Sidebar from './studentComponent/Sidebar';

const Doubts = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get("/courses/getallCourse/op");
  //       setCourses(response.data.courses);
  //       console.log(response.data.courses);

  //     } catch (err) {
  //       setError("Failed to load courses");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);
useEffect(() => {
  const fetchCourses = async () => {
    try {
      setLoading(true);

      // 1. Local storage se user data lena
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.purchasedCourses || user.purchasedCourses.length === 0) {
        setCourses([]);
        return;
      }

      const purchasedCourseIds = user.purchasedCourses; // array of course IDs

      // 2. All courses fetch karna
      const response = await axiosInstance.get("/courses/getallCourse/op");
      const allCourses = response.data.courses;

      // 3. Filter only purchased courses
      const filteredCourses = allCourses.filter(course =>
        purchasedCourseIds.includes(course._id)
      );

      setCourses(filteredCourses);
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);

  const handleCourseClick = (courseId) => {
    navigate(`/Mycourse/${courseId}/Doubts`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const CourseCard = React.memo(({ course }) => {
    const handleCourseClick = (courseId) => {
      navigate(`/Mycourse/${courseId}/Doubts`);
    };
  
    return (
      <div className="flex flex-col w-[260px] h-[320px] cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden bg-white">
        {/* Header with course image */}
        <div className="bg-[#5491CA] h-[120px] flex justify-center items-center relative">
          {course.coverImage ? (
            <img
              src={course.coverImage}
              alt={course.title}
              className="max-h-[80px] object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <BookOpen className="w-12 h-12 text-blue-200" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-2xl"></div>
        </div>
        
        {/* Course content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">
            {course.description || "No description available."}
          </p>
          
          <div className="mt-auto">
            <div className="flex justify-center items-center gap-2 text-sm text-[#5491CA] mb-4">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{moment(course.startDate).format("MMM DD, YYYY")}</span>
            </div>
            
            <button
              onClick={() => handleCourseClick(course._id)}
              className="w-full bg-[#5491CA] text-white py-2 rounded-lg font-medium 
                        hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 group"
              aria-label={`View doubts for ${course.title}`}
            >
              <span>See All Doubts</span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (<div className="min-h-screen bg-gray-50">
    {/* Mobile sidebar toggle button */}
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
  
    {/* Main content */}
    <div className={`pl-0 ${!isMobile ? "md:pl-[280px]" : ""} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#7670AC] dark:text-white">
                  Course <span className="text-[#5491CA] dark:text-[#7670AC]">Doubts</span>
                </h1>
          </header>
  
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5491CA] mb-4"></div>
            <p className="text-gray-500">Loading your courses...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
            <p className="text-red-500 mb-3 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {courses.map((course) => (
              <CourseCard key={course._id || course.courseCode} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center max-w-md mx-auto">
            <div className="bg-[#5491CA]/10 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-[#5491CA]" />
            </div>
            <p className="text-gray-500 mb-4">No courses available at the moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#5491CA] text-white rounded-lg hover:bg-[#467bb0] transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Doubts;