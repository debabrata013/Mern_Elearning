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
      description:
        "Quiz on database normalization and its practical applications.",
      tags: ["Database", "SQL"],
      dueDate: "2024-11-22",
      status: "Pending",
    },
  ],
  completed: [
    {
      id: 3,
      title: "JavaScript ES6 Features Quiz",
      description:
        "Quiz focusing on modern JavaScript ES6+ syntax and features.",
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Assignments & Quizzes</h2>

      {/* Pending Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-black-600 mb-3">
          📌 Pending Assignments/Quizzes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.pending.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Due Date:{" "}
                <span className="font-medium text-red-500">{item.dueDate}</span>
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="font-medium text-yellow-600">
                  {item.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Section */}
      <section>
        <h3 className="text-xl font-semibold text-green-600 mb-3">
          ✅ Completed Assignments/Quizzes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.completed.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Grade:{" "}
                <span className="font-medium text-green-500">{item.grade}</span>
              </p>
              <p className="text-sm text-gray-500">
                Completed on:{" "}
                <span className="font-medium">{item.completedDate}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AssignmentsAndQuizzes;
