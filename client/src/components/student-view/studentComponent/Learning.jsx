import React, { useState } from "react";
import {
  PlayCircle,
  Star,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const Learning = () => {
  const [showAll, setShowAll] = useState(false);

  const mycourses = [
    {
      id: 1,
      title: "React Development Fundamentals",
      progress: 45,
      duration: "55h total",
      rating: 4.7,
      instructor: "Web Dev Expert",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Advanced JavaScript Programming",
      progress: 30,
      duration: "42h total",
      rating: 4.6,
      instructor: "JS Master",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Spring Boot for Beginners",
      progress: 15,
      duration: "38h total",
      rating: 4.8,
      instructor: "Java Expert",
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Python Programming Masterclass",
      progress: 60,
      duration: "48h total",
      rating: 4.5,
      instructor: "Python Pro",
      color: "bg-purple-500",
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      progress: 20,
      duration: "62h total",
      rating: 4.9,
      instructor: "Full Stack Dev",
      color: "bg-red-500",
    },
    {
      id: 6,
      title: "Angular Complete Guide",
      progress: 35,
      duration: "45h total",
      rating: 4.7,
      instructor: "Frontend Master",
      color: "bg-pink-500",
    },
  ];

  const displayedCourses = showAll ? mycourses : mycourses.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">My Learning Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
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

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${course.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Continue Button */}
              <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                <span>Continue Learning</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
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

export default Learning;
