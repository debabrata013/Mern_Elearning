import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "../nav-bar/nav";
import Footer from "../footer/footer";

const CourseEnrollment = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(location.state?.course || null);
  const [loading, setLoading] = useState(!location.state?.course);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  useEffect(() => {
    // If course data wasn't passed via location state, fetch it
    if (!course) {
      const fetchCourse = async () => {
        try {
          // Replace with your actual API call
          const response = await fetch(`/api/courses/${courseId}`);
          if (!response.ok) throw new Error("Course not found");
          const data = await response.json();
          setCourse(data);
        } catch (error) {
          console.error("Error fetching course:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }

    // Check if user is already enrolled
    const checkEnrollment = async () => {
      try {
        // Replace with your actual enrollment check
        // This is a placeholder - you'll need to implement actual enrollment check
        const response = await fetch(`/api/enrollments/check/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setIsEnrolled(data.isEnrolled);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };
    checkEnrollment();
  }, [courseId, course]);

  const handleEnrollNow = () => {
    // If it's a free course, enroll directly
    if (!course.price || course.price === 0) {
      handleFreeEnrollment();
    } else {
      // If it's a paid course, show payment options
      setShowPayment(true);
    }
  };

  const handleFreeEnrollment = async () => {
    setPaymentProcessing(true);
    try {
      // Replace with your actual enrollment API call
      // This is a placeholder - you'll need to implement actual enrollment
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Show success message
      setEnrollmentSuccess(true);
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Failed to enroll. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentProcessing(true);
    try {
      // Replace with your actual enrollment after payment API call
      // This is a placeholder - you'll need to implement actual enrollment
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Show success message
      setEnrollmentSuccess(true);
    } catch (error) {
      console.error("Enrollment error after payment:", error);
      alert("Payment successful but enrollment failed. Please contact support.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleGoToCourse = () => {
    navigate(`/my-courses/${courseId}`);
  };

  const handleGoToMyCourses = () => {
    navigate("/my-courses");
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="w-12 h-12 border-4 border-[#7670AC] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Nav />
        <div className="max-w-2xl mx-auto my-32 text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#5491CA] mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate("/courses")} 
            className="px-6 py-3 bg-white border-2 border-[#5491CA] text-[#5491CA] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Courses
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (enrollmentSuccess) {
    return (
      <>
        <Nav />
        <div className="max-w-2xl mx-auto my-32 text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="text-6xl text-[#5491CA] mb-4">✓</div>
          <h2 className="text-2xl font-bold text-[#5491CA] mb-4">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-2">You have successfully enrolled in <strong>{course.title}</strong>.</p>
          <p className="text-gray-600 mb-8">You can now access all course materials and start learning.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleGoToCourse} 
              className="px-6 py-3 bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Start Learning
            </button>
            <button 
              onClick={handleGoToMyCourses} 
              className="px-6 py-3 bg-white border-2 border-[#5491CA] text-[#5491CA] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              My Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto my-24 p-6 bg-white rounded-xl shadow-lg border border-[#5491CA]">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#5491CA]">
            Course Details: <span className="text-[#7670AC]">{course.title}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src={course.coverImage || "https://via.placeholder.com/600x300?text=Course+Image"} 
                alt={course.title} 
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Instructor:</span>
                <span className="text-gray-800 font-semibold">{course.instructor || "Expert Instructor"}</span>
              </div>
              
              <div className="flex flex-wrap gap-6 py-3 border-y border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  <span className="text-gray-700">{course.duration || "Self-paced"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <span className="text-gray-700">{course.level || "All Levels"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="text-gray-700">{course.students || 0} Students</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">About This Course</h3>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.highlights ? (
                    course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#7670AC] font-bold">✓</span>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7670AC] font-bold">✓</span>
                        <span className="text-gray-600">Comprehensive understanding of the subject</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7670AC] font-bold">✓</span>
                        <span className="text-gray-600">Practical skills you can apply immediately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7670AC] font-bold">✓</span>
                        <span className="text-gray-600">Industry-relevant knowledge and techniques</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Syllabus</h3>
              <div className="space-y-4">
                {course.modules ? (
                  course.modules.map((module, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-[#5491CA]">{module.title}</h4>
                        <span className="text-sm text-gray-500">{module.length || "1 hour"}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-[#5491CA]">Module 1: Introduction</h4>
                        <span className="text-sm text-gray-500">1 hour</span>
                      </div>
                      <p className="text-gray-600 text-sm">An overview of the course and key concepts.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-[#5491CA]">Module 2: Core Principles</h4>
                        <span className="text-sm text-gray-500">2 hours</span>
                      </div>
                      <p className="text-gray-600 text-sm">Dive into the fundamental principles of the subject.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-[#5491CA]">Module 3: Advanced Techniques</h4>
                        <span className="text-sm text-gray-500">3 hours</span>
                      </div>
                      <p className="text-gray-600 text-sm">Master advanced concepts and techniques.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
              <div className="mb-6 text-center">
                <span className="text-3xl font-bold text-[#7670AC]">
                  {course.price ? `₹${course.price}` : "Free"}
                </span>
                {course.originalPrice && (
                  <span className="ml-2 text-lg text-gray-400 line-through">₹{course.originalPrice}</span>
                )}
              </div>

              {isEnrolled ? (
                <button 
                  onClick={handleGoToCourse} 
                  className="w-full py-3 bg-[#5491CA] text-white rounded-lg font-semibold hover:bg-[#4a82b6] transition-colors mb-6"
                >
                  Go to Course
                </button>
              ) : showPayment ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Payment Options</h3>
                  <div className="space-y-3">
                    <button 
                      className="w-full py-3 bg-[#7670AC] text-white rounded-lg font-semibold hover:bg-[#665d9c] transition-colors flex items-center justify-center gap-2"
                      onClick={handlePaymentSuccess}
                      disabled={paymentProcessing}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Pay with Razorpay
                    </button>
                    <button 
                      className="w-full py-3 bg-[#5491CA] text-white rounded-lg font-semibold hover:bg-[#4a82b6] transition-colors flex items-center justify-center gap-2"
                      onClick={handlePaymentSuccess}
                      disabled={paymentProcessing}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Credit/Debit Card
                    </button>
                  </div>
                  <button 
                    className="w-full py-3 bg-white border border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    onClick={() => setShowPayment(false)}
                    disabled={paymentProcessing}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEnrollNow} 
                  className="w-full py-3 bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-white rounded-lg font-semibold hover:shadow-lg transition-all mb-6"
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? "Processing..." : "Enroll Now"}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">This Course Includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-xl">📹</span>
                    <span className="text-gray-600">{course.videoHours || "10 hours"} on-demand video</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-xl">📝</span>
                    <span className="text-gray-600">{course.textHours || "10 hours"} of text</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-xl">📚</span>
                    <span className="text-gray-600">{course.practiceHours || "10 hours"} of practice</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-xl">🎓</span>
                    <span className="text-gray-600">{course.certificate || "Certificate of Completion"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseEnrollment; 