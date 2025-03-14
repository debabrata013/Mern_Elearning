import React, { useState } from 'react';
import { Plus, ArrowLeft, Upload, Video, File, X } from 'lucide-react';

// Sample course data - replace with your actual data
const sampleCourses = [
  {
    id: 1,
    title: "Mathematics 101",
    description: "Introduction to Basic Mathematics",
    image: "/api/placeholder/300/200",
    lectureCount: 12
  },
  {
    id: 2,
    title: "Physics 201",
    description: "Advanced Physics Concepts",
    image: "/api/placeholder/300/200",
    lectureCount: 8
  },
  {
    id: 3,
    title: "Chemistry 101",
    description: "Basic Chemistry Principles",
    image: "/api/placeholder/300/200",
    lectureCount: 15
  }
];

// Sample lectures data - replace with your actual data
const sampleLectures = [
  {
    id: 1,
    title: "Introduction to Algebra",
    type: "video",
    duration: "45 mins"
  },
  {
    id: 2,
    title: "Linear Equations",
    type: "pdf",
    size: "2.3 MB"
  }
];

const RecordsContent = () => {
  const [view, setView] = useState('courses'); // courses, lectures, addLecture
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    lectureName: '',
    pdfFile: null,
    videoFile: null
  });

  const handleFileChange = (type, file) => {
    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form and go back to lectures view
    setFormData({
      lectureName: '',
      pdfFile: null,
      videoFile: null
    });
    setView('lectures');
  };

  // Course Card Component
  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-r from-[#5491CA]/20 to-[#b1a9f1]/20 relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#5491CA]">{course.title}</h3>
        <p className="text-gray-600 mb-2">{course.description}</p>
        <p className="text-sm text-[#b1a9f1]">{course.lectureCount} lectures</p>
        <button
          onClick={() => {
            setSelectedCourse(course);
            setView('lectures');
          }}
          className="mt-3 w-full bg-[#5491CA] text-white py-2 rounded-lg hover:bg-[#4a82b5] transition-colors"
        >
          View Lectures
        </button>
      </div>
    </div>
  );

  // Render different views
  const renderContent = () => {
    switch (view) {
      case 'lectures':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('courses')}
                  className="text-[#5491CA] hover:text-[#b1a9f1] flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Courses
                </button>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-transparent bg-clip-text">
                  {selectedCourse?.title} - Lectures
                </h3>
              </div>
              <button
                onClick={() => setView('addLecture')}
                className="bg-[#5491CA] text-white px-4 py-2 rounded-lg hover:bg-[#4a82b5] transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Lecture
              </button>
            </div>
            
            <div className="grid gap-4">
              {sampleLectures.map(lecture => (
                <div key={lecture.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {lecture.type === 'video' ? (
                      <div className="h-10 w-10 rounded-full bg-[#5491CA]/10 flex items-center justify-center">
                        <Video className="h-5 w-5 text-[#5491CA]" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-[#b1a9f1]/10 flex items-center justify-center">
                        <File className="h-5 w-5 text-[#b1a9f1]" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-[#5491CA]">{lecture.title}</h4>
                      <p className="text-sm text-gray-500">
                        {lecture.type === 'video' ? lecture.duration : lecture.size}
                      </p>
                    </div>
                  </div>
                  <button className="text-[#5491CA] hover:text-[#b1a9f1] transition-colors px-3 py-1 rounded-md hover:bg-gray-50">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'addLecture':
        return (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setView('lectures')}
                className="text-[#5491CA] hover:text-[#b1a9f1] flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Lectures
              </button>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-transparent bg-clip-text">
                Add New Lecture
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="lectureName">
                  Lecture Name
                </label>
                <input
                  type="text"
                  id="lectureName"
                  value={formData.lectureName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lectureName: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  PDF Material
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#b1a9f1] transition-colors">
                  {formData.pdfFile ? (
                    <div className="flex items-center justify-between">
                      <span className="text-[#5491CA]">{formData.pdfFile.name}</span>
                      <button
                        type="button"
                        onClick={() => handleFileChange('pdfFile', null)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="h-16 w-16 mx-auto mb-2 rounded-full bg-[#b1a9f1]/10 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-[#b1a9f1]" />
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange('pdfFile', e.target.files[0])}
                        className="hidden"
                        id="pdfUpload"
                      />
                      <label
                        htmlFor="pdfUpload"
                        className="text-[#5491CA] hover:text-[#b1a9f1] cursor-pointer transition-colors"
                      >
                        Upload PDF
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Lecture Video
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#5491CA] transition-colors">
                  {formData.videoFile ? (
                    <div className="flex items-center justify-between">
                      <span className="text-[#5491CA]">{formData.videoFile.name}</span>
                      <button
                        type="button"
                        onClick={() => handleFileChange('videoFile', null)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="h-16 w-16 mx-auto mb-2 rounded-full bg-[#5491CA]/10 flex items-center justify-center">
                        <Video className="h-8 w-8 text-[#5491CA]" />
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange('videoFile', e.target.files[0])}
                        className="hidden"
                        id="videoUpload"
                      />
                      <label
                        htmlFor="videoUpload"
                        className="text-[#5491CA] hover:text-[#b1a9f1] cursor-pointer transition-colors"
                      >
                        Upload Video
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Submit Lecture
              </button>
            </form>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
              
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {renderContent()}
    </div>
  );
};

export default RecordsContent;