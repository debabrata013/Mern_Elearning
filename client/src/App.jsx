import { Route, Routes } from "react-router-dom";
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
import Dashboard from "./pages/admin2/dashboard";
import FAQ from "./pages/landing-page/FAQ-page/faq";
import PricingPage from "./pages/landing-page/Pricing/pricing";
import ContactForm from "./pages/landing-page/contact-us/contactus";
import Co from "./pages/demo/cource" 
import Teacher from "./pages/teacherdashboard/dashboard"
import AboutUs from "./pages/landing-page/about-us/aboutus";
import  LoginPage from "./pages/log/login";
import  ForgetPage from "./pages/log/forget";
import PopularCourses from "./pages/landing-page/popular_courses/courses";
import Coursess from "./pages/landing-page/Courses/courses-page"

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Landing page route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/log" element={<LoginPage/>} />
      <Route path="/pop" element={<PopularCourses/>} />
      <Route path="/aboutus" element={<AboutUs/>} />
      <Route path="/logf" element={<ForgetPage/>} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contactus" element={<ContactForm />} />
      <Route path="/coursed" element={<Co/>} />
      <Route path="/teacher" element={<Teacher/>} />
      <Route path="/student" element={<StudentHomePage/>} />
      <Route path="/coursess" element={<Coursess/>} />
      <Route path="/admin" element={<Dashboard />} />
      
      {/* Auth page route */}
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      
      {/* Instructor dashboard route */}
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      
      {/* Add new course page route */}
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      
      {/* Edit course page route */}
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      
      {/* Student view common layout route */}
      <Route
        path="/"
        // element={
          // <RouteGuard
          //   element={<StudentViewCommonLayout />}
          //   authenticated={auth?.authenticate}
          //   user={auth?.user}
          // />
        // }
      >
        {/* Nested routes under student layout */}
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route path="course/details/:id" element={<StudentViewCourseDetailsPage />} />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route path="course-progress/:id" element={<StudentViewCourseProgressPage />} />
      </Route>
      
      {/* Fallback route for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
