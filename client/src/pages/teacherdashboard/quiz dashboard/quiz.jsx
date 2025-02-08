import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./quiz.css";

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    time: "",
    totalQuestions: 1,
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddQuiz = () => {
    setCurrentPage("addQuiz");
    setQuizData({ name: "", description: "", time: "", totalQuestions: 1 });
    setQuestions([]);
    setEditIndex(null);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuestions = () => {
    setCurrentPage("addQuiz");
  };

  const handleSaveQuiz = () => {
    if (editIndex !== null) {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes[editIndex] = { ...quizData, questions };
      setQuizzes(updatedQuizzes);
    } else {
      setQuizzes([...quizzes, { ...quizData, questions }]);
    }
    setCurrentPage("home");
  };

  const handleEditQuiz = (index) => {
    setQuizData(quizzes[index]);
    setQuestions(quizzes[index].questions);
    setEditIndex(index);
    setCurrentPage("addQuiz");
  };

  const handleDeleteQuiz = (index) => {
    setQuizzes(quizzes.filter((_, i) => i !== index));
  };

  return (
    <div className="quiz-dashboard">
      {currentPage === "home" && (
        <div className="home">
          <div className="home-header">
            <h2 className="heada">Quiz Dashboard</h2>
            <div className="search-bar-ka-beta">
              <input
                type="text"
                placeholder="Search quizzes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="add-quiz-btn" onClick={handleAddQuiz}>
               Add Quiz
            </button>
          </div>
          <div className="quiz-container">
            {quizzes
              .filter((quiz) =>
                quiz.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((quiz, index) => (
                <div key={index} className="quiz-card">
                  <h3>{quiz.name}</h3>
                  <p>{quiz.description}</p>
                  <p>
                    <strong>Date:</strong> {quiz.time}
                  </p>
                  <p>
                    <strong>Total Questions:</strong> {quiz.totalQuestions}
                  </p>
                  <div className="quiz-actions">
                    <button onClick={() => handleEditQuiz(index)}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDeleteQuiz(index)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {currentPage === "addQuiz" && (
        <div className="add-quiz">
          <h2 className="head-quiz">{editIndex !== null ? "Edit Quiz" : "Add Quiz"}</h2>
          <input
            type="text"
            placeholder="Quiz Name"
            value={quizData.name}
            onChange={(e) =>
              setQuizData({ ...quizData, name: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={quizData.description}
            onChange={(e) =>
              setQuizData({ ...quizData, description: e.target.value })
            }
          ></textarea>
          <input
            type="datetime-local"
            value={quizData.time}
            onChange={(e) => setQuizData({ ...quizData, time: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Questions"
            min="1"
            value={quizData.totalQuestions}
            onChange={(e) =>
              setQuizData({ ...quizData, totalQuestions: Number(e.target.value) })
            }
          />
          <div className="quiz-buttons a">
            <button onClick={() => setCurrentPage("home")}>Cancel</button>
            <button onClick={() => setCurrentPage("addQuestion")}>
              Add Questions
            </button>
          </div>
        </div>
      )}

      {currentPage === "addQuestion" && (
        <div className="add-question">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <input
            type="text"
            placeholder="Enter Question"
            value={questions[currentQuestionIndex]?.question || ""}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex],
                question: e.target.value,
              };
              setQuestions(newQuestions);
            }}
          />
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="option">
                <input
                  type="checkbox"
                  checked={questions[currentQuestionIndex]?.correctIndex === i}
                  onChange={() => {
                    const newQuestions = [...questions];
                    newQuestions[currentQuestionIndex] = {
                      ...newQuestions[currentQuestionIndex],
                      correctIndex: i,
                    };
                    setQuestions(newQuestions);
                  }}
                />
                <input
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={questions[currentQuestionIndex]?.options?.[i] || ""}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    if (!newQuestions[currentQuestionIndex]?.options) {
                      newQuestions[currentQuestionIndex] = {
                        ...newQuestions[currentQuestionIndex],
                        options: ["", "", "", ""],
                      };
                    }
                    newQuestions[currentQuestionIndex].options[i] =
                      e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
              </div>
            ))}
          <div className="quiz-buttons">
            <button onClick={() => setCurrentPage("addQuiz")}>Cancel</button>
            <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
              Prev
            </button>
            {currentQuestionIndex === quizData.totalQuestions - 1 ? (
              <button onClick={handleFinishQuestions}>Finish</button>
            ) : (
              <button onClick={handleNextQuestion}>Next</button>
            )}
          </div>
        </div>
      )}

      {currentPage === "addQuiz" && questions.length > 0 && (
        <button className="save-btn" onClick={handleSaveQuiz}>
          Save Quiz
        </button>
      )}
    </div>
  );
};

export default QuizDashboard;
