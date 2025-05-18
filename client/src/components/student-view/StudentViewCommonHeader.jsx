import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {PieChart, Pie, Cell} from 'recharts';
import Sidebar from './studentComponent/Sidebar';
import axios from 'axios';
import { 
  GraduationCap, 
  BookOpen, 
  Bell, 
  Book,
  User,
  ShoppingCart,
  Search,
  Clock,
  Medal,
  BarChart3,
  Calendar,
  BookMarked,
  Trophy,
  MessageSquare,
  Award,
  LogOut,
  Monitor,
  FileText,
  Users,Layers ,
  Menu
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar 
} from "recharts";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthProvider } from '@/context/auth';



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>{`Progress: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [loginHistory, setLoginHistory] = useState({});
  const [courseStats, setCourseStats] = useState({ totalCourses: 0, categoryDistribution: {} });
 

  const user = JSON.parse(localStorage.getItem('user'));
 const userId=user._id;
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.clear() ; 

    // Redirect the user to the home page
    navigate('/');
  };

  // Mock data for quick stats
  const quickStats = {
    coursesProgress: 85,
    assignmentsDue: 3,
    upcomingQuizzes: 2,
    attendanceRate: 95
  };

  // Mock data for achievements
  const achievements = [
    { id: 1, title: 'Perfect Attendance', icon: <Award className="h-6 w-6 text-yellow-500" />, progress: 90 },
    { id: 2, title: 'Quiz Master', icon: <Trophy className="h-6 w-6 text-purple-500" />, progress: 75 },
    { id: 3, title: 'Assignment Ace', icon: <Medal className="h-6 w-6 text-blue-500" />, progress: 85 }
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        

        // 1. Fetch login history
        const loginRes = await axios.get(`http://localhost:4400/api/dashboard/login-history/${userId}`);
        setLoginHistory(loginRes.data);

        // 2. Fetch course stats
        const courseRes = await axios.get(`http://localhost:4400/api/dashboard/course-stats/${userId}`);
        setCourseStats(courseRes.data);

     
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
       
      }
    };

    fetchDashboardData();
  }, [userId]);


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#5491CA] text-white shadow-lg hover:bg-[#467bb0] transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar backdrop for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 ${
          isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-[280px]'
      }`}>
        <div className="p-4 md:p-8">
          {/* Top Bar with Search and Quick Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              )}
              
              
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
              {/* Notifications */}
              <div className="relative">
              
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {/* Add your notifications list here */}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button 
                onClick={() => navigate('/cart')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={handleProfileClick} className="flex items-center gap-3 px-3 md:px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" >
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-[#5491CA]"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">{user.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
                  </div>
                </button>


                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaUser className="text-[#5491CA]" />
                      <span className="text-gray-700 dark:text-gray-200">My Profile</span>
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

                    {/* Logout Button */}
                    <button
                      className="flex items-center gap-3 text-red-600 hover:text-red-800 px-4 py-2 w-full transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

   
          {/* Main Content Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Learning Progress */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {/* 📈 Login History Chart */}
  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Login Activity (Last 30 days)
    </h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={Object.entries(loginHistory).map(([date, count]) => ({ date, count }))}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#5491CA" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* 📊 Course Category Distribution */}
  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Course Category Stats
    </h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={Object.entries(courseStats.categoryDistribution).map(([category, value]) => ({
              name: category,
              value,
            }))}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            dataKey="value"
          >
            {Object.keys(courseStats.categoryDistribution).map((_, index) => (
              <Cell key={`cell-${index}`} fill={['#5491CA', '#7670AC', '#F59E0B', '#10B981', '#EC4899'][index % 5]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Add these animations to your global CSS
const globalStyles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}
`;

export default StudentDashboard;