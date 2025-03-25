import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Video, Users, Calendar, Clock, X ,BookOpen,FilePlus } from 'lucide-react';
import axios from 'axios';

const ClassesContent = () => {
    const [view, setView] = useState('courses'); // courses, classes, startClass
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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
                                        <button className="mt-4 flex items-center gap-2 text-[#5491CA] hover:underline">
                                  <FilePlus className="h-5 w-5" /> Upload Lecture
                              </button>
                              <button className="mt-4 flex items-center gap-2 text-[#5491CA] hover:underline">
                                  <FilePlus className="h-5 w-5" /> Upload Resources
                              </button>

                                            </ul>
                                            </li>

                                      ))
                                  ) : (
                                      <li className="text-gray-500"><Video/> No lessons available.</li>
                                  )}
                              </ul>
                              
                              <button className="mt-4 flex items-center gap-2 text-[#5491CA] hover:underline">
                                  <FilePlus className="h-5 w-5" /> Upload Lecture
                              </button>
                              <button className="mt-4 flex items-center gap-2 text-[#5491CA] hover:underline">
                                  <FilePlus className="h-5 w-5" /> Upload Resources
                              </button>


                          </div>
                      ))
                  ) : (
                      <p className="text-gray-500">No chapters available.</p>
                  )}
              </div>
              
              <button className="bg-[#5491CA] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all mt-6">
                  Schedule Class
              </button>
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
            )}
        </div>
    );
};

export default ClassesContent;