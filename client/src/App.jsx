import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import LandingPage from "./pages/landing-page"; // Import the new landing page component
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import AdminDashboard from "./pages/admin/dashboard";
import FAQ from "./pages/landing-page/FAQ-page/faq";
import PricingPage from "./pages/landing-page/Pricing/pricing";
import ContactForm from "./pages/landing-page/contact-us/contactus";
import Co from "./pages/demo/cource" 
import TeacherDashboard from "./pages/teacherdashboard/dashboard"
import AboutUs from "./pages/landing-page/about-us/aboutus";
import  Login from "./pages/log/login";
import  ForgetPage from "./pages/log/forget";
import PopularCourses from "./pages/landing-page/popular_courses/courses";
import Coursess from "./pages/landing-page/Courses/courses-page"
import { AuthProvider } from './context/auth';
import ProtectedRoute from "./context/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  
  return (
    <AuthProvider>

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute role="student">
            < StudentHomePage />
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
    </Routes>

</AuthProvider>

  );
}

export default App;
