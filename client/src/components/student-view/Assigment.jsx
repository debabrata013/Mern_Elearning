import React, { useState, useEffect } from "react";
import Sidebar from './studentComponent/Sidebar';
import {
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

// Load initial data from localStorage or use defaults
const loadInitialData = (key, initialData) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initialData;
};

// Initial data
const initialPending = [
  {
    id: 1,
    title: "React State Management Assignment",
    description: "Complete a task on state management using Redux Toolkit.",
    tags: ["React", "Redux", "State Management"],
    dueDate: "2024-11-20",
    status: "Not Submitted",
    timeLimit: 30,
    questions: [
      {
        id: "q1",
        question: "What is Redux used for?",
        options: ["State management", "Styling", "Routing", "API calls"],
        correctAnswer: "State management",
      },
      {
        id: "q2",
        question: "Which hook is used for local state in React?",
        options: ["useState", "useEffect", "useContext", "useRef"],
        correctAnswer: "useState",
      },
    ],
  },
];

const initialCompleted = [
  {
    id: 3,
    title: "JavaScript ES6 Features Quiz",
    description: "Quiz focusing on modern JavaScript ES6+ syntax and features.",
    tags: ["JavaScript", "ES6"],
    grade: "8/10",
    completedDate: "2024-11-10",
    questions: [
      {
        id: "q1",
        question: "Which of the following is a feature of ES6?",
        options: ["Arrow functions", "Prototypes", "Callbacks", "None of these"],
        correctAnswer: "Arrow functions",
        studentAnswer: "Arrow functions",
      },
    ],
  },
];

