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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#5491CA]">📝 Create Quiz Assignment</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">Question {qIndex + 1}</label>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, "questionText", e.target.value)
              }
              className="w-full border p-2 mb-2 rounded"
            />

            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswerIndex === oIndex}
                  onChange={() =>
                    handleQuestionChange(qIndex, "correctAnswerIndex", oIndex)
                  }
                />
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center gap-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          <Plus size={18} />
          Add Question
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5491CA] text-white py-2 rounded hover:bg-[#3e6ca8] flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuizAssignmentForm;
