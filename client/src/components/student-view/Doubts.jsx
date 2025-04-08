import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from './studentComponent/Sidebar';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
  PlusCircle,
  ChevronRight,
  BarChart2,
  X,
  Send,
  Menu
} from "lucide-react";

// Component for Priority Badge with dynamic color
const PriorityBadge = ({ priority }) => {
  const colors = {
    High: "bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20",
    Medium: "bg-yellow-50 text-yellow-600 border border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/20",
    Low: "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20",
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${colors[priority]}`}>
      <AlertCircle className="w-3.5 h-3.5" />
      {priority}
    </span>
  );
};

// Reusable Modal Component for showing doubt details
const DetailModal = ({ doubt, onClose, type }) => {
  if (!doubt) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{doubt.title}</h2>
        <div className="mb-4">
          <p className="text-gray-700">{doubt.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {doubt.topic}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {doubt.course}
          </span>
          {type === "pending" && <PriorityBadge priority={doubt.priority} />}
        </div>

        {type === "resolved" && (
          <>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Resolved by {doubt.resolvedBy}
                </span>
              </div>
              <p className="text-sm text-gray-600">{doubt.solution}</p>
            </div>
            <p className="text-gray-500 text-sm mb-2">
              Resolved on {doubt.resolvedDate}
            </p>
          </>
        )}
        <p className="text-gray-500 text-sm">Posted on {doubt.datePosted}</p>
      </div>
    </div>
  );
};

// Modal for Creating a New Doubt
const CreateDoubtModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") return;
    const newDoubt = {
      id: `p${Date.now()}`,
      title,
      course,
      topic,
      description,
      priority,
      datePosted: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
    };
    onSubmit(newDoubt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden animate-modal-slide-up">
        {/* Gradient Top Bar */}
        <div className="h-2 bg-gradient-to-r from-[#5491CA] to-[#7670AC]" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#5491CA]/10 dark:bg-[#5491CA]/20">
                <PlusCircle className="w-5 h-5 text-[#5491CA] dark:text-[#6ba2d8]" />
              </div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                Ask a New Question
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Question Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 dark:bg-gray-800 dark:focus:border-[#6ba2d8] dark:focus:ring-[#6ba2d8]/20 transition-all"
                placeholder="Enter your question title"
                required
              />
            </div>

            {/* Course & Topic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Course
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 dark:bg-gray-800 dark:focus:border-[#6ba2d8] dark:focus:ring-[#6ba2d8]/20 transition-all"
                  placeholder="Related course"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 dark:bg-gray-800 dark:focus:border-[#6ba2d8] dark:focus:ring-[#6ba2d8]/20 transition-all"
                  placeholder="Specific topic"
                />
              </div>
            </div>

            {/* Priority Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 dark:bg-gray-800 dark:focus:border-[#6ba2d8] dark:focus:ring-[#6ba2d8]/20 transition-all"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Detailed Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 dark:bg-gray-800 dark:focus:border-[#6ba2d8] dark:focus:ring-[#6ba2d8]/20 transition-all resize-none"
                placeholder="Describe your question in detail..."
                required
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Doubts = () => {
  // Separate state for pending and resolved doubts.
  const [pendingDoubts, setPendingDoubts] = useState([
    {
      id: "p1",
      title: "How to implement authentication in React using JWT?",
      course: "React - The Complete Guide",
      instructor: "Max Schwarzmüller",
      datePosted: "2024-11-12",
      topic: "Authentication",
      description:
        "I am trying to implement JWT authentication in my React app but facing issues with token storage and refresh tokens. I have tried several approaches but none seem to be robust enough.",
      priority: "High",
    },
    {
      id: "p2",
      title: "Redux Toolkit Query caching strategy",
      course: "Modern Redux with Redux Toolkit",
      instructor: "Stephen Grider",
      datePosted: "2024-11-11",
      topic: "State Management",
      description:
        "Need help understanding the best caching strategy for RTK Query in a large application. The caching mechanism sometimes seems to fetch stale data.",
      priority: "Medium",
    },
    {
      id: "p3",
      title: "Next.js API Routes vs Express Backend",
      course: "Next.js & React",
      instructor: "Maximilian Schwarzmüller",
      datePosted: "2024-11-10",
      topic: "Architecture",
      description:
        "When should I use Next.js API routes versus having a separate Express backend? I want to understand the trade-offs in terms of scalability and maintainability.",
      priority: "Low",
    },
  ]);

  const [resolvedDoubts] = useState([
    {
      id: "r1",
      title: "Understanding React useCallback Hook",
      course: "React - The Complete Guide",
      instructor: "Max Schwarzmüller",
      datePosted: "2024-11-08",
      resolvedDate: "2024-11-09",
      topic: "React Hooks",
      description:
        "Can someone explain when exactly should I use useCallback hook? I find it confusing in relation to re-renders.",
      solution:
        "The useCallback hook is used to memoize functions and prevent unnecessary re-renders. It's particularly useful when passing callbacks to optimized child components.",
      resolvedBy: "Sarah Wilson",
    },
    {
      id: "r2",
      title: "Tailwind CSS Custom Configuration",
      course: "Tailwind CSS Masterclass",
      instructor: "John Doe",
      datePosted: "2024-11-07",
      resolvedDate: "2024-11-08",
      topic: "Styling",
      description: "How can I extend Tailwind default configuration?",
      solution:
        "You can extend Tailwind configuration by modifying tailwind.config.js and adding your custom values to the extend section.",
      resolvedBy: "Mike Johnson",
    },
    {
      id: "r3",
      title: "TypeScript Interface vs Type",
      course: "TypeScript Advanced Concepts",
      instructor: "Daniel Stern",
      datePosted: "2024-11-06",
      resolvedDate: "2024-11-07",
      topic: "TypeScript",
      description:
        "What are the key differences between interface and type in TypeScript? I'm unsure when to use one over the other.",
      solution:
        "While interfaces and types are similar, interfaces are extendable and better suited for object shapes, whereas types are more versatile for union types and other complex scenarios.",
      resolvedBy: "Emily Brown",
    },
  ]);

  // Other UI states
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllResolved, setShowAllResolved] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  // Determine how many doubts to display based on the showAll toggle.
  const displayedPendingDoubts = showAllPending
    ? pendingDoubts
    : pendingDoubts.slice(0, 2);
  const displayedResolvedDoubts = showAllResolved
    ? resolvedDoubts
    : resolvedDoubts.slice(0, 2);

  // Handler to open detail modal
  const handleViewDetails = (doubt, type) => {
    setSelectedDoubt(doubt);
    setModalType(type);
  };

  // Handler to close detail modal
  const handleCloseModal = () => {
    setSelectedDoubt(null);
    setModalType(null);
  };

  // Handler for creating a new doubt
  const handleCreateDoubt = (newDoubt) => {
    setPendingDoubts((prev) => [newDoubt, ...prev]);
    setShowCreateModal(false);
  };

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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              )}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                  My Doubts & Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Track and manage your academic queries
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white rounded-xl hover:opacity-90 transition-opacity shadow-md hover:shadow-lg w-full md:w-auto justify-center"
            >
              <PlusCircle className="w-5 h-5" />
              Ask a Question
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              {
                label: "Pending Questions",
                value: pendingDoubts.length,
                icon: <AlertCircle className="w-5 h-5" />,
                color: "from-orange-500 to-pink-500"
              },
              {
                label: "Resolved Questions",
                value: resolvedDoubts.length,
                icon: <CheckCircle className="w-5 h-5" />,
                color: "from-emerald-500 to-teal-500"
              },
              {
                label: "Total Interactions",
                value: pendingDoubts.length + resolvedDoubts.length,
                icon: <MessageSquare className="w-5 h-5" />,
                color: "from-[#5491CA] to-[#7670AC]"
              },
              {
                label: "Resolution Rate",
                value: `${Math.round((resolvedDoubts.length / (pendingDoubts.length + resolvedDoubts.length)) * 100)}%`,
                icon: <BarChart2 className="w-5 h-5" />,
                color: "from-violet-500 to-purple-500"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Pending Doubts Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-500/10">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                Pending Questions
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {displayedPendingDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-[#5491CA] to-[#7670AC] transform origin-left transition-transform scale-x-0 group-hover:scale-x-100" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-[#5491CA] transition-colors">
                        {doubt.title}
                      </h4>
                      <PriorityBadge priority={doubt.priority} />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {doubt.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#5491CA]/10 text-[#5491CA] dark:bg-[#5491CA]/20 dark:text-[#6ba2d8] border border-[#5491CA]/20">
                        {doubt.topic}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7670AC]/10 text-[#7670AC] dark:bg-[#7670AC]/20 dark:text-[#8f89c5] border border-[#7670AC]/20">
                        {doubt.course}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Posted on {doubt.datePosted}</span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(doubt, "pending")}
                        className="flex items-center gap-1.5 text-sm font-medium text-[#5491CA] hover:text-[#7670AC] transition-colors"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pendingDoubts.length > 2 && (
              <button
                onClick={() => setShowAllPending(!showAllPending)}
                className="mx-auto mt-6 flex items-center gap-2 px-4 py-2 text-[#5491CA] hover:text-[#7670AC] transition-colors rounded-lg hover:bg-[#5491CA]/5"
              >
                {showAllPending ? "Show Less" : "Show More"}
                {showAllPending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </section>

          {/* Resolved Doubts Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="text-green-500" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Resolved Doubts
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {displayedResolvedDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border"
                >
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800 mb-3">{doubt.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {doubt.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {doubt.topic}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {doubt.course}
                      </span>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Resolved by {doubt.resolvedBy}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {doubt.solution}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Resolved on {doubt.resolvedDate}</span>
                    </div>
                    <button
                      onClick={() => handleViewDetails(doubt, "resolved")}
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {resolvedDoubts.length > 2 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllResolved((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                >
                  {showAllResolved ? "Show Less" : "Show More"}
                  {showAllResolved ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}
          </section>

          {/* Modal for Viewing Full Details */}
          {selectedDoubt && (
            <DetailModal
              doubt={selectedDoubt}
              onClose={handleCloseModal}
              type={modalType}
            />
          )}

          {/* Modal for Creating a New Doubt */}
          {showCreateModal && (
            <CreateDoubtModal
              onClose={() => setShowCreateModal(false)}
              onSubmit={handleCreateDoubt}
            />
          )}
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

export default Doubts;
