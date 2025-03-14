    import React, { useState, useEffect, useRef } from 'react';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate
    import { BarChart, Bar, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
    import { Bell, Settings, LogOut, Home, Users, BookOpen, ClipboardList, BarChart2, Layout, MessageSquare, Menu, Calendar, CheckCircle, ChevronRight, User, FileText, Award, HelpCircle, BookOpen as BookOpenIcon } from 'lucide-react';
    import RecordsContent from "./record";
    import ClassesContent from './class';
    import QuizDashboard from "./quiz dashboard/quiz";
    import SettingsContent from './setting';
    import ProfilePage from './profile/ProfilePage';
    import logo from '../../../public/AIGIRI.png';
    import NotificationContent from './NotificationContent';

    const studentStats = [
      { class: 'Class A', value: 30, avgPoint: 25, attendance: 95 },
      { class: 'Class B', value: 45, avgPoint: 35, attendance: 88 },
      { class: 'Class C', value: 55, avgPoint: 45, attendance: 92 },
      { class: 'Class D', value: 20, avgPoint: 40, attendance: 85 },
      { class: 'Class E', value: 60, avgPoint: 50, attendance: 90 },
    ];

    const recentActivities = [
      { day: '21', title: 'Mathematics Test', time: '10:00 AM', status: 'Due soon', subtitle: 'Class A - Algebra' },
      { day: '22', title: 'Parent Meeting', time: '2:00 PM', status: 'Scheduled', subtitle: 'John Smith\'s Parents' },
      { day: '23', title: 'Science Project', time: '11:30 AM', status: 'Due soon', subtitle: 'Class C - Physics' },
    ];
    const HomeContent = () => {
      const navigate = useNavigate();
      const [teacherName, setTeacherName] = useState('Teacher');
      const [newStudents, setNewStudents] = useState(27);
      const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
      
      useEffect(() => {
        // Get teacher name from session storage or use default
        const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
        if (userData.userName) {
          setTeacherName(userData.userName);
        }
        
        // Trigger welcome card animation
        setShowWelcomeAnimation(true);
        
        // Simulate fetching new students count
        const timer = setTimeout(() => {
          // This would be an API call in a real app
          setNewStudents(Math.floor(Math.random() * 30) + 10);
        }, 1500);
        
        return () => clearTimeout(timer);
      }, []);
      
      const handleViewNewStudents = () => {
        navigate('/teacher/students', { state: { filter: 'new' } });
      };
      
      const handleTakeAttendance = () => {
        navigate('/teacher/attendance');
      };

      return (
        <div className="space-y-6">
          {/* Welcome Card with animation */}
          <div 
            className={`bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white p-6 rounded-xl relative overflow-hidden shadow-lg transform transition-all duration-700 ${
              showWelcomeAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 animate-fadeIn">Welcome back, {teacherName}</h2>
              <p className="text-white/90 mb-4 animate-fadeIn animation-delay-200">
                You have <span className="font-bold text-white">{newStudents}</span> new students added to your domain. Please reach out to the
                Head Teacher if you want them excluded from your domain.
              </p>
              <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-300">
                <button 
                  onClick={handleViewNewStudents}
                  className="bg-white text-[#5491CA] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
                >
                  View New Students
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleTakeAttendance}
                  className="bg-[#7670AC] text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Take Attendance
                  <CheckCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3">
              <div className="h-full w-full flex items-center justify-center">
                <Calendar className="h-24 w-24 text-white/30 animate-pulse" />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute top-10 right-20 w-20 h-20 rounded-full bg-white/10"></div>
          </div>

          {/* Stats Grid with animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Total Students', value: '210', icon: <Users className="h-6 w-6" />, change: '+27 this month', color: '#5491CA' },
              { title: 'Average Attendance', value: '92%', icon: <CheckCircle className="h-6 w-6" />, change: '+5% increase', color: '#b1a9f1' },
              { title: 'Classes Today', value: '5', icon: <BookOpen className="h-6 w-6" />, change: '2 remaining', color: '#7670AC' },
              { title: 'Pending Tasks', value: '8', icon: <ClipboardList className="h-6 w-6" />, change: '3 urgent', color: '#5491CA' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border-l-4"
                style={{ borderLeftColor: stat.color, animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <span className="text-sm text-gray-500">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Charts and Activities Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-4 text-[#5491CA]">Class Performance Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentStats}>
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderColor: '#5491CA',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="avgPoint" name="Average Points" fill="#5491CA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attendance" name="Attendance %" fill="#b1a9f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#5491CA]">Upcoming Activities</h3>
                <button className="text-[#5491CA] text-sm hover:text-[#b1a9f1] transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white rounded-lg p-2 h-12 w-12 flex items-center justify-center shadow-sm">
                      {activity.day}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      {activity.subtitle && (
                        <p className="text-sm text-gray-500">{activity.subtitle}</p>
                      )}
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center justify-cente ${activity.status === 'Due soon' ? 'bg-red-200 text-red-700' : 'bg-orange-200 text-orange-700'}`}>
                       {activity.status}
                    </span>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-[#5491CA]">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <ClipboardList className="h-6 w-6" />, label: 'Take Attendance', color: '#5491CA' },
                { icon: <MessageSquare className="h-6 w-6" />, label: 'Message Parents', color: '#b1a9f1' },
                { icon: <BarChart2 className="h-6 w-6" />, label: 'Grade Assignments', color: '#7670AC' },
                { icon: <Calendar className="h-6 w-6" />, label: 'Schedule Class', color: '#5491CA' },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-100 hover:border-[#5491CA] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                  style={{ color: action.color }}
                >
                  {action.icon}
                  <span className="mt-2 text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    };

    const Dashboard = () => {
      const navigate = useNavigate(); // Initialize useNavigate for redirect
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [currentSection, setCurrentSection] = useState('home');
      const [currentDateTime, setCurrentDateTime] = useState(new Date());
      const [loading, setLoading] = useState(true); // To manage loading state
      const [userName, setUserName] = useState('');
      const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
      const profileDropdownRef = useRef(null);

      useEffect(() => {
        // Get user data and update time
        const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
        setUserName(userData.userName || 'Teacher');
        setLoading(false);
        
        const interval = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 1000);
        
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
          if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
            setProfileDropdownOpen(false);
          }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          clearInterval(interval);
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [navigate]);

      const date = currentDateTime.toLocaleDateString(); // "MM/DD/YYYY"
      const time = currentDateTime.toLocaleTimeString(); // "HH:MM:SS AM/PM"

      const renderContent = () => {
        console.log("Current section:", currentSection);
        
        switch (currentSection) {
          case 'classes':
            return <ClassesContent />;
          case 'records':
            return <RecordsContent />;
          case 'notification':
            return <NotificationContent />;
          case 'settings':
            return <SettingsContent />;
          case 'profile':
            return <ProfilePage onBack={() => setCurrentSection('home')} />;
          case 'quiz':
            return <QuizDashboard />;
          default:
            return <HomeContent />;
        }
      };

      const handleSignOut = () => {
        // Clear user data from sessionStorage
        sessionStorage.clear() ; 

        // Redirect the user to the home page
        navigate('/');
      };

      if (loading) {
        // Show a loading spinner while the role check is in progress
        return (
          <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-12 h-12 border-4 border-[#5491CA] border-t-transparent rounded-full animate-spin"></div>
          </div>
        );
      }

      return (
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar with white background */}
          <aside className={`fixed left-0 top-0 h-full w-64 bg-white text-gray-700 p-4 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-20`}>
            <div className="flex items-center gap-3 mb-8 p-2">
              <img src={logo} alt="AIGIRI Logo" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-transparent bg-clip-text">AIGIRI</span>
            </div>

            <nav className="space-y-2">
              <NavItem 
                icon={<Home className="h-5 w-5" />} 
                label="Home" 
                active={currentSection === 'home'}
                onClick={() => setCurrentSection('home')}
              />
              <NavItem 
                icon={<BookOpen className="h-5 w-5" />} 
                label="Classes" 
                active={currentSection === 'classes'}
                onClick={() => setCurrentSection('classes')}
              />
              <NavItem 
                icon={<ClipboardList className="h-5 w-5" />} 
                label="Records" 
                active={currentSection === 'records'}
                onClick={() => setCurrentSection('records')}
              />
              <NavItem
                icon={<Bell className="h-5 w-5" />}
                label="Notifications"
                active={currentSection === 'notification'}
                onClick={() => setCurrentSection('notification')}
              />
              <NavItem 
                icon={<BarChart2 className="h-5 w-5" />} 
                label="Quiz" 
                active={currentSection === 'quiz'}
                onClick={() => setCurrentSection('quiz')}
              />
            </nav>

            <div className="absolute bottom-4 w-full pr-8">
              <div className="p-3 mb-4 rounded-lg bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] flex items-center justify-center text-white font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">Teacher</p>
                  </div>
                </div>
              </div>
              
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 md:ml-64 p-6">
            {/* Mobile Menu Button */}
            <div className="md:hidden mb-4 flex flex-row justify-between items-center w-full">
              <h1 className="text-xl font-bold text-[#5491CA]">Dashboard</h1>
              <button
                className="p-2 bg-white rounded-lg shadow-sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6 text-[#5491CA]" />
              </button>
            </div>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="w-full md:flex-1 mb-4 md:mb-0">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search Class, Documents, Activities..."
                    className="w-full max-w-xl px-4 py-2 rounded-lg border border-gray-200 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 transition-all duration-300"
                    aria-label="Search"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-gray-600 mr-2">
                  <p className="text-sm font-medium">{date}</p>
                  <p className="text-xs">{time}</p>
                </div>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] flex items-center justify-center text-white font-bold hover:shadow-md transition-all duration-300"
                    aria-label="Profile menu"
                  >
                    {userName.charAt(0).toUpperCase()}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{userName}</p>
                        <p className="text-xs text-gray-500">Teacher</p>
                      </div>
                      
                      <div className="py-1">
                        <DropdownItem 
                          icon={<User className="h-4 w-4" />} 
                          label="My Profile" 
                          onClick={() => {
                            setCurrentSection('profile');
                            setProfileDropdownOpen(false);
                          }}
                        />
                        {/* <DropdownItem 
                          icon={<BookOpenIcon className="h-4 w-4" />} 
                          label="My Courses" 
                          onClick={() => {
                            navigate('/teacher/courses');
                            setProfileDropdownOpen(false);
                          }}
                        /> */}
                        {/* <DropdownItem 
                          icon={<FileText className="h-4 w-4" />} 
                          label="My Resources" 
                          onClick={() => {
                            navigate('/teacher/resources');
                            setProfileDropdownOpen(false);
                          }}
                        /> */}
                        {/* <DropdownItem 
                          icon={<Award className="h-4 w-4" />} 
                          label="Certifications" 
                          onClick={() => {
                            navigate('/teacher/certifications');
                            setProfileDropdownOpen(false);
                          }}
                        /> */}
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <DropdownItem 
                          icon={<Settings className="h-4 w-4" />} 
                          label="Settings" 
                          onClick={() => {
                            setCurrentSection('settings');
                            setProfileDropdownOpen(false);
                          }}
                        />
                        {/* <DropdownItem 
                          icon={<HelpCircle className="h-4 w-4" />} 
                          label="Help & Support" 
                          onClick={() => {
                            navigate('/teacher/support');
                            setProfileDropdownOpen(false);
                          }}
                        /> */}
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <DropdownItem 
                          icon={<LogOut className="h-4 w-4" />} 
                          label="Sign Out" 
                          onClick={handleSignOut}
                          className="text-red-600 hover:bg-red-50"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Dynamic Content */}
            {renderContent()}
          </main>
        </div>
      );
    };

    // Helper Components
    const NavItem = ({ icon, label, active, onClick }) => (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300
          ${active 
            ? 'bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 text-[#5491CA] font-medium border-l-4 border-[#5491CA]' 
            : 'text-gray-600 hover:bg-gray-100'}`}
        aria-current={active ? 'page' : undefined}
      >
        <div className={active ? 'text-[#5491CA]' : 'text-gray-500'}>
          {icon}
        </div>
        <span>{label}</span>
      </button>
    );

    const DropdownItem = ({ icon, label, onClick, className = '' }) => (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
      >
        <span className="text-gray-500">{icon}</span>
        <span>{label}</span>
      </button>
    );

    // Add these animations to your global CSS
    const globalStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }

    .animation-delay-200 {
      animation-delay: 0.2s;
    }

    .animation-delay-300 {
      animation-delay: 0.3s;
    }
    `;

    export default Dashboard;
