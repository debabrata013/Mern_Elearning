import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlay, FaClock } from 'react-icons/fa';

const SyllabusViewer = ({ syllabus, onVideoSelect }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Calculate total duration
  const totalDuration = syllabus?.reduce((total, section) => {
    const sectionDuration = section.videos?.reduce((acc, video) => acc + (video.duration || 0), 0) || 0;
    return total + sectionDuration;
  }, 0);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Course Content Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <span className="flex items-center gap-2">
            <FaClock className="text-[#5491CA]" />
            Total: {formatDuration(totalDuration)}
          </span>
          <span>•</span>
          <span>{syllabus?.length || 0} sections</span>
        </div>
      </div>

      {/* Syllabus Sections */}
      <div className="divide-y divide-gray-100">
        {syllabus?.map((section, index) => (
          <div key={section._id || index} className="bg-white hover:bg-gray-50 transition-colors">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section._id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>Section {index + 1}: {section.title}</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {section.videos?.length || 0} videos • {formatDuration(
                    section.videos?.reduce((acc, video) => acc + (video.duration || 0), 0) || 0
                  )}
                </p>
              </div>
              {expandedSections[section._id] ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections[section._id] && (
              <div className="px-6 pb-4">
                {section.videos?.map((video, videoIndex) => (
                  <button
                    key={video._id || videoIndex}
                    onClick={() => onVideoSelect(video)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5491CA] rounded-full flex items-center justify-center text-white">
                      <FaPlay className="w-3 h-3" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-800">{video.title}</h4>
                      <p className="text-sm text-gray-500">{formatDuration(video.duration || 0)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusViewer; 