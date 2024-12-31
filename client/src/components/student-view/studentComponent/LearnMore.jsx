import React, { useState } from "react";
import {
  PlayCircle,
  Star,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  const [showAll, setShowAll] = useState(false);

  const mycourses = [
    {
      id: "next1",
      title: "Docker & Kubernetes: The Complete Guide",
      instructor: "Stephen Grider",
      duration: "32h total",
      rating: 4.8,
      students: 158420,
      level: "Intermediate",
      updatedDate: "October 2024",
      price: 3499,
      topics: ["Docker", "Kubernetes", "DevOps"],
      image: "docker-k8s",
      color: "bg-blue-600",
    },
    {
      id: "next2",
      title: "AWS Certified Developer Associate 2024",
      instructor: "Stephane Maarek",
      duration: "48h total",
      rating: 4.7,
      students: 245670,
      level: "All Levels",
      updatedDate: "November 2024",
      price: 3999,
      topics: ["AWS", "Cloud", "DevOps"],
      image: "aws-dev",
      color: "bg-orange-500",
    },
    {
      id: "next3",
      title: "GraphQL with Node.js: Building APIs",
      instructor: "Max Schwarzmüller",
      duration: "28h total",
      rating: 4.9,
      students: 89340,
      level: "Intermediate",
      updatedDate: "September 2024",
      price: 3299,
      topics: ["GraphQL", "Node.js", "API"],
      image: "graphql-node",
      color: "bg-pink-500",
    },
    {
      id: "next4",
      title: "MongoDB: The Complete Developer's Guide",
      instructor: "Jonas Schmedtmann",
      duration: "25h total",
      rating: 4.8,
      students: 132580,
      level: "All Levels",
      updatedDate: "October 2024",
      price: 3699,
      topics: ["MongoDB", "Database", "Backend"],
      image: "mongodb",
      color: "bg-green-500",
    },
    {
      id: "next5",
      title: "TypeScript Advanced Concepts",
      instructor: "Daniel Stern",
      duration: "22h total",
      rating: 4.7,
      students: 76890,
      level: "Advanced",
      updatedDate: "November 2024",
      price: 2999,
      topics: ["TypeScript", "JavaScript", "Web Development"],
      image: "typescript",
      color: "bg-blue-400",
    },
    {
      id: "next6",
      title: "Redis Fundamentals & Caching",
      instructor: "David Walsh",
      duration: "18h total",
      rating: 4.6,
      students: 45670,
      level: "Intermediate",
      updatedDate: "October 2024",
      price: 2799,
      topics: ["Redis", "Caching", "Backend"],
      image: "redis",
      color: "bg-red-500",
    },
    {
      id: "next7",
      title: "CI/CD with Jenkins & GitHub Actions",
      instructor: "Sarah Smith",
      duration: "26h total",
      rating: 4.8,
      students: 67890,
      level: "Intermediate",
      updatedDate: "November 2024",
      price: 3899,
      topics: ["CI/CD", "DevOps", "Automation"],
      image: "cicd",
      color: "bg-indigo-500",
    },
    {
      id: "next8",
      title: "Microservices with Node & Express",
      instructor: "Rob Johnson",
      duration: "35h total",
      rating: 4.7,
      students: 98760,
      level: "Advanced",
      updatedDate: "September 2024",
      price: 3999,
      topics: ["Microservices", "Node.js", "Architecture"],
      image: "microservices",
      color: "bg-purple-500",
    },
    {
      id: "next9",
      title: "Vue.js 3 Enterprise Applications",
      instructor: "Sarah Dayan",
      duration: "29h total",
      rating: 4.9,
      students: 54320,
      level: "Intermediate",
      updatedDate: "October 2024",
      price: 3499,
      topics: ["Vue.js", "JavaScript", "Frontend"],
      image: "vuejs",
      color: "bg-emerald-500",
    },
    {
      id: "next10",
      title: "Rust Programming for Web Developers",
      instructor: "Tim McNamara",
      duration: "42h total",
      rating: 4.8,
      students: 34560,
      level: "Advanced",
      updatedDate: "November 2024",
      price: 4299,
      topics: ["Rust", "Systems Programming", "WebAssembly"],
      image: "rust",
      color: "bg-orange-600",
    },
  ];

  const displayedCourses = showAll ? mycourses : mycourses.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">What to learn next</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map(
          (course) => (
            (course.progress = 0),
            (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Course Header with Color Banner */}
                <div className={`${course.color} h-3 rounded-t-lg`} />

                <div className="p-6">
                  {/* Course Title and Rating */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center ml-2 shrink-0">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  {/* Instructor and Duration */}
                  <div className="text-sm text-gray-600 mb-4">
                    <p className="mb-1">{course.instructor}</p>
                    <p>{course.duration}</p>
                  </div>

                  {/* Continue Button */}
                  <Link
                    to="/coursedetails"
                    state={{ course }}
                    className="w-full mt-10 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <span>Start Learning</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          )
        )}
      </div>

      {mycourses.length > 3 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium mx-auto"
          >
            {showAll ? (
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
    </div>
  );
};

export default LearnMore;
