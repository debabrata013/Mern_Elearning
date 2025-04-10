import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { Plus, Trash2, Loader2 } from "lucide-react";

const CreateQuizAssignmentForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
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
        questions:questions
      });
      console.log("Quiz created successfully:", res.data);
      if (res.status !== 200) {
navigate(`/teacher/assignments/${courseId}`);}
    } catch (err) {
      console.error("Error creating quiz:", err);
      setError("Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 animate-fade-in">
    <h2 className="text-3xl font-extrabold mb-6 text-[#2D6AB1] flex items-center gap-2">
      📝 <span>Create Quiz Assignment</span>
    </h2>
  
    {error && (
      <p className="text-red-500 mb-4 bg-red-100 p-2 rounded text-sm">{error}</p>
    )}
  
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        placeholder="Enter Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#5491CA] transition"
      />
  
      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="border border-gray-300 p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold text-lg text-[#2D6AB1]">
              Question {qIndex + 1}
            </label>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
  
          {/* Question Text Area with Max Height & Scroll */}
          <textarea
            placeholder="Enter your question..."
            value={q.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            rows={3}
            className="w-full resize-y border-2 border-gray-300 p-3 mb-3 rounded-lg focus:outline-none focus:border-[#5491CA] transition overflow-auto max-h-40"
          />
  
          <div className="space-y-2">
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-start gap-3">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswerIndex === oIndex}
                  onChange={() =>
                    handleQuestionChange(qIndex, "correctAnswerIndex", oIndex)
                  }
                  className="accent-[#5491CA] mt-2"
                />
                <textarea
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  rows={2}
                  className="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-[#5491CA] transition resize-y max-h-28 overflow-auto"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
  
      <div className="flex gap-4 flex-wrap">
        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all shadow"
        >
          <Plus size={18} />
          Add Question
        </button>
  
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#5491CA] text-white py-3 rounded-lg hover:bg-[#3e6ca8] flex justify-center items-center transition-all shadow-md"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Create Quiz"}
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default CreateQuizAssignmentForm;
