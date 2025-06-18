
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaClock, FaPlay } from "react-icons/fa";

const CourseSyllabus = ({ course, onVideoSelect }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          
          <span>{course?.chapters?.length || 0} sections</span>
        </div>
      </div>

      {/* Chapters (Sections) */}
      <div className="divide-y divide-gray-100">
        {course?.chapters?.map((chapter, index) => (
          <div key={chapter._id?.$oid || index} className="bg-white hover:bg-gray-50 transition-colors">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(chapter._id?.$oid)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  Section {index + 1}: {chapter.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {chapter.lessons?.length || " uploaded once course starts"} lessons
                </p>
              </div>
              {expandedSections[chapter._id?.$oid] ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>

            {/* Lessons */}
            {expandedSections[chapter._id?.$oid] && (
              <div className="px-6 pb-4">
                {chapter.lessons?.length > 0 ? (
                  chapter.lessons.map((lesson, idx) => (
                    <button
                      key={lesson._id?.$oid || idx}
                      onClick={() => onVideoSelect?.(lesson)}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[#5491CA] rounded-full flex items-center justify-center text-white">
                        <FaPlay className="w-3 h-3" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-800">{lesson.title || "Untitled"}</h4>
                        <p className="text-sm text-gray-500">{formatDuration(lesson.duration || 0)}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm px-2">No lessons added yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSyllabus;
