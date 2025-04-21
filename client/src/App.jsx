import React from "react";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "./context/auth-context";
// import AuthPage from "./pages/auth";
// import RouteGuard from "./components/route-guard";
import LandingPage from "./pages/landing-page"; // Import the new landing page component
// import InstructorDashboardpage from "./pages/instructor";
// import StudentViewCommonLayout from "./components/student-view/common-layout";
// import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/Notfound";
// // import AddNewCoursePage from "./pages/instructor/add-new-course";
// import StudentViewCoursesPage from "./pages/student/courses";
// import StudentViewCourseDetailsPage from "./pages/student/course-details";
// import PaypalPaymentReturnPage from "./pages/student/payment-return";
// import StudentCoursesPage from "./pages/student/student-courses";
// import StudentViewCourseProgressPage from "./pages/student/course-progress";
import AdminDashboard from "./pages/admin/dashboard";
import FAQ from "./pages/landing-page/FAQ-page/faq";
import PricingPage from "./pages/landing-page/Pricing/pricing";
import ContactForm from "./pages/landing-page/contact-us/contactus";
// import Co from "./pages/demo/cource"
import TeacherDashboard from "./pages/teacherdashboard/dashboard";
import AboutUs from "./pages/landing-page/about-us/aboutus";
import Login from "./pages/log/login";
import  ForgetPage from "./pages/log/forget";
// import PopularCourses from "./pages/landing-page/popular_courses/courses";
import Coursess from "./pages/landing-page/Courses/courses-page";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./context/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import StudentRoutes from "./components/student-view/StudentRoutes";
// import DemoVideoPlayer from "./components/student-view/studentComponent/ui/videoplayer";
import VideoPage from './components/student-view/course-card-after-buy/VideoPage';

import Std from "./components/student-view/StudentViewCommonHeader";
import Projile from "./components/student-view/profile-page/profilepage"
import StudentAnoument from "./components/student-view/AnnouncementPage"
import Studentbuycourse from "./components/student-view/courcebuy"
import Studentbuycourse2 from "./components/student-view/coursebuy"
import Doubts from "./components/student-view/Doubts"
import Doubts3 from "./components/student-view/Doubts2"
import Doubts2 from "./components/student-view/Doubts1"
import Assigment from "./components/student-view/Assigment"
import Assigment2 from "./components/student-view/Assigment2"
import AssignmentQuiz from "./components/student-view/AssignmentQuiz"

import Pr from "./pages/admin/profile"
import Enroll from './components/student-view/studentComponent/enroll';
import CreateQuizAssignmentForm from "./pages/teacherdashboard/quiz dashboard/createQuize";
import MyCourses from "./components/student-view/MyCourses"
import ContinueCourse from "./components/student-view/course-card-after-buy/CourseEnrollment"

// import StudentRoutes from "./components/student-view/StudentRoutes";
// import student from './components/student-view/AppLayout'

// Import the new pages
import CourseDemo from './pages/landing-page/course-demo/CourseDemo';
import CourseEnrollment from './pages/landing-page/course-enrollment/CourseEnrollment';
import { ThemeProvider } from './context/ThemeContext';
import CartPage from './components/student-view/studentComponent/CartPage';
import Job from './components/student-view/job';
import Tc from "./pages/T&C"
import Privacy from "./pages/policy"
import Noti from "./components/student-view/Notification"
import CourseDoubts from "./pages/teacherdashboard/CourseDoubts";
import TeacherAssignmentList from "./pages/teacherdashboard/quiz dashboard/TeacherAssignmentList";
import ChatPage from "./pages/teacherdashboard/ChatPage"
import ResourceViewer from './components/ui/ResourceViewer';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
        <Route path="/video/:videoUrl" element={<VideoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPage/>}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/coursess" element={<Coursess />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contactus" element={<ContactForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
           <Route path="/jobs" element={<Job/>}/>
          <Route path="/abo" element={<Std />} />   
          <Route path="/aboa" element={<StudentAnoument />} />
          <Route path="/abca" element={<Studentbuycourse />} />
          <Route path="/abcd" element={<Doubts />} />
          <Route path="/abas" element={<Assigment />} />
          <Route path="/Mycourse/:courseId/Assigment" element={<Assigment2/>} />
          <Route path="/Mycourse/:courseId/Doubts" element={<Doubts2/>} />
          <Route path="/doubt/:doubtId/discussion" element={<Doubts3 />} />
          {/* /Mycourse/${courseId}/Assigment */}
          <Route path="/student/assignment/:assignmentId/:id" element={<AssignmentQuiz />} />

          <Route path="/abca2" element={<Studentbuycourse2 />} />
          <Route path="/abop" element={<Pr />} />
          <Route path="/profile" element={<Projile />} />
          <Route path="/enroll/:courseId" element={<Enroll />} />
          <Route path="/terms" element={<Tc/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/notifications" element={<Noti/>}/>
          {/* <Route path="/videop" element={<DemoVideoPlayer/>} /> */}
          < Route path="/mycourse/:id" element={<MyCourses/>}/>
          <Route path="/mycourse/course/:id" element={<ContinueCourse/>} />       {/*  new added for course view*/}
          <Route path="/teacher/assignments/:courseId" element={<TeacherAssignmentList />} />
          <Route path="/teacher/assignments/:courseId/create" element={<CreateQuizAssignmentForm />} />
          <Route path="/course/:id/doubts" element={<CourseDoubts />} />
          <Route path="/resource-viewer" element={<ResourceViewer />} />
          <Route path="/doubts/:doubtId/chat" element={<ChatPage />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="student">
                <Std />
              
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/courses" element={<Coursess />} />
          <Route path="/course-demo/:courseId" element={<CourseDemo />} />
          <Route path="/course-enrollment/:courseId" element={<CourseEnrollment />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
