import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
} from "lucide-react";

const Doubts = () => {
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllResolved, setShowAllResolved] = useState(false);

  const doubts = {
    pending: [
      {
        id: "p1",
        title: "How to implement authentication in React using JWT?",
        course: "React - The Complete Guide",
        instructor: "Max Schwarzmüller",
        datePosted: "2024-11-12",
        topic: "Authentication",
        description:
          "I am trying to implement JWT authentication in my React app but facing issues with token storage and refresh tokens...",
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
          "Need help understanding the best caching strategy for RTK Query in a large application...",
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
          "When should I use Next.js API routes versus having a separate Express backend?",
        priority: "Low",
      },
    ],
    resolved: [
      {
        id: "r1",
        title: "Understanding React useCallback Hook",
        course: "React - The Complete Guide",
        instructor: "Max Schwarzmüller",
        datePosted: "2024-11-08",
        resolvedDate: "2024-11-09",
        topic: "React Hooks",
        description:
          "Can someone explain when exactly should I use useCallback hook?",
        solution:
          "The useCallback hook is used to memoize functions and prevent unnecessary re-renders...",
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
          "You can extend Tailwind configuration by modifying tailwind.config.js...",
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
          "What are the key differences between interface and type in TypeScript?",
        solution:
          "While interfaces and types are similar, they have some key differences...",
        resolvedBy: "Emily Brown",
      },
    ],
  };

  const displayedPendingDoubts = showAllPending
    ? doubts.pending
    : doubts.pending.slice(0, 2);
  const displayedResolvedDoubts = showAllResolved
    ? doubts.resolved
    : doubts.resolved.slice(0, 2);

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">My Doubts</h2>

      {/* Pending Doubts Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="text-yellow-500" />
          <h3 className="text-xl font-semibold">Pending Doubts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPendingDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg">{doubt.title}</h4>
                <PriorityBadge priority={doubt.priority} />
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Posted on {doubt.datePosted}</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {doubts.pending.length > 2 && (
          <button
            onClick={() => setShowAllPending(!showAllPending)}
            className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium mx-auto"
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
        )}
      </div>

      {/* Resolved Doubts Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-green-500" />
          <h3 className="text-xl font-semibold">Resolved Doubts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedResolvedDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-semibold text-lg mb-3">{doubt.title}</h4>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
                <p className="text-sm text-gray-600 line-clamp-2">
                  {doubt.solution}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Resolved on {doubt.resolvedDate}</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {doubts.resolved.length > 2 && (
          <button
            onClick={() => setShowAllResolved(!showAllResolved)}
            className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium mx-auto"
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
        )}
      </div>
    </div>
  );
};

export default Doubts;
