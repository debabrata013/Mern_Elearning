import React from "react";

export default function StudyResources() {
  const resources = [
    {
      id: 1,
      title: "Mastering React.js",
      description: "An in-depth guide to React concepts and best practices.",
      type: "eBook",
      tags: ["React", "Frontend"],
      link: "#",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms in JavaScript",
      description: "Understand DSA with JavaScript through hands-on examples.",
      type: "Video",
      tags: ["JavaScript", "DSA"],
      link: "#",
    },
    {
      id: 3,
      title: "CSS Cheat Sheet",
      description: "Quick reference guide for common CSS properties.",
      type: "PDF",
      tags: ["CSS", "Styling"],
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Title and Search Bar */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Study Resources</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="border border-gray-300 p-4 rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{resource.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
            <div className="mt-4 space-x-2">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 text-sm mt-4"
            >
              View Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
