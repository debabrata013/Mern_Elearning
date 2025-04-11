// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "@/api/axiosInstance";
// import { Plus, Trash2, Loader2 } from "lucide-react";

// const CreateQuizAssignmentForm = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [title, setTitle] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleQuestionChange = (index, key, value) => {
//     const updated = [...questions];
//     updated[index][key] = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
//     ]);
//   };

//   const removeQuestion = (index) => {
//     const updated = [...questions];
//     updated.splice(index, 1);
//     setQuestions(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || questions.some(q => !q.questionText || q.options.some(o => !o))) {
//       setError("Please fill all fields correctly.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axiosInstance.post("/api/teacher/assignments/create", {
//         course: courseId,
//         userid: user._id,
//         title,
//         questions:questions
//       });
//       console.log("Quiz created successfully:", res.data);
//       if (res.status !== 200) {
// navigate(`/teacher/assignments/${courseId}`);}
//     } catch (err) {
//       console.error("Error creating quiz:", err);
//       setError("Failed to create assignment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 animate-fade-in">
//     <h2 className="text-3xl font-extrabold mb-6 text-[#2D6AB1] flex items-center gap-2">
//       📝 <span>Create Quiz Assignment</span>
//     </h2>
  
//     {error && (
//       <p className="text-red-500 mb-4 bg-red-100 p-2 rounded text-sm">{error}</p>
//     )}
  
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <input
//         type="text"
//         placeholder="Enter Quiz Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#5491CA] transition"
//       />
  
//       {questions.map((q, qIndex) => (
//         <div
//           key={qIndex}
//           className="border border-gray-300 p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-all"
//         >
//           <div className="flex justify-between items-center mb-3">
//             <label className="font-semibold text-lg text-[#2D6AB1]">
//               Question {qIndex + 1}
//             </label>
//             {questions.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeQuestion(qIndex)}
//                 className="text-red-500 hover:text-red-700 transition"
//               >
//                 <Trash2 size={18} />
//               </button>
//             )}
//           </div>
  
//           {/* Question Text Area with Max Height & Scroll */}
//           <textarea
//             placeholder="Enter your question..."
//             value={q.questionText}
//             onChange={(e) =>
//               handleQuestionChange(qIndex, "questionText", e.target.value)
//             }
//             rows={3}
//             className="w-full resize-y border-2 border-gray-300 p-3 mb-3 rounded-lg focus:outline-none focus:border-[#5491CA] transition overflow-auto max-h-40"
//           />
  
//           <div className="space-y-2">
//             {q.options.map((opt, oIndex) => (
//               <div key={oIndex} className="flex items-start gap-3">
//                 <input
//                   type="radio"
//                   name={`correct-${qIndex}`}
//                   checked={q.correctAnswerIndex === oIndex}
//                   onChange={() =>
//                     handleQuestionChange(qIndex, "correctAnswerIndex", oIndex)
//                   }
//                   className="accent-[#5491CA] mt-2"
//                 />
//                 <textarea
//                   placeholder={`Option ${oIndex + 1}`}
//                   value={opt}
//                   onChange={(e) =>
//                     handleOptionChange(qIndex, oIndex, e.target.value)
//                   }
//                   rows={2}
//                   className="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-[#5491CA] transition resize-y max-h-28 overflow-auto"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
  
//       <div className="flex gap-4 flex-wrap">
//         <button
//           type="button"
//           onClick={addQuestion}
//           className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all shadow"
//         >
//           <Plus size={18} />
//           Add Question
//         </button>
  
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 bg-[#5491CA] text-white py-3 rounded-lg hover:bg-[#3e6ca8] flex justify-center items-center transition-all shadow-md"
//         >
//           {loading ? <Loader2 className="animate-spin" /> : "Create Quiz"}
//         </button>
//       </div>
//     </form>
//   </div>
  
//   );
// };

// export default CreateQuizAssignmentForm;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { 
  Plus, 
  Trash2, 
  Loader2, 
  ChevronRight, 
  FileText, 
  Check, 
  AlertTriangle,
  HelpCircle,
  BookOpen
} from "lucide-react";

const CreateQuizAssignmentForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleQuestionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
    ];
    setQuestions(newQuestions);
    setActiveQuestion(newQuestions.length - 1);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
    if (activeQuestion >= updated.length) {
      setActiveQuestion(Math.max(0, updated.length - 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || questions.some(q => !q.questionText || q.options.some(o => !o))) {
      setError("Please fill all fields correctly.");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/teacher/assignments/create", {
        course: courseId,
        userid: user._id,
        title,
        description,
        questions: questions
      });
      
      console.log("Quiz created successfully:", res.data);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/teacher/assignments/${courseId}`);
      }, 1500);
    } catch (err) {
      console.error("Error creating quiz:", err);
      setError("Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl mt-4 md:mt-8">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 flex items-center gap-2">
          <BookOpen className="text-indigo-600" size={28} />
          <span>Create Quiz Assignment</span>
        </h2>
        <p className="text-gray-600 mt-2">Create an interactive quiz with multiple-choice questions for your students</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md flex items-start">
          <AlertTriangle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md flex items-start">
          <Check className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-green-700 text-sm">Quiz created successfully! Redirecting...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <FileText className="mr-2 text-indigo-600" size={20} />
            Quiz Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter a descriptive title for your quiz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Quiz Description</label>
              <textarea
                id="description"
                placeholder="Provide a brief description of this quiz"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

           
          </div>
        </div>

        <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <HelpCircle className="mr-2 text-indigo-600" size={20} />
              Questions ({questions.length})
            </h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-1 bg-indigo-100 text-indigo-700 py-1 px-3 rounded-lg hover:bg-indigo-200 transition-all text-sm font-medium"
            >
              <Plus size={16} />
              Add Question
            </button>
          </div>

          <div className="mb-4 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveQuestion(index)}
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    activeQuestion === index
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className={`border border-gray-300 p-4 rounded-xl bg-white shadow-sm transition-all ${
                activeQuestion === qIndex ? "block" : "hidden"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-lg text-indigo-700">
                  Question {qIndex + 1}
                </label>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700 transition p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <textarea
                placeholder="Enter your question..."
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "questionText", e.target.value)
                }
                rows={3}
                className="w-full resize-y border-2 border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition overflow-auto max-h-40"
              />

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Options (select the correct answer)</p>
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="radio"
                      id={`option-${qIndex}-${oIndex}`}
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswerIndex === oIndex}
                      onChange={() =>
                        handleQuestionChange(qIndex, "correctAnswerIndex", oIndex)
                      }
                      className="accent-indigo-600 mt-3"
                    />
                    <div className="w-full">
                      <label htmlFor={`option-${qIndex}-${oIndex}`} className="text-xs text-gray-500 block mb-1">
                        Option {oIndex + 1}
                      </label>
                      <textarea
                        placeholder={`Enter option ${oIndex + 1}`}
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        rows={2}
                        className="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y max-h-28 overflow-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setActiveQuestion(Math.max(0, qIndex - 1))}
                  disabled={qIndex === 0}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    qIndex === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>
                
                <button
                  type="button"
                  onClick={() => setActiveQuestion(Math.min(questions.length - 1, qIndex + 1))}
                  disabled={qIndex === questions.length - 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    qIndex === questions.length - 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
        

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 flex justify-center items-center transition-all shadow-md font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Creating Quiz...
              </>
            ) : (
              <>
                Save Quiz
                <ChevronRight size={18} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuizAssignmentForm;