import { Link, useLocation } from "react-router-dom";
import logo from '../../../../../client/public/AIGIRI.png';
import { 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Trophy,
  BriefcaseBusiness,
  LogOut 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); 

  const links = [
    { path: "/abo", icon: <BookOpen className="h-5 w-5" />, label: "Home" },
    { path: "/abca", icon: <Calendar className="h-5 w-5" />, label: "Courses" },
    { path: "/abas", icon: <BarChart3 className="h-5 w-5" />, label: "Assignment" },
    { path: "/abcd", icon: <Trophy className="h-5 w-5" />, label: "Doubts" },
    {path:"/jobs", icon: <BriefcaseBusiness className="h-5 w-5" />, label: "Jobs"},
  ];

  const handleLogout = () => {
    // Clear all cookies properly
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });

    // Clear local storage & session storage
    localStorage.clear();
    sessionStorage.clear();

    // Implement your logout logic (redirecting to login page or API call)
    if (typeof logout === "function") {
      logout();  // Ensure `logout` function exists
    } else {
      console.warn("Logout function is not defined.");
    }

    // Redirect to login page after logout (optional)
    window.location.href = "/login";
  };

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <img src={logo} alt="AIGIRI Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-[#7670AC]">AIGIRI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
              location.pathname === link.path
                ? "text-[#7670AC] bg-[#7670AC]/10 font-semibold"
                : "text-gray-700 hover:text-[#5491CA] hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-800 w-full" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
