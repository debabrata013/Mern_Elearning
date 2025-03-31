import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Video, Users, Calendar, Clock, X ,BookOpen,FilePlus, Loader } from 'lucide-react';
import axios from 'axios';
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
    const [view, setView] = useState('courses'); // courses, classes, startClass
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
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

  const handleUploadLecture = async (chapterId) => {
   try {
   
     const formData = new FormData();
     formData.append("video", videoFile);
     formData.append("chapterId", chapterId);
     formData.append("courseId", selectedCourse._id);

     
      const response=  await axiosInstance.post("/courses/uploadLecture",formData)
      setVideoFile(null)
     
    
   } catch (error) {
    console.error("Error uploading lecture:", error);
    alert("Failed to upload lecture. Please try again.");
   }
   
  };
  const handleUploadResource =async (chapterId) => {
    try {
     
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("chapterId", chapterId);
      formData.append("courseId", selectedCourse._id);
 
      
       const response=  await axiosInstance.post("/courses/uploadLecture",formData)
       setVideoFile(null)
      
     
    } catch (error) {
     console.error("Error uploading lecture:", error);
     alert("Failed to upload lecture. Please try again.");
    }
    
   };

    
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email; // Avoid errors if user is null

    useEffect(() => {
        if (!email) return; // ✅ Prevent fetching if email is missing

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:4400/teachers/get?email=${email}`);
                setCourses(response.data);
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
        <div className="bg-gray-50 p-6 rounded-xl">
        

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
                                          <li key={lessonIndex}>
                                            <ul>
                                                <li className="ml-6">{lesson.title}</li>
                                                <li><Video/>
                                                <span className="ml-2">{lesson.videoUrl}</span>
                                        <span className="ml-2">{lesson.resourceUrl}</span></li>
                                        <button onClick={() => handleUploadLecture(lesson)} className="mt-4 flex items-center gap-2 text-[#5491CA] hover:underline">
                                  <FilePlus className="h-5 w-5" /> Upload Lecture
                              </button>
                              <button onClick={() => handleUploadResource(lesson)} className="mt-4 flex items-center gap-2 text-[#5491CA] hover:underline">
                                  <FilePlus className="h-5 w-5" /> Upload Resources
                              </button>

                                            </ul>
                                            </li>

                                      ))
                                  ) : (
                                      <li className="text-gray-500"><Video/> No lessons available.</li>
                                  )}
                              </ul>
                              <div style={styles.container}>
                                <div className="container">
      <label style={styles.label}>
        Select Video:
        <input type="file" accept="video/*" onChange={handleVideoChange} style={styles.input} />
      </label>
      <button onClick={handleUploadLecture(chapter._id)} style={styles.button}>
        Upload Lecture 
      </button>
     </div>
     <div className="container">
      <label style={styles.label}>
        Select Resource:
        <input
          type="file"
          accept="image/*,application/pdf,.ppt,.pptx"
          onChange={handleResourceChange}
          style={styles.input}
        /> </label>
        <button onClick={handleUploadResource(chapter._id)} style={styles.button}>
        Upload Resource
      </button>
     
     </div>

      
    </div>
                              </div>
                      ))
                  ) : (
                      <p className="text-gray-500">No chapters available.</p>
                  )}
              </div>
              
              <button className="bg-[#5491CA] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all mt-6" onClick={() => setShowModal(true)}>
                  Schedule Class
              </button>
              {showModal && (
                classDetails.courses=selectedCourse.title,
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Schedule Class</h3>
                        <label className="block text-sm font-medium">Joining Link</label>
                        <input type="text" className="w-full border rounded-lg p-2 mb-2" 
                            value={classDetails.link} onChange={(e) => setClassDetails({ ...classDetails, link: e.target.value })} />
                        
                        <label className="block text-sm font-medium">Meeting Start Time</label>
                        <input type="datetime-local" className="w-full border rounded-lg p-2 mb-2" 
                            value={classDetails.time} onChange={(e) => setClassDetails({ ...classDetails, time: e.target.value })} />
                        
                        <label className="block text-sm font-medium">Chapter Name</label>
                        <input type="text" className="w-full border rounded-lg p-2 mb-2" 
                            value={classDetails.chapter} onChange={(e) => setClassDetails({ ...classDetails, chapter: e.target.value })} />

                        
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setShowModal(false)} className="text-red-500">Cancel</button>
                            <button onClick={handleScheduleClass} className="bg-[#5491CA] text-white px-4 py-2 rounded-lg">Send</button>
                        </div>
                    </div>
                </div>
            )}

          </div>
            ) : (
                <div>
                    <h3 className="text-2xl font-bold mb-4">Courses</h3>
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
            )
            
            }
            
        </div>
    );
};

export default ClassesContent;