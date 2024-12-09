import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { BarChart, Bar, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Bell, Settings, LogOut, Home, Users, BookOpen, ClipboardList, BarChart2, Layout, MessageSquare, Menu } from 'lucide-react';
import RecordsContent from "./record";
import ClassesContent from './class';
import SettingsContent from './setting';

const studentStats = [
  { class: 'Class A', value: 30, avgPoint: 25 },
  { class: 'Class B', value: 45, avgPoint: 35 },
  { class: 'Class C', value: 55, avgPoint: 45 },
  { class: 'Class D', value: 20, avgPoint: 40 },
  { class: 'Class E', value: 60, avgPoint: 50 },
];

const HomeContent = () => (
  <div className="bg-blue-600 text-white p-6 rounded-xl mb-8 relative overflow-hidden">
    <div className="relative z-10">
      <h2 className="text-2xl font-bold mb-2">Welcome back, Ayodele Irepodun</h2>
      <p className="text-blue-100">
        You have 27 new student added to your domain. Please reach out to the
        Head Teacher if you want them excluded from your domain.
      </p>
    </div>
    <div className="absolute right-0 top-0 h-full w-1/3">
      <img 
        src="/api/placeholder/400/300" 
        alt="" 
        className="h-full w-full object-cover"
      />
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirect
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true); // To manage loading state

  // useEffect(() => {
  //   const userData = JSON.parse(sessionStorage.getItem("userData"));

  //   if (!userData || userData.role !== "teacher") {
  //     navigate('/error'); // Redirect to error page if not authorized
  //   } else {
  //     setLoading(false); // If role is teacher, proceed with loading content
  //   }

  //   const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000); // Update the time every second

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, [navigate]);

  const date = currentDateTime.toLocaleDateString(); // "MM/DD/YYYY"
  const time = currentDateTime.toLocaleTimeString(); // "HH:MM:SS AM/PM"

  const renderContent = () => {
    switch (currentSection) {
      case 'classes':
        return <ClassesContent />;
      case 'records':
        return <RecordsContent />;
      case 'settings':
        return <SettingsContent />;
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

  // if (loading) {
  //   // Show a loading spinner while the role check is in progress
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-blue-600 text-white p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-20`}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Layout className="h-6 w-6" />
            EduDash
          </h1>
        </div>

        <nav className="space-y-2">
          <NavItem 
            icon={<Home />} 
            label="Home" 
            active={currentSection === 'home'}
            onClick={() => setCurrentSection('home')}
          />
          <NavItem 
            icon={<BookOpen />} 
            label="Classes" 
            active={currentSection === 'classes'}
            onClick={() => setCurrentSection('classes')}
          />
          <NavItem 
            icon={<ClipboardList />} 
            label="Records" 
            active={currentSection === 'records'}
            onClick={() => setCurrentSection('records')}
          />
          <NavItem 
            icon={<Settings />} 
            label="Settings" 
            active={currentSection === 'settings'}
            onClick={() => setCurrentSection('settings')}
          />
        </nav>

        <div className="absolute bottom-4 w-full pr-8">
          <button className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded-lg w-full" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6">
        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4 flex flex-row justify-between items-center w-full">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            className="p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-blue-600" />
          </button>
        </div>

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="w-full md:flex-1 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="search"
                placeholder="Search Class, Documents, Activities..."
                className="w-full max-w-xl px-4 py-2 rounded-lg border"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-300" aria-label="User profile" />
            <div className="text-gray-600">
              <p>{date}</p>
              <p>{time}</p>
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
    className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors
      ${active ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
    aria-current={active ? 'page' : undefined}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const ActivityItem = ({ day, title, time, status, subtitle }) => (
  <div className="flex gap-4">
    <div className="bg-blue-600 text-white rounded-lg p-2 h-12 w-12 flex items-center justify-center">
      {day}
    </div>
    <div className="flex-1">
      <h4 className="font-medium">{title}</h4>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      <p className="text-sm text-gray-500">{time}</p>
    </div>
    <span className={`text-sm ${status === 'Due soon' ? 'text-red-500' : 'text-orange-500'}`}>
      {status}
    </span>
  </div>
);

export default Dashboard;
