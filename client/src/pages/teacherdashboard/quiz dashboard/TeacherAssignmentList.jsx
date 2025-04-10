import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { Plus, FileText } from "lucide-react";
import moment from "moment";

const TeacherAssignmentList = () => {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        console.log(user._id);
        
        const res = await axiosInstance.get(`/api/teacher/assignments`, {
            params: {
              userid: user._id,
            }
          }
        );
        console.log("Assignments response:", res);
        
        setAssignments(res.data || []);
        setCourseTitle(res.data.course?.title || "Course");
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [email, courseId]);

  const handleCreate = () => {
    navigate(`/teacher/assignments/${courseId}/create`);
  };

  return (
    <div className="p-6">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-extrabold text-[#2D6AB1] tracking-tight">
      {courseTitle} - <span className="text-gray-700">Assignments</span>
    </h2>
    <button
      onClick={handleCreate}
      className="flex items-center gap-2 bg-gradient-to-r from-[#5491CA] to-[#3e6ca8] text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
    >
      <Plus size={20} />
      Create Assignment
    </button>
  </div>

  {loading ? (
    <p className="text-gray-500 text-center animate-pulse text-lg">Loading assignments...</p>
  ) : assignments.length === 0 ? (
    <div className="text-center text-gray-400 text-lg italic mt-12">No assignments found.</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map((assignment) => (
        <div
          key={assignment._id}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-transparent hover:border-blue-300 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-[#5491CA] group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold text-[#2D6AB1] group-hover:underline">
              {assignment.title}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-600">Deadline:</span>{" "}
            {moment(assignment.deadline).format("MMM DD, YYYY")}
          </p>
          <p className="text-sm text-gray-700 mb-3">{assignment.description}</p>
          <div className="text-sm text-gray-500 font-medium">
            Total Questions:{" "}
            <span className="text-gray-700">{assignment.questions.length}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default TeacherAssignmentList;
