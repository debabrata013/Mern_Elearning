import React, { useState } from 'react';

// Sample data for purchased courses.
const purchasedCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React including components, state, and props.",
    thumbnail: "https://source.unsplash.com/random/400x300?react",
    progress: 65, // % complete
    content: [
      {
        id: 1,
        title: "React Basics",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // demo video url
      },
      {
        id: 2,
        title: "Components & Props",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: 3,
        title: "State & Lifecycle",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into closures, prototypes, and asynchronous programming.",
    thumbnail: "https://source.unsplash.com/random/400x300?javascript",
    progress: 90,
    content: [
      {
        id: 1,
        title: "Understanding Closures",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: 2,
        title: "Prototypes in JS",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: 3,
        title: "Async Programming",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Master the principles of user interface and user experience design.",
    thumbnail: "https://source.unsplash.com/random/400x300?design",
    progress: 30,
    content: [
      {
        id: 1,
        title: "Design Thinking",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: 2,
        title: "User Research",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: 3,
        title: "Wireframing",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
];

const PurchasedCoursesDashboard = () => {
  // State to toggle between courses list and detailed course view.
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Render the courses list if no course is selected.
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Courses</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {purchasedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              tabIndex="0"
              aria-labelledby={`course-title-${course.id}`}
            >
              <img
                src={course.thumbnail}
                alt={`${course.title} thumbnail`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 id={`course-title-${course.id}`} className="text-xl font-semibold text-gray-800">
                  {course.title}
                </h2>
                <p className="mt-2 text-gray-600 text-sm">{course.description}</p>
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{course.progress}% Complete</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition focus:outline-none"
                  aria-label="View Course Content"
                >
                  {course.progress === 100 ? "View Course" : "Continue Course"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render the detailed view for a selected course.
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <button
        onClick={() => setSelectedCourse(null)}
        className="mb-6 inline-flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
      >
        &larr; Back to Courses
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedCourse.title}</h1>
        <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${selectedCourse.progress}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">{selectedCourse.progress}% Complete</p>
        </div>
        {/* Course Content List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Content</h2>
          <ul className="space-y-4">
            {selectedCourse.content.map((lesson) => (
              <li key={lesson.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-xl font-medium text-gray-800">{lesson.title}</h3>
                {/* Video Preview/Player */}
                <div className="mt-2">
                  <video
                    controls
                    className="w-full rounded-md"
                    poster="https://source.unsplash.com/random/800x450?video"
                  >
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PurchasedCoursesDashboard;
