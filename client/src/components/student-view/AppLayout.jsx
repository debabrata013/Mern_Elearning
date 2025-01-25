import Sidebar from "./studentComponent/Sidebar";
import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./StudentViewCommonHeader";
function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-full">
        <StudentViewCommonHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
