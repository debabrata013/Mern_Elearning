// import React, { useEffect, useState } from "react";
// import {
//   Users,
//   Calendar
// } from "lucide-react";
// import axiosInstance from "@/api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import Sidebar from './studentComponent/Sidebar';
// const Doubts = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosInstance.get("/courses/getallCourse/op");
//         setCourses(response.data.courses);
//       } catch (err) {
//         setError("Failed to load courses");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleCourseClick = (courseId) => {
//     navigate(`/Mycourse/${courseId}/Assigment`);
//   };

//   const CourseCard = React.memo(({ course }) => (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="h-48 bg-gradient-to-r from-[#5491CA]/30 to-[#b1a9f1]/30 relative">
//         <img
//           src={course.coverImage}
//           alt={course.title}
//           className="w-full h-full object-cover mix-blend-overlay"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2 text-[#5491CA]">
//           {course.title}
//         </h3>
//         <p className="text-gray-600 mb-2">
//           {course.description || "No description available."}
//         </p>
//         <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//           <Users className="h-4 w-4 text-[#b1a9f1]" />
//           <span>{course.maxStudents} students</span>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-[#5491CA] mb-2">
//           <Calendar className="h-4 w-4" />
//           <span>{moment(course.startDate).format("MMM DD, YYYY")}</span>
//         </div>
        
//         <button
//           onClick={() => handleCourseClick(course._id)}
//           className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white py-2 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out font-semibold flex items-center justify-center gap-2"
//         >
//          See All Assigment
//         </button>
//       </div>
//     </div>
//   ));

//   return (
//     <div className="quiz-dashboard p-6">
//       <h3 className="text-2xl font-bold mb-4">Courses</h3>
//       {loading ? (
//         <p className="text-gray-500 text-center">Loading courses...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : courses.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <CourseCard key={course._id || course.courseCode} course={course} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">No courses available.</p>
//       )}
//     </div>
//   );
// };

// export default Doubts;

import React, { useEffect, useState } from "react";
import { Users, Calendar, Loader, BookOpen } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Sidebar from './studentComponent/Sidebar';

const Assignments = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const CourseCard = React.memo(({ course }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-r from-blue-200 to-purple-200 relative">
        {course.coverImage ? (
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover mix-blend-overlay"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="w-16 h-16 text-blue-300" />
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-3 text-blue-600 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {course.description || "No description available."}
        </p>
        
        <div className="flex flex-col space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
            <span>{course.maxStudents} students</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{moment(course.startDate).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        
        <button
          onClick={() => handleCourseClick(course._id)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium 
                    hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 group"
          aria-label={`View assignments for ${course.title}`}
        >
          <span>See All Assignments</span>
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Assignments</h1>
          <p className="text-gray-500">View and manage assignments for all your enrolled courses</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="h-10 w-10 text-blue-500 animate-spin mb-4" />
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
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
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