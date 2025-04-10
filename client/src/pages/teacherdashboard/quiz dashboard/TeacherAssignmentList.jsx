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
        const res = await axiosInstance.get(`api/teacher/assignments`, {
            params: {
              userid: user._id
            }
          }
        );
        console.log("Assignments response:", res.data);
        
        setAssignments(res.data.assignments || []);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5491CA]">{courseTitle} - Assignments</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#5491CA] text-white px-4 py-2 rounded-lg hover:bg-[#3e6ca8] transition-all"
        >
          <Plus size={20} /> Create Assignment
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-gray-500 text-center">No assignments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md border hover:border-blue-400 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-[#5491CA]" />
                <h3 className="text-lg font-semibold text-[#5491CA]">{assignment.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">Due: {moment(assignment.deadline).format("MMM DD, YYYY")}</p>
              <p className="text-sm text-gray-700 mb-2">{assignment.description}</p>
              <div className="text-xs text-gray-500">Total Marks: {assignment.totalMarks}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherAssignmentList;
