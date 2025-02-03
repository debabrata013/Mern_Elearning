import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
  PlusCircle,
} from "lucide-react";

// Component for Priority Badge with dynamic color
const PriorityBadge = ({ priority }) => {
  const colors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}
    >
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

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") return;
    const newDoubt = {
      id: `p${Date.now()}`, // a simple unique id
      title,
      course,
      topic,
      description,
      priority,
      datePosted: new Date().toISOString().split("T")[0],
    };
    onSubmit(newDoubt);
    // Clear form fields after submission
    setTitle("");
    setCourse("");
    setTopic("");
    setPriority("Low");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Create New Doubt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Topic
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Doubt
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
        "The useCallback hook is used to memoize functions and prevent unnecessary re-renders. It’s particularly useful when passing callbacks to optimized child components.",
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-center">My Doubts</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Doubt
        </button>
      </div>

      {/* Pending Doubts Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="text-yellow-500" />
          <h3 className="text-2xl font-semibold">Pending Doubts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedPendingDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-xl">{doubt.title}</h4>
                  <PriorityBadge priority={doubt.priority} />
                </div>
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
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Posted on {doubt.datePosted}</span>
                </div>
                <button
                  onClick={() => handleViewDetails(doubt, "pending")}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {pendingDoubts.length > 2 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAllPending((prev) => !prev)}
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
            >
              {showAllPending ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* Resolved Doubts Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="text-green-500" />
          <h3 className="text-2xl font-semibold">Resolved Doubts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedResolvedDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-semibold text-xl mb-3">{doubt.title}</h4>
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
              {showAllResolved ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* Modal for viewing full details */}
      {selectedDoubt && (
        <DetailModal
          doubt={selectedDoubt}
          onClose={handleCloseModal}
          type={modalType}
        />
      )}

      {/* Modal for creating a new doubt */}
      {showCreateModal && (
        <CreateDoubtModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateDoubt}
        />
      )}
    </div>
  );
};

export default Doubts;
