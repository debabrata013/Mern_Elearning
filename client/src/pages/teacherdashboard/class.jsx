import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Video, Users, Calendar, Clock, X ,BookOpen,FilePlus, Loader , File } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/api/axiosInstance';
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
        courses:'',
    });
 

    const [videoFile, setVideoFile] = useState(null);
  const [resourceFile, setResourceFile] = useState(null);const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Please upload a valid video file.");
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
      alert("Only images, PDFs, or PPT files are allowed.");
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
            alert("Please select a video file first");
            return;
        }
        
        setUploading(true);
        const formData = new FormData();
        formData.append("video", videoFile);

        const response = await axiosInstance.post(`/lac/video/${selectedCourse._id}/${chapterId}`, formData);

        if (response.status === 200) {
            alert("Lecture uploaded successfully!");
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
        alert(`Failed to upload lecture: ${error.response?.data?.message || error.message}`);
    } finally {
        setUploading(false);
    }
};
  
const handleUploadResource = async (chapterId) => {
  try {
      if (!resourceFile) {
          alert("Please select a resource file first");
          return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("resource", resourceFile);

      const response = await axiosInstance.post(`/lac/resource/${selectedCourse._id}/${chapterId}`, formData);

      if (response.status === 200) {
          alert("Resource uploaded successfully!");
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
      alert(`Failed to upload resource: ${error.response?.data?.message || error.message}`);
  } finally {
      setUploading(false);
  }
};
const handleDeleteLecture = async (courseId, chapterId, lessonId) => {
    if (window.confirm("Do you really want to delete this video?")) {
        try {
            const response = await axiosInstance.delete(`/lac/video/${courseId}/${chapterId}/${lessonId}`);
            if (response.status === 200) {
                alert("Video deleted successfully!");

                location.reload();
            }
        } catch (error) {
            console.error("Error deleting video:", error);
            alert(`Failed to delete video: ${error.response?.data?.message || error.message}`);
        }
    }
};

const handleDeleteResource = async (courseId, chapterId, resourceId) => {
    if (window.confirm("Do you really want to delete this resource?")) {
        try {
            const response = await axiosInstance.delete(`/lac/resource/${courseId}/${chapterId}/${resourceId}`);
            if (response.status === 200) {
                alert("Resource deleted successfully!");

                location.reload();
                
            }
        } catch (error) {
            console.error("Error deleting resource:", error);
            alert(`Failed to delete resource: ${error.response?.data?.message || error.message}`);
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
                const today = new Date();
                const filteredCourses = response.data.filter(course => new Date(course.endDate) >today);
                
                setCourses(filteredCourses);
                
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [email]);  // ✅ Fetch only when `email` changes

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };    const handleScheduleClass = () => {
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
  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
    {selectedCourse ? (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-4 text-[#5491CA] flex items-center text-sm sm:text-base"
        >
          <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Back to Courses
        </button>

        <h3 className="text-xl sm:text-2xl font-bold mb-2">{selectedCourse.title}</h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          {selectedCourse.description || "No description available."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
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

        <h4 className="text-lg sm:text-xl font-bold mt-6 mb-2">Chapters</h4>
        <div className="space-y-4">
          {selectedCourse.chapters?.length > 0 ? (
            selectedCourse.chapters.map((chapter, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <h5 className="text-md sm:text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#5491CA]" />
                  {chapter.title}
                </h5>
                <p className="text-gray-600 mt-2 text-sm">{chapter.description || "No syllabus available."}</p>

                <h6 className="text-sm font-semibold mt-4">Lessons:</h6>
                <ul className="list-none ml-4 sm:ml-6 text-gray-600">
                  {chapter.lessons?.length > 0 ? (
                    chapter.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="mb-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 hover:bg-gray-100 rounded">
                          <div
                            onClick={() => handleClick(lesson.videoUrl)}
                            className="cursor-pointer flex items-center flex-1"
                          >
                            <Video className="h-5 w-5 text-[#5491CA]" />
                            <span className="ml-2 text-sm">Video Lecture</span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteLecture(selectedCourse._id, chapter._id, lesson._id)
                            }
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">
                      <Video className="inline-block mr-2" /> No lessons available.
                    </li>
                  )}
                </ul>

                <h6 className="mt-4 text-sm font-semibold">Resources:</h6>
                <ul className="list-none ml-4 sm:ml-6 text-gray-600">
                  {chapter.resourceUrl?.length > 0 ? (
                    chapter.resourceUrl.map((resource, index) => (
                      <li key={resource.id || index} className="mb-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 hover:bg-gray-100 rounded">
                          <div
                            onClick={() => handleClick(resource.url)}
                            className="cursor-pointer flex items-center flex-1"
                          >
                            <File className="h-5 w-5 text-[#5491CA]" />
                            <span className="ml-2 text-sm">{resource.type || 'Resource'}</span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteResource(selectedCourse._id, chapter._id, resource._id)
                            }
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">
                      <File className="inline-block mr-2" /> No resources available.
                    </li>
                  )}
                </ul>

                <div className="mt-4 space-y-4 sm:space-y-0 sm:flex sm:gap-6">
                  <div className="w-full">
                    <label className="block mb-1 text-sm text-gray-700">Select Video:</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="w-full border rounded-lg p-2 text-sm"
                      disabled={uploading}
                    />
                    <button
                      onClick={() => handleUploadLecture(chapter._id)}
                      className="mt-2 w-full bg-[#7670AC] text-white py-2 px-4 rounded hover:opacity-90"
                      disabled={uploading}
                    >
                      {uploading ? <Loader className="animate-spin" /> : "Upload Lecture"}
                    </button>
                  </div>

                  <div className="w-full">
                    <label className="block mb-1 text-sm text-gray-700">Select Resource:</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf,.ppt,.pptx"
                      onChange={handleResourceChange}
                      className="w-full border rounded-lg p-2 text-sm"
                      disabled={uploading}
                    />
                    <button
                      onClick={() => handleUploadResource(chapter._id)}
                      className="mt-2 w-full bg-[#7670AC] text-white py-2 px-4 rounded hover:opacity-90"
                      disabled={uploading}
                    >
                      {uploading ? <Loader className="animate-spin" /> : "Upload Resource"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No chapters available.</p>
          )}
        </div>

        <button
          className="bg-[#5491CA] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all mt-6 w-full sm:w-auto"
          onClick={() => setShowModal(true)}
        >
          Schedule Class
        </button>

        {showModal && (
          classDetails.courses = selectedCourse.title,
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] px-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Schedule Class</h3>

              <label className="block text-sm font-medium">Joining Link</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mb-2 text-sm"
                value={classDetails.link}
                onChange={(e) => setClassDetails({ ...classDetails, link: e.target.value })}
              />

              <label className="block text-sm font-medium">Meeting Start Time</label>
              <input
                type="datetime-local"
                className="w-full border rounded-lg p-2 mb-2 text-sm"
                value={classDetails.time}
                onChange={(e) => setClassDetails({ ...classDetails, time: e.target.value })}
              />

              <label className="block text-sm font-medium">Chapter Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mb-2 text-sm"
                value={classDetails.chapter}
                onChange={(e) => setClassDetails({ ...classDetails, chapter: e.target.value })}
              />

              <div className="flex justify-between mt-4">
                <button onClick={() => setShowModal(false)} className="text-red-500 text-sm">Cancel</button>
                <button
                  onClick={handleScheduleClass}
                  className="bg-[#5491CA] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Courses</h3>
        {loading ? (
          <p className="text-gray-500 text-center">Loading courses...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
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