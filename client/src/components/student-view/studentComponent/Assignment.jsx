import React from "react";

const assignments = {
  pending: [
    {
      id: 1,
      title: "React State Management Assignment",
      description: "Complete a task on state management using Redux Toolkit.",
      tags: ["React", "Redux", "State Management"],
      dueDate: "2024-11-20",
      status: "Not Submitted",
    },
    {
      id: 2,
      title: "Database Normalization Quiz",
      description: "Quiz on database normalization and its practical applications.",
      tags: ["Database", "SQL"],
      dueDate: "2024-11-22",
      status: "Pending",
    },
  ],
  completed: [
    {
      id: 3,
      title: "JavaScript ES6 Features Quiz",
      description: "Quiz focusing on modern JavaScript ES6+ syntax and features.",
      tags: ["JavaScript", "ES6"],
      grade: "8/10",
      completedDate: "2024-11-10",
    },
    {
      id: 4,
      title: "CSS Grid Layout Assignment",
      description: "Create a responsive webpage layout using CSS Grid.",
      tags: ["CSS", "Web Design"],
      grade: "A",
      completedDate: "2024-11-08",
    },
  ],
};

const AssignmentsAndQuizzes = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Outer Box Container */}
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 border border-[#7670AC]">
        <h2 className="text-3xl font-bold text-[#7670AC] text-center mb-6">
          Assignments & Quizzes
        </h2>

        <div className="space-y-8">
          {/* Pending Section */}
          <section className="p-5 bg-gray-50 rounded-lg shadow-md border border-[#7670AC]">
            <h3 className="text-xl font-semibold text-[#5491CA] mb-4">
               Pending Assignments/Quizzes
            </h3>
            <div className="space-y-4">
              {assignments.pending.map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg p-4 border border-[#7670AC]">
                  <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#5491CA] text-white text-xs font-medium py-1 px-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Due Date: <span className="font-medium text-red-500">{item.dueDate}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="font-medium text-yellow-600">{item.status}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Section */}
          <section className="p-5 bg-gray-50 rounded-lg shadow-md border border-[#7670AC]">
            <h3 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Completed Assignments/Quizzes
            </h3>
            <div className="space-y-4">
              {assignments.completed.map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg p-4 border border-[#7670AC]">
                  <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#5491CA] text-white text-xs font-medium py-1 px-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Grade: <span className="font-medium text-green-500">{item.grade}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Completed on: <span className="font-medium">{item.completedDate}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsAndQuizzes;
