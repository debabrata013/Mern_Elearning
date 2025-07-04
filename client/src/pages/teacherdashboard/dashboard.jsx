    import React, { useState, useEffect, useRef } from 'react';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate
    import { BarChart, Bar, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
    import { Bell, Settings, LogOut, Home, Users, BookOpen, ClipboardList, BarChart2, Layout, MessageSquare, Menu, Calendar, CheckCircle, ChevronRight, User, FileText, Award, HelpCircle, BookOpen as BookOpenIcon, Plus, Check, Clock, Trash2, X, ChevronDown } from 'lucide-react';
    import RecordsContent from "./record";
    import ClassesContent from './class';
    import QuizDashboard from "./quiz dashboard/quiz";
    import SettingsContent from './setting';
    import ProfilePage from './profile/ProfilePage';
    import logo from '../../../public/aigiri logo.png';
    import NotificationContent from './NotificationContent';
    import Doubts from "./Doubts"
    import axiosInstance from '@/api/axiosInstance';
    import moment from 'moment';
import axios from "axios";
import {
  AreaChart, Area, CartesianGrid
} from "recharts";

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
      const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user")) 
    const [loginHistory, setLoginHistory] = useState({});
    const [courseStats, setCourseStats] = useState({ totalCourses: 0, categoryDistribution: {} });
   
     const user = JSON.parse(localStorage.getItem('user'));
 const userId=user._id;
  let pandingtask=tasks.length;
      useEffect(() => {
      
        
        // Get teacher name from session storage or use default
        
        if (userData.userName) {
          setTeacherName(userData.userName);
        }
  
        setShowWelcomeAnimation(true);
        const fetchTasks = async () => {
          try {
            const response = await axiosInstance.get(`/api/todos/pending/${userData._id}`); // Replace with your API endpoint
        
            setTasks(response.data);
           

          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
    
        fetchTasks();
       
       
       
       
      
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



      // const handleViewNewStudents = () => {
      //   navigate('/teacher/students', { state: { filter: 'new' } });
      // };
      
      // const handleTakeAttendance = () => {
      //   navigate('/teacher/attendance');
      // };

      const handleAddTask = async (e) => {
        e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await axiosInstance.post('/api/todos/create', { todo: newTask , userId: userData._id});
      setTasks(response.data.todos);
      setNewTask('');
      setShowAddTask(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
        };
        

      
      // const toggleTask = async (id) => {
      //   try {
      //     const task = tasks.find((task) => task.id === id);
      //     const updatedTask = { ...task, completed: !task.completed };
      //     await axios.put(`/api/todos/${id}`, updatedTask);
      //     setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      //   } catch (error) {
      //     console.error('Error toggling task:', error);
      //   }
      // };
    
      // Delete a task
      const deleteTask = async (id) => {
        try {
           const res=await axiosInstance.delete(`/api/todos/delete/${userData._id}/${id}`); 
            if(res.status===200){
              console.log(res.data.message);
              
              setTasks(res.data.todos);
            }
          
        } catch (error) {
          console.error('Error deleting task:', error);
        }
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
              // { title: 'Total Students', value: '210', icon: <Users className="h-6 w-6" />, change: '+27 this month', color: '#5491CA' },
              // { title: 'Average Attendance', value: '92%', icon: <CheckCircle className="h-6 w-6" />, change: '+5% increase', color: '#b1a9f1' },
              // { title: 'Classes Today', value: '5', icon: <BookOpen className="h-6 w-6" />, change: '2 remaining', color: '#7670AC' },
              { title: 'Pending Tasks', value: pandingtask, icon: <ClipboardList className="h-6 w-6" />,  color: '#5491CA' },
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
           <div className="bg-white p-6 rounded-xl shadow-sm  dark:bg-gray-700/50 rounded-xl p-4 md:p-6">
               <h3 className="text-lg font-semibold mb-4 text-[#5491CA] dark:text-gray-100">
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
            {/* Todo Section - Replacing Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#5491CA]">My Tasks</h3>
                <button 
                  onClick={() => setShowAddTask(true)}
                  className="text-white text-sm bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] px-3 py-1.5 rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>

              {/* Add Task Form Modal */}
              {showAddTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#5491CA]">Add New Task</h3>
                      <button
                        onClick={() => setShowAddTask(false)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleAddTask}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-1">
                            Task Description
                          </label>
                          <input
                            id="task"
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter your task..."
                            className="w-full px-4 py-2 rounded-lg border border-[#5491CA]/20 focus:outline-none focus:ring-2 focus:ring-[#5491CA]/20 focus:border-[#5491CA]"
                            autoFocus
                          />
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setShowAddTask(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Task
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Tasks List */}
              {/* Tasks List */}
<div className="space-y-4" key={tasks.length}>
  {tasks.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      <p>No tasks yet. Add your first task!</p>
    </div>
  ) : (
    tasks.map((task, index) => (
      <div 
        key={task.id || task._id || index} // Ensure a unique key
        className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
      >
        <button
          onClick={() => toggleTask(task.id)}
          className={`h-12 w-12 rounded-lg flex items-center justify-center shadow-sm transition-all
            ${task.completed 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white'}`}
        >
          
            <Clock className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h4 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {task.todo}
          </h4>
      
   
      
          
          <p className="text-sm text-gray-500">{moment(`${task.createdAt}`).format("MMMM Do YYYY, h:mm:ss A")}</p>
        </div>
        <button
          onClick={() => deleteTask(task._id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))
  )}
</div>
            </div>
          </div>

          {/* Quick Actions */}
          
        </div>
      );
    };

    const Dashboard = () => {
      const navigate = useNavigate();
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [currentSection, setCurrentSection] = useState('home');
      const [loading, setLoading] = useState(true);
      const [userName, setUserName] = useState('');
      const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
      const profileDropdownRef = useRef(null);

      // Close sidebar when navigating to a new section
      useEffect(() => {
        setSidebarOpen(false);
      }, [currentSection]);

      useEffect(() => {
        // Get user data and update time
        const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
        setUserName(userData.userName || 'Teacher');
        setLoading(false);
        
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
          if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
            setProfileDropdownOpen(false);
          }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [navigate]);

      const renderContent = () => {
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
          // case 'quiz':
          //   return <QuizDashboard />;
          case 'doubts':
            return <Doubts />;
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
          <div className="flex items-center mb-4">
  <img className="h-11 w-auto" src={logo} alt="logo" />
  
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
              {/* <NavItem 
                icon={<BarChart2 className="h-5 w-5" />} 
                label="Quiz" 
                active={currentSection === 'quiz'}
                onClick={() => setCurrentSection('quiz')}
              /> */}
              <NavItem
              icon={<HelpCircle className="h-5 w-5" /> }
              label="Doubts"
              active={currentSection === 'doubts'}
              onClick={() => setCurrentSection('doubts')}
              />

            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 md:ml-64 p-6">
  {/* Mobile Top Section */}
  <div className="md:hidden mb-4 flex flex-col gap-3 w-full">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#5491CA]">Dashboard</h1>
      <button
        className="p-2 bg-white rounded-lg shadow-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6 text-[#5491CA]" />
      </button>
    </div>

    {/* Mobile Profile (right aligned) */}
    <div className="flex justify-end">
      <div className="relative" ref={profileDropdownRef}>
        <button 
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          aria-label="Profile menu"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] flex items-center justify-center text-white font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">Teacher</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {profileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
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
  </div>

  {/* Header for desktop */}
  <header className="hidden md:flex flex-row justify-between items-center mb-8">
    <div className="w-full md:flex-1 mb-4 md:mb-0">
      <div className="relative">
        <p className="text-xl font-semibold text-[#5491CA]">Teacher Dashboard</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      {/* Desktop Profile Dropdown */}
      <div className="relative" ref={profileDropdownRef}>
        <button 
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          aria-label="Profile menu"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] flex items-center justify-center text-white font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">Teacher</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {profileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
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
        className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
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