const AssignmentCard = ({ item, type, onClick }) => {
  const dueDate = new Date(item.dueDate);
  const today = new Date();
  const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div
      onClick={onClick}
      className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
    >
      <div className="bg-white shadow-lg w-[250px] h-screen fixed top-0 left-0">
    <Sidebar />
  </div>
      {type === "pending" && (
        <div className="absolute top-2 right-2">
          {daysRemaining < 0 ? (
            <span className="bg-red-100 text-red-600 text-xs font-medium py-1 px-2 rounded-full">
              Overdue
            </span>
          ) : daysRemaining <= 3 ? (
            <span className="bg-yellow-100 text-yellow-600 text-xs font-medium py-1 px-2 rounded-full">
              Due in {daysRemaining} day{daysRemaining !== 1 && "s"}
            </span>
          ) : null}
        </div>
      )}
      <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {type === "pending" ? (
        <>
          <p className="text-sm text-gray-500 mb-1">
            Due: <span className="font-medium text-red-500">{item.dueDate}</span>
          </p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-medium text-yellow-600">{item.status}</span>
          </p>
          {item.timeLimit && (
            <p className="text-sm text-gray-500 mt-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Time Limit: {item.timeLimit} minutes
            </p>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-1">
            Grade: <span className="font-medium text-green-500">{item.grade}</span>
          </p>
          <p className="text-sm text-gray-500">
            Completed: <span className="font-medium">{item.completedDate}</span>
          </p>
        </>
      )}
    </div>
  );
};

const AssignmentDetail = ({ assignment, onBack, onSubmitAssignment }) => {
  const isPending = assignment.status !== undefined;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(assignment.timeLimit * 60 || null);
  const [submitted, setSubmitted] = useState(false);

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(`answers-${assignment.id}`);
    return saved ? JSON.parse(saved) : Object.fromEntries(
      assignment.questions.map(q => [q.id, ""])
    );
  });

  useEffect(() => {
    localStorage.setItem(`answers-${assignment.id}`, JSON.stringify(answers));
  }, [answers, assignment.id]);

  useEffect(() => {
    if (!timeLeft || !isPending) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (qId, option) => {
    if (!submitted && isPending) {
      setAnswers(prev => ({ ...prev, [qId]: option }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const updatedQuestions = assignment.questions.map(q => ({
      ...q,
      studentAnswer: answers[q.id]
    }));

    const correctCount = updatedQuestions.filter(
      q => q.studentAnswer === q.correctAnswer
    ).length;

    const newAssignment = {
      ...assignment,
      grade: `${correctCount}/${assignment.questions.length}`,
      completedDate: new Date().toISOString().split("T")[0],
      questions: updatedQuestions
    };

    setTimeout(() => {
      onSubmitAssignment(newAssignment);
      onBack();
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = assignment.questions[currentQuestionIndex];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg w-[250px] h-screen fixed top-0 left-0">
    <Sidebar />
  </div>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-500 mb-6 hover:text-blue-600"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Assignments
        </button>

        {timeLeft !== null && (
          <div className="flex items-center gap-2 mb-6 p-3 bg-red-50 rounded-lg">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-600">
              Time Remaining: {formatTime(timeLeft)}
            </span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">{assignment.title}</h2>
          <p className="text-gray-600 mb-6">{assignment.description}</p>

          <div className="flex justify-between mb-6">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Question {currentQuestionIndex + 1} of {assignment.questions.length}
            </span>
            <button
              onClick={() => setCurrentQuestionIndex(prev => 
                Math.min(assignment.questions.length - 1, prev + 1)
              )}
              disabled={currentQuestionIndex === assignment.questions.length - 1}
              className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200"
            >
              Next
            </button>
          </div>

          <div className="space-y-6">
            <div key={currentQuestion.id} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map(option => {
                  const isSelected = answers[currentQuestion.id] === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showAnswers = submitted || !isPending;

                  return (
                    <label
                      key={option}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        !showAnswers && "hover:border-blue-500"
                      } ${
                        showAnswers
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : isSelected
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                          : isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleSelect(currentQuestion.id, option)}
                        className="mr-3"
                        disabled={submitted || !isPending}
                      />
                      <span className="flex-1">{option}</span>
                      {showAnswers && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {showAnswers && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {isPending && !submitted && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowConfirm(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit Assignment
              </button>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold">Confirm Submission</h3>
            </div>
            <p className="mb-4">Are you sure you want to submit this assignment?</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AssignmentsAndQuizzes = () => {
  const [pending, setPending] = useState(() =>
    loadInitialData("pendingAssignments", initialPending)
  );
  const [completed, setCompleted] = useState(() =>
    loadInitialData("completedAssignments", initialCompleted)
  );
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllCompleted, setShowAllCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("pendingAssignments", JSON.stringify(pending));
  }, [pending]);

  useEffect(() => {
    localStorage.setItem("completedAssignments", JSON.stringify(completed));
  }, [completed]);

  const handleSubmitAssignment = (newAssignment) => {
    setCompleted(prev => [newAssignment, ...prev]);
    setPending(prev => prev.filter(a => a.id !== newAssignment.id));
  };

  if (selectedAssignment) {
    return (
      <AssignmentDetail
        assignment={selectedAssignment}
        onBack={() => setSelectedAssignment(null)}
        onSubmitAssignment={handleSubmitAssignment}
      />
    );
  }

  return (
    <div className="flex h-screen">
  {/* Sidebar - Fixed on the Left */}
  <div className="bg-white shadow-lg w-[250px] h-screen fixed top-0 left-0">
    <Sidebar />
  </div>

  {/* Main Content - Scrollable */}
  <div className="flex-1 ml-[250px] overflow-y-auto p-6 bg-gray-50">
    <h1 className="text-3xl font-bold text-center mb-8">Assignments & Quizzes</h1>

    {/* Pending Assignments */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        📌 Pending Assignments
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          {pending.length}
        </span>
      </h2>
      {pending.length === 0 ? (
        <p className="text-gray-600">No pending assignments. Great job! 🎉</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(showAllPending ? pending : pending.slice(0, 2)).map(item => (
              <AssignmentCard
                key={item.id}
                item={item}
                type="pending"
                onClick={() => setSelectedAssignment(item)}
              />
            ))}
          </div>
          {pending.length > 2 && (
            <button
              onClick={() => setShowAllPending(!showAllPending)}
              className="mt-6 flex items-center gap-2 text-blue-500 hover:text-blue-600 mx-auto"
            >
              {showAllPending ? "Show Less" : "Show More"}
              {showAllPending ? <ChevronUp /> : <ChevronDown />}
            </button>
          )}
        </>
      )}
    </section>

    {/* Completed Assignments */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-green-700">
        ✅ Completed Assignments
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
          {completed.length}
        </span>
      </h2>
      {completed.length === 0 ? (
        <p className="text-gray-600">No completed assignments yet. Let's get started! 💪</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(showAllCompleted ? completed : completed.slice(0, 2)).map(item => (
              <AssignmentCard
                key={item.id}
                item={item}
                type="completed"
                onClick={() => setSelectedAssignment(item)}
              />
            ))}
          </div>
          {completed.length > 2 && (
            <button
              onClick={() => setShowAllCompleted(!showAllCompleted)}
              className="mt-6 flex items-center gap-2 text-blue-500 hover:text-blue-600 mx-auto"
            >
              {showAllCompleted ? "Show Less" : "Show More"}
              {showAllCompleted ? <ChevronUp /> : <ChevronDown />}
            </button>
          )}
        </>
      )}
    </section>
  </div>
</div>

  );
};

export default AssignmentsAndQuizzes;