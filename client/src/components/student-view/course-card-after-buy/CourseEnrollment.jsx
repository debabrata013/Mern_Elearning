// import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import Sidebar from "../studentComponent/Sidebar";
// import axiosInstance from "@/api/axiosInstance";

// import ReactPlayer from 'react-player';
// import VideoPlayeras from '../studentComponent/ui/videoplayer';
// import { useNavigate } from 'react-router-dom';

// const CourseEnrollment = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const [course, setCourse] = useState(location.state?.course || null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleClick = (url) => {
//     navigate('/resource-viewer', { state: { url } });
//   };


//   const handlePlay = (videoUrl) => {
//     // Encode URI to avoid issues with special characters
//     const encodedUrl = encodeURIComponent(videoUrl);

//     navigate(`/video/${encodedUrl}`);
//   };

//   useEffect(() => {
//     console.log("✅ Received course via navigation:", location.state);
//   }, []);

//   useEffect(() => {
//     if (!course) {
//       const fetchCourse = async () => {
//         setLoading(true);
//         try {
//           const response = await axiosInstance.get(`/api/course/${id}`);
//           setCourse(response.data);
//         } catch (error) {
//           console.error("❌ Failed to fetch course", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCourse();
//     }
//   }, [course, id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-white">
//         <div className="w-12 h-12 border-4 border-[#7670AC] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="text-center mt-20">
//         <h2 className="text-2xl font-bold text-[#5491CA]">Course Not Found</h2>
//         <p className="text-gray-600">Try accessing a different course.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-[260px] fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-30">
//         <Sidebar
//           sections={course.chapters || []}
//           activeSection={0}
//           onSectionChange={() => {}}
//         />
//       </div>

//       {/* Main Content */}
//       <main className="ml-[260px] w-full px-6 py-10 bg-gradient-to-br from-white via-[#f7faff] to-[#eaf3ff] overflow-y-auto">
//         <div className="max-w-7xl mx-auto space-y-12">
//           {/* Course Header */}
//           <div className="space-y-2">
//             <h1 className="text-4xl font-extrabold text-[#5491CA]">{course.title}</h1>
//             <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
//           </div>

//           {/* Course Info + Image */}
//           <div className="flex flex-col lg:flex-row items-start gap-8">
//             {/* Info Panel */}
//             <div className="w-full flex-1 p-6 rounded-2xl bg-white shadow-sm border border-gray-200 space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                 <p><strong>📚 Category:</strong> {course.category}</p>
//                 <p><strong>⚙️ Level:</strong> {course.level}</p>
//                 <p><strong>🗣️ Language:</strong> {course.language}</p>
//                 <p><strong>⏳ Duration:</strong> {course.duration} weeks</p>
//                 <p><strong>🚀 Start:</strong> {new Date(course.startDate).toDateString()}</p>
//                 <p><strong>🏁 End:</strong> {new Date(course.endDate).toDateString()}</p>
//                 <p><strong>📅 Enroll By:</strong> {new Date(course.enrollmentDeadline).toDateString()}</p>
//                 <p><strong>👨‍🏫 Teacher:</strong> {course.teacher}</p>
//               </div>

//               {/* Tags */}
//               {course.tags?.length > 0 && (
//                 <div>
//                   <h4 className="text-sm font-semibold mb-1 text-gray-700">Tags:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {course.tags.map((tag, i) => (
//                       <span
//                         key={i}
//                         className="bg-[#d4eaff] text-[#1166aa] text-xs px-3 py-1 rounded-full font-medium"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Course Image */}
//             <div className="w-full lg:w-[350px]">
//               <img
//                 src={course.coverImage}
//                 alt="Course Cover"
//                 className="rounded-xl shadow-lg w-full object-cover border border-gray-300"
//               />
//             </div>
//           </div>

//           {/* All Chapters */}
//           <div className="space-y-8">
//             <h2 className="text-2xl font-bold text-[#5491CA]">Course Chapters</h2>

