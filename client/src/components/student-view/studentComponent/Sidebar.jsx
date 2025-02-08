import { Link, useLocation } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Trophy, 
  MessageSquare, 
  LogOut 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); // Get current route

  // Navigation links data
  const links = [
    { path: "/abo", icon: <BookOpen className="h-5 w-5" />, label: "Home" },
    { path: "/abca", icon: <Calendar className="h-5 w-5" />, label: "Courses" },
    { path: "/abas", icon: <BarChart3 className="h-5 w-5" />, label: "Assignment" },
    { path: "/abcd", icon: <Trophy className="h-5 w-5" />, label: "Doubts" },
    // { path: "/discussions", icon: <MessageSquare className="h-5 w-5" />, label: "Discussions" },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">LMS Learn</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
              location.pathname === link.path
                ? "text-blue-600 bg-blue-100 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-800 w-full">
          <LogOut className="h-5 w-5 " />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
