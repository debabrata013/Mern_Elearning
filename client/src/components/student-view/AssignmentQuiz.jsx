// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import axiosInstance from "@/api/axiosInstance"; // Ensure axiosInstance is configured correctly

// const AssignmentQuiz = () => {
//   const { assignmentId } = useParams();
//   const [assignment, setAssignment] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Fetch user from localStorage

//   // Fetching assignment details on component mount
//   useEffect(() => {
//     const fetchAssignment = async () => {
//       try {
//         const res = await axiosInstance.get(`/api/student/assignments/${assignmentId}`);
//         setAssignment(res.data[0]); // Assuming the response contains an array with one object
//       } catch (err) {
//         console.error("Error fetching assignment:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignment();
//   }, [assignmentId]);

//   // Handle radio button change for answers
//   const handleOptionChange = (qIndex, optIndex) => {
//     setAnswers({ ...answers, [qIndex]: optIndex });
//   };

//   // Handle assignment submission
//   // const handleSubmit = async () => {
//   //   setSubmitting(true);
//   //   try {
      
//   //     const response = await axiosInstance.post(`api/student/assignments/a/${assignmentId}/submit/op`, {
//   //       answers: answers,
//   //       userid: user._id, // Pass user ID to the backend
//   //     });
//   //     if (response.status === 201) {
//   //       setSubmitted(true); // Mark assignment as submitted
//   //     }
//   //   } catch (err) {
//   //     console.error("Error submitting assignment:", err);
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };
//   const handleSubmit = async () => {
//     setSubmitting(true);
//     try {
//       // Convert object to array
//       const answerArray = Object.values(answers); // e.g., { '0': 1, '1': 3 } → [1, 3]
  
//       const res = await axiosInstance.post(`/api/student/assignments/a/${assignmentId}/submit/op`, {
//         userid: user._id,
//         answers: answerArray,
//       });
  
//       if (res.status === 201) {
//         setSubmitted(true);
//       }
//     } catch (err) {
//       console.error("❌ Error submitting assignment:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
  
//   // Display loading state
//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-gray-500">
//         <Loader2 className="mx-auto animate-spin" />
//         Loading Assignment...
//       </div>
//     );
//   }

//   // Display success message after submission
//   if (submitted) {
//     return (
//       <div className="text-center mt-10 text-green-600 text-xl font-bold">
//         ✅ Assignment Submitted Successfully!
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
//       <h2 className="text-2xl font-bold mb-6 text-[#5491CA]">
//         🧠 {assignment.title}
//       </h2>

//       <form className="space-y-8">
//         {/* Loop through the questions */}
//         {assignment.questions.map((q, qIndex) => (
//           <div key={qIndex} className="bg-gray-50 p-4 rounded-xl border">
//             <h3 className="font-semibold mb-3">
//               Q{qIndex + 1}. {q.questionText}
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {/* Loop through the options for each question */}
//               {q.options.map((option, optIndex) => (
//                 <label
//                   key={optIndex}
//                   className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition ${
//                     answers[qIndex] === optIndex
//                       ? "bg-[#d0e5ff] border-[#5491CA]"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${qIndex}`}
//                     checked={answers[qIndex] === optIndex}
//                     onChange={() => handleOptionChange(qIndex, optIndex)} // Handle option change
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}

//         {/* Submit button */}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={submitting}
//           className="w-full mt-4 bg-[#5491CA] hover:bg-[#3e6ca8] text-white py-2 px-4 rounded transition flex justify-center items-center"
//         >
//           {submitting ? (
//             <>
//               <Loader2 className="animate-spin mr-2" />
//               Submitting...
//             </>
//           ) : (
//             "Submit Assignment"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignmentQuiz;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, CheckCircle, BookOpen, Send } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

const AssignmentQuiz = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Fetching assignment details on component mount
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axiosInstance.get(`/api/student/assignments/${assignmentId}`);
        setAssignment(res.data[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching assignment:", err);
        setError("Failed to load assignment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  // Handle radio button change for answers - Fixed to ensure proper handling
  const handleOptionChange = (qIndex, optIndex) => {
    console.log(`Selected question ${qIndex}, option ${optIndex}`); // Debug logging
    setAnswers(prevAnswers => ({ ...prevAnswers, [qIndex]: optIndex }));
  };

  // Handle assignment submission
  const handleSubmit = async () => {
    // Check if all questions are answered
    if (assignment && Object.keys(answers).length < assignment.questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      // Convert object to array
      const answerArray = Object.values(answers);
  
      const res = await axiosInstance.post(`/api/student/assignments/a/${assignmentId}/submit/op`, {
        userid: user._id,
        answers: answerArray,
      });
  
      if (res.status === 201) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("❌ Error submitting assignment:", err);
      setError("Failed to submit assignment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Loading state with improved animation
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-blue-500" />
        <p className="text-lg font-medium">Loading Assignment...</p>
      </div>
    );
  }

  // Error state
  if (error && !assignment) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 text-center">
        <div className="p-6 bg-red-50 rounded-lg border border-red-100">
          <p className="text-red-600 font-medium text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Success state after submission with animation
  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Assignment Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your answers have been recorded.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow hover:shadow-md"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{assignment?.title}</h2>
              <p className="text-blue-100 mt-1 text-sm">{assignment?.questions?.length} Questions • Complete all questions to proceed</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4 sm:p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Object.keys(answers).length}/{assignment?.questions?.length} answered</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(Object.keys(answers).length / (assignment?.questions?.length || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Questions */}
            {assignment?.questions?.map((q, qIndex) => (
              <div 
                key={qIndex} 
                className={`bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 ${
                  Object.keys(answers).includes(qIndex.toString()) ? "border-blue-200 shadow-blue-50" : ""
                }`}
              >
                <h3 className="font-medium text-lg text-gray-800 mb-4 flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 inline-flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                    {qIndex + 1}
                  </span>
                  <span>{q.questionText}</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {q.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      onClick={() => handleOptionChange(qIndex, optIndex)}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        answers[qIndex] === optIndex
                          ? "bg-blue-50 border-blue-300 ring-1 ring-blue-300"
                          : "border-gray-200"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        answers[qIndex] === optIndex
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}>
                        {answers[qIndex] === optIndex && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit button */}
            <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-white via-white to-transparent">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full py-3 px-4 rounded-lg font-medium flex justify-center items-center transition-all duration-300 ${
                  Object.keys(answers).length === assignment?.questions?.length
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-5 h-5" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    <span>Submit Assignment</span>
                  </>
                )}
              </button>
              
              {/* Question counter */}
              <p className="text-center text-sm text-gray-500 mt-3">
                {Object.keys(answers).length < (assignment?.questions?.length || 0) ? 
                  `Please answer ${assignment?.questions?.length - Object.keys(answers).length} more question${assignment?.questions?.length - Object.keys(answers).length !== 1 ? 's' : ''}` :
                  'All questions answered! Ready to submit.'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentQuiz;