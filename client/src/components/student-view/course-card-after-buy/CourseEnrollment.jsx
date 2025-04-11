import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../studentComponent/Sidebar";
import axiosInstance from "@/api/axiosInstance";

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
          console.log("📦 Backend response:", response.data);
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
      <div className="flex justify-center items-center min-h-screen">
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
    <div className="flex flex-col lg:flex-row">
      <Sidebar
        sections={course.chapters || []}
        activeSection={currentChapter}
        onSectionChange={setCurrentChapter}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left section: Course info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#5491CA] mb-2">
              {course.title}
            </h1>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <div className="mb-4">
              <p><span className="font-semibold">Category:</span> {course.category}</p>
              <p><span className="font-semibold">Level:</span> {course.level}</p>
              <p><span className="font-semibold">Language:</span> {course.language}</p>
              <p><span className="font-semibold">Duration:</span> {course.duration} weeks</p>
              <p><span className="font-semibold">Start:</span> {new Date(course.startDate).toDateString()}</p>
              <p><span className="font-semibold">End:</span> {new Date(course.endDate).toDateString()}</p>
              <p><span className="font-semibold">Enroll By:</span> {new Date(course.enrollmentDeadline).toDateString()}</p>
              <p><span className="font-semibold">Teacher:</span> {course.teacher}</p>
              <p><span className="font-semibold">Price:</span> ₹{course.price} ({course.discount}% off)</p>
            </div>

            {course.tags?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Chapter Info */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-[#7670AC] mb-1">
                {chapter.title}
              </h2>
              <p className="text-gray-600 mb-4">{chapter.description}</p>

              {chapter.videoUrl ? (
                <div className="aspect-video w-full max-w-4xl rounded-lg overflow-hidden shadow-md border">
                  <iframe
                    src={chapter.videoUrl}
                    title={chapter.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
                  No video content available for this chapter.
                </div>
              )}
            </div>
          </div>

          {/* Right section: Cover Image */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <img
              src={course.coverImage}
              alt="Course Cover"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseEnrollment;
