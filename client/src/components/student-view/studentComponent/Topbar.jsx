import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { ShoppingCart, LogOut, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [loginHistory, setLoginHistory] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [courseStats, setCourseStats] = useState({ totalCourses: 0, categoryDistribution: {} });

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
  // Copied function: close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const [cartItemCount, setCartItemCount] = useState(0);

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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
      <div className="flex items-center gap-4 w-full md:w-auto">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {/* <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" /> */}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaBell className="text-xl text-gray-700 dark:text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* Shopping Cart */}
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
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 px-3 md:px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={user?.profileImage}
              alt="Profile"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-[#5491CA]"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                {user?.userName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaUser className="text-[#5491CA]" />
                <span className="text-gray-700 dark:text-gray-200">My Profile</span>
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

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
  );
};

export default TopBar;
