import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Video, Users, Calendar, Clock, X, BookOpen, FilePlus, Loader, File } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: "auto",
    flexWrap: "wrap",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "150px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

const ClassesContent = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('courses'); // courses, classes, startClass
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // Add loading state for uploads
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [classDetails, setClassDetails] = useState({
    link: '',
    time: '',
    chapter: '',
    courses: '',
  });

  const [videoFile, setVideoFile] = useState(null);
  const [resourceFile, setResourceFile] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      toast.error("Please upload a valid video file.");
      e.target.value = ""; // Reset input
    }
  };

  const handleResourceChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.type.includes("presentation"))
    ) {
      setResourceFile(file);
    } else {
      toast.error("Only images, PDFs, or PPT files are allowed.");
      e.target.value = "";
    }
  };

  const handleClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleUploadLecture = async (chapterId) => {
    try {
      if (!videoFile) {
        toast.error("Please select a video file first");
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("video", videoFile);

      const response = await axiosInstance.post(`/lac/video/${selectedCourse._id}/${chapterId}`, formData);

      if (response.status === 200) {
        toast.success("Lecture uploaded successfully!");
        setVideoFile(null);
        // Fetch updated course data
        const updatedResponse = await axios.get(`http://localhost:4400/teachers/get?email=${email}`);
        setCourses(updatedResponse.data);
        // Find and update the selected course
        const updatedCourse = updatedResponse.data.find(course => course._id === selectedCourse._id);
        if (updatedCourse) {
          setSelectedCourse(updatedCourse);
        }
      }
    } catch (error) {
      console.error("Error uploading lecture:", error);
      toast.error(`Failed to upload lecture: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadResource = async (chapterId) => {
    try {
      if (!resourceFile) {
        toast.error("Please select a resource file first");
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("resource", resourceFile);

      const response = await axiosInstance.post(`/lac/resource/${selectedCourse._id}/${chapterId}`, formData);

      if (response.status === 200) {
        toast.success("Resource uploaded successfully!");
        setResourceFile(null);
        // Fetch updated course data
        const updatedResponse = await axios.get(`http://localhost:4400/teachers/get?email=${email}`);
        setCourses(updatedResponse.data);
        // Find and update the selected course
        const updatedCourse = updatedResponse.data.find(course => course._id === selectedCourse._id);
        if (updatedCourse) {
          setSelectedCourse(updatedCourse);
        }
      }
    } catch (error) {
      console.error("Error uploading resource:", error);
      toast.error(`Failed to upload resource: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResource = async (courseId, chapterId, resourceId) => {
    if (window.confirm("Do you really want to delete this resource?")) {
      try {
        const response = await axiosInstance.delete(`/lac/resource/${courseId}/${chapterId}/${resourceId}`);
        if (response.status === 200) {
          toast.success("Resource deleted successfully!");

          const fetchCourses = async () => {
            try {
              const response = await axios.get(`http://localhost:4400/teachers/get?email=${email}`);

              // Filter courses where today's date is greater than endDate
              const today = new Date();
              const filteredCourses = response.data.filter(course => new Date(course.endDate) < today);

              setCourses(filteredCourses);
            } catch (err) {
              console.error('Error fetching courses:', err);
              setError('Failed to fetch courses');
              toast.error('Failed to fetch courses');
            } finally {
              setLoading(false);
            }
          };

          fetchCourses();
        }
      } catch (error) {
        console.error("Error deleting resource:", error);
        toast.error(`Failed to delete resource: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email; // Avoid errors if user is null

  useEffect(() => {
    if (!email) return; // ✅ Prevent fetching if email is missing

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:4400/teachers/get?email=${email}`);

        // Filter courses where today's date is greater than endDate
        const today = new Date();
        const filteredCourses = response.data.filter(course => new Date(course.endDate) < today);

        setCourses(filteredCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
        toast.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [email]); // ✅ Fetch only when `email` changes

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleScheduleClass = () => {
    console.log("Scheduled Class Details:", classDetails);
    setShowModal(false);
  };

  const CourseCard = React.memo(({ course }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-r from-[#5491CA]/30 to-[#b1a9f1]/30 relative">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#5491CA]">{course.title}</h3>
        <p className="text-gray-600 mb-2">{course.description || "No description available."}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Users className="h-4 w-4 text-[#b1a9f1]" />
          <span>{course.maxStudents} students</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#5491CA] mb-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(course.startDate)}</span>
        </div>
        <div className="text-sm font-semibold text-gray-700 mb-3">
          Price: {course.currency} {course.price}
        </div>
        <button
          onClick={() => setSelectedCourse(course)}
          className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white py-2 rounded-lg hover:shadow-md transition-all"
        >
          View Course
        </button>
      </div>
    </div>
  ));

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {selectedCourse ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button onClick={() => setSelectedCourse(null)} className="mb-4 text-[#5491CA] flex items-center">
            <ArrowLeft className="mr-2" /> Back to Courses
          </button>
          <h3 className="text-2xl font-bold mb-2">{selectedCourse.title}</h3>
          <p className="text-gray-600 mb-4">{selectedCourse.description || "No description available."}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#5491CA]" />
              <span>Start Date: {formatDate(selectedCourse.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#5491CA]" />
              <span>End Date: {formatDate(selectedCourse.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#5491CA]" />
              <span>Max Students: {selectedCourse.maxStudents}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#5491CA]" />
              <span>Duration: {selectedCourse.duration} weeks</span>
            </div>
          </div>

          <h4 className="text-xl font-bold mt-6 mb-2">Chapters</h4>
          <div className="space-y-4">
            {selectedCourse.chapters && selectedCourse.chapters.length > 0 ? (
              selectedCourse.chapters.map((chapter, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-sm">
                  <h5 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#5491CA]" />
                    {chapter.title}
                  </h5>
                  <p className="text-gray-600 mt-2">{chapter.description || "No syllabus available."}</p>

                  <h6 className="text-md font-semibold mt-4">Lessons:</h6>
                  <ul className="list-none ml-6 text-gray-600">
                    {chapter.lessons && chapter.lessons.length > 0 ? (
                      chapter.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="mb-2">
                          <div className="flex flex-col gap-2">
                            {lesson.videoUrl && (
                              <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                                <div
                                  onClick={() => handleClick(lesson.videoUrl)}
                                  className="cursor-pointer flex items-center flex-1"
                                >
                                  <Video className="h-5 w-5 text-[#5491CA]" />
                                  <span className="ml-2">Video Lecture</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">
                        <Video className="inline-block mr-2" /> No lessons available.
                      </li>
                    )}
                  </ul>

                  <h6> Resources :</h6>
                  <ul className="list-none ml-6 text-gray-600">
                    {chapter.resourceUrl && chapter.resourceUrl.length > 0 ? (
                      chapter.resourceUrl.map((resource, index) => (
                        <li key={resource.id || index} className="mb-2">
                          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                            <div
                              onClick={() => handleClick(resource.url)}
                              className="cursor-pointer flex items-center flex-1"
                            >
                              <File className="h-5 w-5 text-[#5491CA]" />
                              <span className="ml-2">{resource.type || 'Resource'}</span>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">
                        <File className="inline-block mr-2" /> No resources available.
                      </li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No chapters available.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold mb-4">Old Courses</h3>
          {loading ? (
            <p className="text-gray-500 text-center">Loading courses...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course._id || course.courseCode} course={course} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No courses available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassesContent;
