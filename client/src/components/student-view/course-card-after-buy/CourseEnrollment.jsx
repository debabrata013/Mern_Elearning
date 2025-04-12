import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../studentComponent/Sidebar";
import axiosInstance from "@/api/axiosInstance";
// import VideoPlayer from "../studentComponent/ui/videoplayer"; // your custom player
import ReactPlayer from 'react-player';

import { useNavigate } from 'react-router-dom';
const VideoPlayer = ({ src, title }) => (
  <div className="w-full h-full">
    <ReactPlayer
      url={src}
      controls
      width="100%"
      height="100%"
      playing={false} // auto-play off
    />
  </div>
);
const CourseEnrollment = () => {
  const { id } = useParams();
  const location = useLocation();
  const [course, setCourse] = useState(location.state?.course || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate('/resource-viewer', { state: { url } });
  };

// Add this at top inside the component
const [activeVideo, setActiveVideo] = useState(null);
  useEffect(() => {
    console.log("✅ Received course via navigation:", location.state);
  }, []);

  useEffect(() => {
    if (!course) {
      const fetchCourse = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/api/course/${id}`);
          setCourse(response.data);
        } catch (error) {
          console.error("❌ Failed to fetch course", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [course, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-[#7670AC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-[#5491CA]">Course Not Found</h2>
        <p className="text-gray-600">Try accessing a different course.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[260px] fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-30">
        <Sidebar
          sections={course.chapters || []}
          activeSection={0}
          onSectionChange={() => {}}
        />
      </div>

      {/* Main Content */}
      <main className="ml-[260px] w-full px-6 py-10 bg-gradient-to-br from-white via-[#f7faff] to-[#eaf3ff] overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Course Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-[#5491CA]">{course.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
          </div>

          {/* Course Info + Image */}
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Info Panel */}
            <div className="w-full flex-1 p-6 rounded-2xl bg-white shadow-sm border border-gray-200 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <p><strong>📚 Category:</strong> {course.category}</p>
                <p><strong>⚙️ Level:</strong> {course.level}</p>
                <p><strong>🗣️ Language:</strong> {course.language}</p>
                <p><strong>⏳ Duration:</strong> {course.duration} weeks</p>
                <p><strong>🚀 Start:</strong> {new Date(course.startDate).toDateString()}</p>
                <p><strong>🏁 End:</strong> {new Date(course.endDate).toDateString()}</p>
                <p><strong>📅 Enroll By:</strong> {new Date(course.enrollmentDeadline).toDateString()}</p>
                <p><strong>👨‍🏫 Teacher:</strong> {course.teacher}</p>
              </div>

              {/* Tags */}
              {course.tags?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-700">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-[#d4eaff] text-[#1166aa] text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Course Image */}
            <div className="w-full lg:w-[350px]">
              <img
                src={course.coverImage}
                alt="Course Cover"
                className="rounded-xl shadow-lg w-full object-cover border border-gray-300"
              />
            </div>
          </div>

          {/* All Chapters */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#5491CA]">Course Chapters</h2>

            {course.chapters?.length > 0 ? (
              course.chapters.map((ch, index) => (
                <div
                  key={ch._id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[#7670AC]">
                      Chapter {index + 1}: {ch.title}
                    </h3>
                    <p className="text-sm text-gray-500">{new Date(ch.createdAt).toDateString()}</p>
                  </div>

                  <p className="text-gray-600">{ch.description}</p>

                  {/* Lessons */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">🎓 Lessons</h4>
                    {ch.lessons?.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {ch.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-center justify-between">
                            <button
                              onClick={() => setActiveVideo({ url: lesson.videoUrl, title: `Lesson ${idx + 1}` })}
                              className="text-blue-600 btn hover:text-blue-800 "
                            >
                              Watch Video {idx + 1}
                          
                              
                            </button>
                          </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500">No lessons available.</p>
                                                                        )}
                                          {activeVideo?.url && (
                                            <div className="mt-4 aspect-video w-full max-w-5xl rounded-xl overflow-hidden shadow-lg border border-gray-300">
                                            <VideoPlayer src={activeVideo.url} title={activeVideo.title} />
                                            </div>
                                          )}
                                        </div>


                  
                 < div>
  <h4 className="font-medium text-gray-800 mb-2">📁 Resources</h4>
  {ch.resourceUrl?.length > 0 ? (
    <ul className="list-disc list-inside space-y-1">
      {ch.resourceUrl.map((url, idx) => (
        <li key={idx}>
        
          
          <button
            onClick={() => handleClick(url.url)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Resource {idx + 1}
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No resources available.</p>
  )}
</div>


                 
                </div>
              ))
            ) : (
              <p className="text-gray-500">No chapters found for this course.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseEnrollment;
