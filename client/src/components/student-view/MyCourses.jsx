import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./course-card-after-buy/coursecard";
import Sidebar from "./studentComponent/Sidebar";
import { getAllCourses } from "../../pages/landing-page/api/landingServices";
const MyCourses = () => {
  const [myCourses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
<div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
  {/* Sidebar */}
  <div className="bg-white dark:bg-gray-800 shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 dark:border-gray-700 z-40">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="w-full lg:ml-[280px] px-4 sm:px-6 py-10 transition-all duration-300">
    <h1 className="text-3xl font-bold text-center text-[#5491CA] mb-8">
      My Courses
    </h1>

    {loading && (
      <p className="text-center text-gray-600 dark:text-gray-400">Loading your courses...</p>
    )}

    {!loading && error && (
      <p className="text-center text-red-500 font-medium">{error}</p>
    )}

    {!loading && myCourses.length === 0 && (
      <p className="text-center text-gray-500 dark:text-gray-400">
        You haven’t enrolled in any course yet.
      </p>
    )}

    {/* Grid Layout for Courses */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
      {myCourses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  </div>
</div>

  );
};

export default MyCourses;
