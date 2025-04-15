import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
// import { Assessment, KayakingRounded } from "@mui/icons-material";

const CourseAssignments = () => {
  const { courseId } = useParams(); // from route
  const navigate = useNavigate();

  const [solved, setSolved] = useState([]);
  const [unsolved, setUnsolved] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);
  // replace with auth context/user._id
  const user=JSON.parse(localStorage.getItem("user"))
 
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
    
        

        const res = await axiosInstance.get(`/api/student/assignments/${courseId }/${user._id}`);
        // const res = await axiosInstance.get(`http://localhost:4400/api/student/assignments/67e9f788e96fd9e008e22f43/67e405e7f896dbfcf96844fe`);
        

        

        setSolved(res.data.submitted);
        setUnsolved(res.data.unsolved);
        setCourseTitle( "Course");
      } catch (err) {
        console.error("Failed to load assignments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading assignments...</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-[#5491CA] mb-6">
        📚 {courseTitle} - Assignments
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ✅ Solved Assignments */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Solved</h3>
          {solved.length === 0 ? (
            <p className="text-sm text-gray-500">No solved assignments</p>
          ) : (
            solved.map((a) => (
              <div
                key={a._id}
                className="border border-green-300 rounded-xl p-4 bg-green-50 shadow-sm mb-3"
              >
                <h4 className="font-semibold text-green-800 text-lg">{a.title}</h4>
                <p className="text-sm text-gray-700">Marks: {a.marks}/{a.total}</p>
                <p className="text-xs text-gray-500">
                  Submitted: {moment(a.submittedAt).format("MMM D, YYYY")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* ❌ Unsolved Assignments */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Unsolved</h3>
          {unsolved.length === 0 ? (
            <p className="text-sm text-gray-500">No pending assignments</p>
          ) : (
            unsolved.map((a) => (
              <div
                key={a._id}
                className="border border-red-300 rounded-xl p-4 bg-red-50 shadow-sm mb-3 hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/student/assignment/${a._id}/${user._id}`)}
              >
                <h4 className="font-semibold text-red-800 text-lg">{a.title}</h4>
                <p className="text-sm text-gray-700 line-clamp-2">{a.description}</p>
                <p className="text-xs text-gray-500">
                  Deadline: {moment(a.deadline).format("MMM D, YYYY")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseAssignments;
