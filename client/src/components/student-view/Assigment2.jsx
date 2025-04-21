// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "@/api/axiosInstance";
// // import { Assessment, KayakingRounded } from "@mui/icons-material";

// const CourseAssignments = () => {
//   const { courseId } = useParams(); // from route
//   const navigate = useNavigate();

//   const [solved, setSolved] = useState([]);
//   const [unsolved, setUnsolved] = useState([]);
//   const [courseTitle, setCourseTitle] = useState("");
//   const [loading, setLoading] = useState(true);
//   // replace with auth context/user._id
//   const user=JSON.parse(localStorage.getItem("user"))
 
//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
    
        

//         const res = await axiosInstance.get(`/api/student/assignments/${courseId }/${user._id}`);
//         // const res = await axiosInstance.get(`http://localhost:4400/api/student/assignments/67e9f788e96fd9e008e22f43/67e405e7f896dbfcf96844fe`);
        

        

//         setSolved(res.data.submitted);
//         console.log(res.data.submitted);
        
//         setUnsolved(res.data.unsolved);
//         setCourseTitle( "Course");
//       } catch (err) {
//         console.error("Failed to load assignments", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500 mt-10">Loading assignments...</p>;
//   }

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold text-[#5491CA] mb-6">
//         📚 {courseTitle} - Assignments
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* ✅ Solved Assignments */}
//         <div>
//           <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Solved</h3>
//           {solved.length === 0 ? (
//             <p className="text-sm text-gray-500">No solved assignments</p>
//           ) : (
//             solved.map((a) => (
//               <div
//                 key={a._id}
//                 className="border border-green-300 rounded-xl p-4 bg-green-50 shadow-sm mb-3"
//               >
//                 <h4 className="font-semibold text-green-800 text-lg">{a.title}</h4>
//                 <p className="text-sm text-gray-700">Marks: {a.score
//                 }/{a.totalQuestions}</p>
//                 <p className="text-xs text-gray-500">
//                   Submitted: {moment(a.submittedAt).format("MMM D, YYYY")}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ❌ Unsolved Assignments */}
//         <div>
//           <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Unsolved</h3>
//           {unsolved.length === 0 ? (
//             <p className="text-sm text-gray-500">No pending assignments</p>
//           ) : (
//             unsolved.map((a) => (
//               <div
//                 key={a._id}
//                 className="border border-red-300 rounded-xl p-4 bg-red-50 shadow-sm mb-3 hover:shadow-md transition cursor-pointer"
//                 onClick={() => navigate(`/student/assignment/${a._id}/${user._id}`)}
//               >
//                 <h4 className="font-semibold text-red-800 text-lg">{a.title}</h4>
//                 <p className="text-sm text-gray-700 line-clamp-2">{a.description}</p>
//                 <p className="text-xs text-gray-500">
//                   Deadline: {moment(a.deadline).format("MMM D, YYYY")}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseAssignments;

import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { BookOpen, CheckCircle, Clock, AlertCircle, Award, ChevronRight, Loader2 } from "lucide-react";

const CourseAssignments = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [solved, setSolved] = useState([]);
  const [unsolved, setUnsolved] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
 
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axiosInstance.get(`/api/student/assignments/${courseId}/${user._id}`);
        setSolved(res.data.submitted);
        setUnsolved(res.data.unsolved);
        setCourseTitle(res.data.courseTitle || "Course");
        setError(null);
      } catch (err) {
        console.error("Failed to load assignments", err);
        setError("Unable to load assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId, user._id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
          <AlertCircle className="inline-block mb-2 w-8 h-8" />
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header with course info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 mb-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{courseTitle}</h2>
            <p className="text-blue-100">
              {solved.length + unsolved.length} assignments • {solved.length} completed
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Course progress</span>
            <span>{Math.round((solved.length / (solved.length + unsolved.length)) * 100) || 0}% complete</span>
          </div>
          <div className="w-full bg-blue-300/30 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(solved.length / (solved.length + unsolved.length)) * 100 || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Assignment summary cards */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Total Assignments</h3>
              <p className="text-2xl font-bold text-gray-800">{solved.length + unsolved.length}</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Completed</h3>
              <p className="text-2xl font-bold text-gray-800">{solved.length}</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium">Pending</h3>
              <p className="text-2xl font-bold text-gray-800">{unsolved.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Completed Assignments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-green-50 p-4 border-b border-green-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Completed Assignments</h3>
            </div>
          </div>
          
          <div className="p-4">
            {solved.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-300" />
                </div>
                <p>No completed assignments yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {solved.map((assignment) => (
                  <div
                    key={assignment._id}
                    className="border border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <h4 className="font-medium text-green-800">{assignment.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-green-700 border border-green-200">
                        Score: {assignment.score}/{assignment.totalQuestions}
                      </div>
                      <p className="text-xs text-gray-500 flex items-center">
                        <span className="mr-1">Submitted:</span>
                        {moment(assignment.submittedAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Pending Assignments</h3>
            </div>
          </div>
          
          <div className="p-4">
            {unsolved.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-blue-300" />
                </div>
                <p>All assignments completed!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {unsolved.map((assignment) => (
                  <div
                    key={assignment._id}
                    onClick={() => navigate(`/student/assignment/${assignment._id}/${user._id}`)}
                    className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <h4 className="font-medium text-blue-800">{assignment.title}</h4>
                    
                    {assignment.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {assignment.description}
                      </p>
                    )}
                    
                    <div className="flex justify-end items-center mt-3">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        Start Assignment
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAssignments;
