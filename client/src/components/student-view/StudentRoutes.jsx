import MyCourses from "./studentComponent/MyCourses";
import AppLayout from "./AppLayout";
import Doubts from "./studentComponent/Doubts";
import Project from "./studentComponent/Project";
import Resources from "./studentComponent/Resources";
import Assignment from "./studentComponent/Assignment";
import Notice from "./studentComponent/Notice";
import Profile from "./studentComponent/Profile";
import CourseDetailPage from "./studentComponent/CourseDetailsPage";
import CoursePage from "./coursebuy";
import { Route, Routes } from "react-router-dom";

function StudentRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/mycourses" element={<CoursePage />} />
        <Route path="/coursedetails" element={<CourseDetailPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </AppLayout>
  );
}

export default StudentRoutes;
