import { Link, useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { GrResources } from "react-icons/gr";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col p-4 ">
      <h1 className="text-2xl font-bold mb-8 cursor-pointer">EduDash</h1>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-2">
          <i className="fa fa-home"></i>
          <span>My Courses</span>
        </Link>
        <Link to="doubts" className="flex items-center space-x-2">
          <i class="fa fa-question"></i>
          <span>My Doubts</span>
        </Link>
        <Link to="notice" className="flex items-center space-x-2">
          <i class="fa fa-envelope"></i>
          <span>Notice</span>
        </Link>
        <Link to="assignments" className="flex items-center space-x-2">
          <i class="fa fa-book"></i>
          <span>Assignments and Quizzes</span>
        </Link>
        <Link to="resources" className="flex items-center space-x-2">
          <GrResources />
          <span>Study Resources</span>
        </Link>
        <Link to="projects" className="flex items-center space-x-2">
          <span>⚙️</span>
          <span>CapStone Projects & Career Guidance</span>
        </Link>
      </nav>
      <button className="mt-auto text-sm flex items-center space-x-2">
        <RxExit />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;
