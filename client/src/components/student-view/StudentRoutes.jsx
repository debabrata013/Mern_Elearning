import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyCourses from "./components/MyCourses";
import AppLayout from "./AppLayout";
import Doubts from "./components/Doubts";
import Project from "./components/Project";
import Resources from "./components/Resources";
import Assignment from "./components/Assignment";
import Notice from "./components/Notice";
import Profile from "./components/Profile";
import CourseDetailPage from "./components/CourseDetailsPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <MyCourses />,
      },
      {
        path: "/coursedetails",
        element: <CourseDetailPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/doubts",
        element: <Doubts />,
      },
      { path: "/projects", element: <Project /> },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/assignments",
        element: <Assignment />,
      },
      {
        path: "/notice",
        element: <Notice />,
      },
    ],
  },
]);

function StudentRoutes() {
  return <RouterProvider router={router} />;
}

export default StudentRoutes;