//             {course.chapters?.length > 0 ? (
//               course.chapters.map((ch, index) => (
//                 <div
//                   key={ch._id}
//                   className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4"
//                 >
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-xl font-semibold text-[#7670AC]">
//                       Chapter {index + 1}: {ch.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">{new Date(ch.createdAt).toDateString()}</p>
//                   </div>

//                   <p className="text-gray-600">{ch.description}</p>

//                   {/* Lessons */}
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">🎓 Lessons</h4>
//                     {ch.lessons?.length > 0 ? (
//                       <ul className="list-disc list-inside space-y-1">
//                         {ch.lessons.map((lesson, idx) => (
//                           <li key={idx} className="flex items-center justify-between">
//                             <button
//                               // onClick={() => setActiveVideo({ url: lesson.videoUrl, title: `Lesson ${idx + 1}` })}
//                               onClick={() => handlePlay(lesson.videoUrl)}
//                               className="text-blue-600 btn hover:text-blue-800 "
//                             >
//                               Watch Video {idx + 1}
                          
                              
//                             </button>
//                           </li>
//                                     ))}
//                                   </ul>
//                                 ) : (
//                                   <p className="text-gray-500">No lessons available.</p>
//                                                                         )}
                                         
//                                         </div>


                  
//                  < div>
//   <h4 className="font-medium text-gray-800 mb-2">📁 Resources</h4>
//   {ch.resourceUrl?.length > 0 ? (
//     <ul className="list-disc list-inside space-y-1">
//       {ch.resourceUrl.map((url, idx) => (
//         <li key={idx}>
        
          
//           <button
//             onClick={() => handleClick(url.url)}
//             className="text-blue-600 underline hover:text-blue-800"
//           >
//             Resource {idx + 1}
//           </button>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p className="text-gray-500">No resources available.</p>
//   )}
// </div>


                 
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No chapters found for this course.</p>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CourseEnrollment;

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../studentComponent/Sidebar";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const CourseEnrollment = () => {
  const { id } = useParams();
  const location = useLocation();
  const [course, setCourse] = useState(location.state?.course || null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate('/resource-viewer', { state: { url } });
  };

  const handlePlay = (videoUrl) => {
    const encodedUrl = encodeURIComponent(videoUrl);
    navigate(`/video/${encodedUrl}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Course Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the course you're looking for.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 transition-all duration-300 ${
        sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
      } lg:w-64`}>
        {/* <div className="p-4 bg-blue-600 text-white">
          <h2 className="text-lg font-bold">Course Contents</h2>
        </div> */}
        <Sidebar
          sections={course.chapters || []}
          activeSection={activeChapter}
          onSectionChange={(index) => {
            setActiveChapter(index);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <main className="w-full lg:ml-64 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Course Header */}
          <div className="space-y-4 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">{course.title}</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {course.level}
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
          </div>

          {/* Course Info + Image */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Course Image - Moved above on mobile */}
            <div className="w-full lg:w-1/3 order-1 lg:order-2">
              <div className="sticky top-6">
                <img
                  src={course.coverImage || "/placeholder-course.jpg"}
                  alt={`${course.title} Cover`}
                  className="rounded-xl shadow-md w-full h-60 object-cover border border-gray-200 mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-course.jpg";
                  }}
                />
                
                {/* Key Info Card */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Course Information
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{course.category}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration} weeks</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-medium">{course.language}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium">{course.teacher}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Chapters Section */}
            <div className="w-full lg:w-2/3 order-2 lg:order-1 space-y-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Course Content</h2>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              {course.chapters?.length > 0 ? (
                <div className="space-y-6">
                  {course.chapters.map((chapter, index) => (
                    <div
                      key={chapter._id || index}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <div className="border-b border-gray-100">
                        <button
                          className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                          onClick={() => setActiveChapter(index === activeChapter ? -1 : index)}
                        >
                          <div className="flex items-center">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-800">{chapter.title}</h3>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                              activeChapter === index ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>

                      {activeChapter === index && (
                        <div className="p-6 space-y-5">
                          <p className="text-gray-600">{chapter.description}</p>

                          {/* Lessons Section */}
                          <div>
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Lessons
                            </h4>
                            {chapter.lessons?.length > 0 ? (
                              <ul className="divide-y divide-gray-100">
                                {chapter.lessons.map((lesson, idx) => (
                                  <li key={idx} className="py-3">
                                    <button
                                      onClick={() => handlePlay(lesson.videoUrl)}
                                      className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                    >
                                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                      </span>
                                      <span className="flex-grow font-medium">
                                        {lesson.title || `Lesson ${idx + 1}`}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 italic">No lessons available for this chapter.</p>
                            )}
                          </div>

                          {/* Resources Section */}
                          <div>
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Resources
                            </h4>
                            {chapter.resourceUrl?.length > 0 ? (
                              <ul className="divide-y divide-gray-100">
                                {chapter.resourceUrl.map((resource, idx) => (
                                  <li key={idx} className="py-2">
                                    <button
                                      onClick={() => handleClick(resource.url)}
                                      className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                    >
                                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                      </span>
                                      <span className="flex-grow font-medium">
                                        {resource.title || `Resource ${idx + 1}`}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 italic">No resources available for this chapter.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-gray-500">No chapters found for this course.</p>
                </div>
              )}
            </div>
          </div>

          {/* Schedule Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Course Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-gray-500 mb-1">Start Date</div>
                <div className="font-semibold">{new Date(course.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-gray-500 mb-1">End Date</div>
                <div className="font-semibold">{new Date(course.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-gray-500 mb-1">Enrollment Deadline</div>
                <div className="font-semibold">{new Date(course.enrollmentDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          {course.tags?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseEnrollment;