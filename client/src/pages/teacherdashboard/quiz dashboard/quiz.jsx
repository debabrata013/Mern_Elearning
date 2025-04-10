import React, { useEffect, useState } from "react";
import { Plus, ArrowLeft, Video, Users, Calendar, Clock, X, BookOpen, FilePlus, Loader, File } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const QuizDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/teachers/get?email=${email}`);
        const today = new Date();
        const filteredCourses = response.data.filter(course => new Date(course.endDate) > today);
        setCourses(filteredCourses);
      } catch (err) {
        setError("Failed to load courses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [email]);

  const handleCourseClick = (courseId) => {
    navigate(`/teacher/assignments/${courseId}`);
  };

  const CourseCard = React.memo(({ course }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-r from-[#5491CA]/30 to-[#b1a9f1]/30 relative">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#5491CA]">{course.title}</h3>
        <p className="text-gray-600 mb-2">{course.description || "No description available."}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Users className="h-4 w-4 text-[#b1a9f1]" />
          <span>{course.maxStudents} students</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#5491CA] mb-2">
          <Calendar className="h-4 w-4" />
          <span>{moment(course.startDate).format("MMM DD, YYYY")}</span>
        </div>
        <div className="text-sm font-semibold text-gray-700 mb-3">
          Price: {course.currency} {course.price}
        </div>
        <button
          onClick={() => handleCourseClick(course._id)}
          className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white py-2 rounded-lg hover:shadow-md transition-all"
        >
          View Assignments
        </button>
      </div>
    </div>
  ));

  return (
    <div className="quiz-dashboard p-6">
      <h3 className="text-2xl font-bold mb-4">Courses</h3>
      {loading ? (
        <p className="text-gray-500 text-center">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course._id || course.courseCode} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No courses available.</p>
      )}
    </div>
  );
};

export default QuizDashboard;
