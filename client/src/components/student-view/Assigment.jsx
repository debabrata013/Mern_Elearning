import React, { useEffect, useState } from "react";
import { Users, Calendar, Loader, BookOpen,Menu } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Sidebar from './studentComponent/Sidebar';

const Assignments = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/courses/getallCourse/op");
        setCourses(response.data.courses);
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
    navigate(`/Mycourse/${courseId}/Assigment`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const CourseCard = React.memo(({ course }) => {
    const navigate = useNavigate();
  
    const handleContinue = () => {
      navigate(`/mycourse/course/${course._id}`, { state: { course } });
    };
  
    return (
      <div className="flex flex-col items-center w-[260px] h-[320px] cursor-pointer transition-transform hover:-translate-y-1 duration-300">
        <div className="bg-[#5491CA] text-white rounded-2xl overflow-hidden w-full shadow-lg hover:shadow-2xl">
          <div className="p-5 bg-[#5491CA] flex justify-center items-center h-[100px]">
            {course.coverImage ? (
              <img
                src={course.coverImage}
                alt={course.title}
                className="max-h-[60px] object-contain"
                loading="lazy"
              />
            ) : (
              <BookOpen className="w-12 h-12 text-white opacity-80" />
            )}
          </div>
    
          <div className="bg-white text-black px-4 py-3 h-[200px] rounded-t-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-md font-semibold text-center">{course.title}</h3>
              <p className="text-sm mt-2 leading-snug text-center line-clamp-4">
                {course.description || "No description available."}
              </p>
            </div>
            <button 
              className="mt-4 bg-[#5491CA] text-white text-sm font-medium py-2 rounded-lg hover:bg-[#467bb0] transition-colors duration-200"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (<div className="min-h-screen bg-gray-50 flex">
    {/* Sidebar */}
    {isMobile && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#5491CA] text-white shadow-lg hover:bg-[#467bb0] transition-colors"
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
    <div className={`flex-1 ml-0 ${!isMobile ? "ml-[280px]" : ""} px-4 sm:px-6 lg:px-8 py-8`}>
    <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#7670AC] dark:text-white">
                  Course <span className="text-[#5491CA] dark:text-[#7670AC]">Assignments</span>
                </h1>
          </header>
  
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="h-10 w-10 text-[#5491CA] animate-spin mb-4" />
          <p className="text-gray-500">Loading your courses...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center">
          <p className="text-red-500 mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id || course.courseCode} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No courses available at the moment.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#5491CA] text-white rounded-md hover:bg-[#467bb0] transition-colors"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default Assignments;
