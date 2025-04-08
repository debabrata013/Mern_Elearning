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
  AlertCircle,
  FileText,
  BarChart3,
  Calendar,
  Award,
  Eye,
  ArrowRight,
  Menu,
  Search,
  Filter
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
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-[#5491CA]/50 dark:hover:border-[#7670AC]/50"
    >
      {/* Top Gradient Bar */}
      <div className="h-2 bg-gradient-to-r from-[#5491CA] to-[#7670AC]" />

      {/* Main Content */}
      <div className="p-6">
        {/* Status Badge */}
        {type === "pending" && (
          <div className="absolute top-4 right-4 z-10">
            {daysRemaining < 0 ? (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 shadow-sm">
                <AlertCircle className="w-3.5 h-3.5 mr-1" /> Overdue
              </span>
            ) : daysRemaining <= 3 ? (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600 border border-yellow-100 shadow-sm">
                <Clock className="w-3.5 h-3.5 mr-1" /> {daysRemaining}d left
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                <Calendar className="w-3.5 h-3.5 mr-1" /> {daysRemaining}d left
              </span>
            )}
          </div>
        )}

        {/* Title and Description */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#5491CA] transition-colors mb-2">
            {item.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#5491CA]/10 text-[#5491CA] dark:bg-[#5491CA]/20 dark:text-[#6ba2d8] hover:bg-[#5491CA]/20 dark:hover:bg-[#5491CA]/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

        {/* Footer Information */}
        {type === "pending" ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
              <p className="text-sm font-medium text-[#5491CA] dark:text-[#6ba2d8] flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(item.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            {item.timeLimit && (
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Time Limit</p>
                <p className="text-sm font-medium text-[#7670AC] dark:text-[#8f89c5] flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {item.timeLimit} min
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Grade</p>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                {item.grade}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-sm font-medium text-[#5491CA] dark:text-[#6ba2d8] flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {new Date(item.completedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:from-[#5491CA]/90 hover:to-[#7670AC]/90 transform hover:-translate-y-0.5">
          {type === "pending" ? (
            <>Start Assignment <ArrowRight className="w-4 h-4" /></>
          ) : (
            <>View Details <Eye className="w-4 h-4" /></>
          )}
        </button>
      </div>
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!timeLeft || !isPending || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPending, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  const currentQuestion = assignment.questions[currentQuestionIndex];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out z-40 ${
        isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      }`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-[280px]'
      }`}>
        {/* Top Navigation Bar */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              )}
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-[#5491CA] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Assignments</span>
              </button>
            </div>

            {timeLeft !== null && timeLeft > 0 && (
              <div className={`
                flex items-center gap-3 px-3 md:px-4 py-2 rounded-lg border text-sm md:text-base
                ${timeLeft < 300 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400' 
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400'}
              `}>
                <Clock className={`w-4 md:w-5 h-4 md:h-5 ${timeLeft < 300 ? 'animate-pulse' : ''}`} />
                <span className="font-medium tabular-nums">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Question Content */}
        <div className="p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Assignment Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="h-2 bg-gradient-to-r from-[#5491CA] to-[#7670AC]" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {assignment.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {assignment.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {assignment.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-[#5491CA]/10 text-[#5491CA] dark:bg-[#5491CA]/20 dark:text-[#6ba2d8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

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
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Confirm Submission
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to submit this assignment? You won't be able to change your answers after submission.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white hover:opacity-90 transition-opacity"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    localStorage.setItem("pendingAssignments", JSON.stringify(pending));
  }, [pending]);

  useEffect(() => {
    localStorage.setItem("completedAssignments", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out z-40 ${
        isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      }`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-[280px]'
      }`}>
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {isMobile && (
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                    Assignments & Quizzes
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
                    Track your progress and manage your academic tasks
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#5491CA]/20 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] dark:bg-gray-700 dark:border-[#7670AC]/30 dark:text-white placeholder-[#7670AC]/50"
                />
              </div>
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#5491CA]/20 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] dark:bg-gray-700 dark:border-[#7670AC]/30 dark:text-white appearance-none"
                >
                  <option>All Assignments</option>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {[
                {
                  title: "Pending Tasks",
                  value: pending.length,
                  color: "from-yellow-500 to-orange-500",
                  icon: <Clock className="w-5 h-5" />
                },
                {
                  title: "Completed",
                  value: completed.length,
                  color: "from-green-500 to-emerald-500",
                  icon: <CheckCircle className="w-5 h-5" />
                },
                {
                  title: "Total Progress",
                  value: `${Math.round((completed.length / (pending.length + completed.length)) * 100)}%`,
                  color: "from-[#5491CA] to-[#7670AC]",
                  icon: <BarChart3 className="w-5 h-5" />
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-md`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pending Assignments */}
            <section className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-[#5491CA] flex items-center gap-2">
                  <FileText className="w-5 md:w-6 h-5 md:h-6" /> Pending Assignments
                </h2>
                {pending.length > 0 && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600 border border-red-100 w-fit">
                    {pending.length} pending
                  </span>
                )}
              </div>

              {pending.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700 shadow-md">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No pending assignments. Great job! 🎉</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(showAllPending ? pending : pending.slice(0, 2)).map((item) => (
                    <AssignmentCard
                      key={item.id}
                      item={item}
                      type="pending"
                      onClick={() => setSelectedAssignment(item)}
                    />
                  ))}
                </div>
              )}

              {pending.length > 2 && (
                <button
                  onClick={() => setShowAllPending(!showAllPending)}
                  className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5491CA]/10 to-[#7670AC]/10 text-[#5491CA] hover:from-[#5491CA]/20 hover:to-[#7670AC]/20 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  {showAllPending ? "Show Less" : "Show More"}
                  {showAllPending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </section>

            {/* Completed Assignments */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-5 md:w-6 h-5 md:h-6" /> Completed Assignments
                </h2>
                {completed.length > 0 && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600 border border-green-100 w-fit">
                    {completed.length} completed
                  </span>
                )}
              </div>

              {completed.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700 shadow-md">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No completed assignments yet. Let's get started! 💪</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(showAllCompleted ? completed : completed.slice(0, 2)).map((item) => (
                    <AssignmentCard
                      key={item.id}
                      item={item}
                      type="completed"
                      onClick={() => setSelectedAssignment(item)}
                    />
                  ))}
                </div>
              )}

              {completed.length > 2 && (
                <button
                  onClick={() => setShowAllCompleted(!showAllCompleted)}
                  className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5491CA]/10 to-[#7670AC]/10 text-[#5491CA] hover:from-[#5491CA]/20 hover:to-[#7670AC]/20 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  {showAllCompleted ? "Show Less" : "Show More"}
                  {showAllCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AssignmentsAndQuizzes;