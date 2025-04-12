import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../studentComponent/Sidebar";
import axiosInstance from "@/api/axiosInstance";
import VideoPlayer from "../studentComponent/ui/videoplayer"; // your custom player

const CourseEnrollment = () => {
  const { id } = useParams();
  const location = useLocation();
  const [course, setCourse] = useState(location.state?.course || null);
  const [loading, setLoading] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

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

  const chapter = course.chapters?.[currentChapter] || {
    title: "No Title",
    description: "No Description",
    videoUrl: "",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[260px] fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-30">
        <Sidebar
          sections={course.chapters || []}
          activeSection={currentChapter}
          onSectionChange={setCurrentChapter}
        />
      </div>

      {/* Main Content */}
      <main className="ml-[260px] w-full px-6 py-10 bg-gradient-to-br from-white via-[#f7faff] to-[#eaf3ff] overflow-y-auto">
  <div className="max-w-7xl mx-auto space-y-12">
    
    {/* Course Header */}
    <div className="space-y-2">
      <h1 className="text-4xl font-extrabold text-[#5491CA]">
        {course.title}
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed">
        {course.description}
      </p>
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
          <p><strong>💰 Price:</strong> ₹{course.price} ({course.discount}% off)</p>
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

    {/* Chapter Section */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#7670AC]">{chapter.title}</h2>
      <p className="text-gray-700">{chapter.description}</p>

      {chapter.videoUrl ? (
        <div className="aspect-video w-full max-w-5xl rounded-xl overflow-hidden shadow-lg border border-gray-300">
          <VideoPlayer
            src={chapter.videoUrl}
            title={chapter.title}
          />
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-500 border border-dashed border-gray-300">
          🎬 No video content available for this chapter.
        </div>
      )}
    </div>
  </div>
</main>

    </div>
  );
};

export default CourseLearningPage;
