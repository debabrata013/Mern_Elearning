import Sidebar from "./components/Sidebar";
import TopBar from "./components/Topbar";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-full">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
