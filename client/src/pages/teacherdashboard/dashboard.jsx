import React, { useState, useEffect } from 'react';

import { BarChart, Bar, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Bell, Settings, LogOut, Home, Users, BookOpen, ClipboardList, BarChart2, Layout, MessageSquare, Menu } from 'lucide-react';
import RecordsContent from "./record"
import ClassesContent from './class'
import SettingsContent from './setting'
// Sample data for charts
const studentStats = [
  { class: 'Class A', value: 30, avgPoint: 25 },
  { class: 'Class B', value: 45, avgPoint: 35 },
  { class: 'Class C', value: 55, avgPoint: 45 },
  { class: 'Class D', value: 20, avgPoint: 40 },
  { class: 'Class E', value: 60, avgPoint: 50 },
];

// Content components for each section
const HomeContent = () => (
  <>
    {/* Welcome Banner */}
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

    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Student Statistics */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Student Statistic</h3>
          <div className="flex gap-2">
            <button aria-label="Previous month">←</button>
            <span>Sept 2022</span>
            <button aria-label="Next month">→</button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentStats}>
              <Bar dataKey="value" fill="#1e40af" />
              <XAxis dataKey="class" />
              <YAxis />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Progress */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">Class Progress</h3>
        <div className="space-y-4">
          <ProgressItem label="Class A" value={32} count={78} />
          <ProgressItem label="Class B" value={43} count={60} />
          <ProgressItem label="Class C" value={67} count={80} />
          <ProgressItem label="Class D" value={56} count={104} />
        </div>
      </div>

      {/* Upcoming Activities */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Upcoming Activities</h3>
          <button className="text-blue-600 text-sm">See all</button>
        </div>
        <div className="space-y-4">
          <ActivityItem 
            day="31"
            title="Meeting with the YC"
            time="10 A.M - 11 A.M"
            status="Due soon"
          />
          <ActivityItem 
            day="04"
            title="Meeting with the J."
            time="10 A.M - 11 A.M"
            status="Upcoming"
          />
          <ActivityItem 
            day="12"
            title="Class B middle sess.."
            time="10 A.M - 11 A.M"
            status="Upcoming"
            subtitle="Physical science lab"
          />
        </div>
      </div>
    </div>
  </>
);
const sampleCourses = [
    {
      id: 1,
      title: "Mathematics 101",
      description: "Introduction to Basic Mathematics",
      image: "/api/placeholder/300/200",
      lectureCount: 12
    },
    {
      id: 2,
      title: "Physics 201",
      description: "Advanced Physics Concepts",
      image: "/api/placeholder/300/200",
      lectureCount: 8
    },
    {
      id: 3,
      title: "Chemistry 101",
      description: "Basic Chemistry Principles",
      image: "/api/placeholder/300/200",
      lectureCount: 15
    }
  ];
  
  // Sample lectures data - replace with your actual data
  const sampleLectures = [
    {
      id: 1,
      title: "Introduction to Algebra",
      type: "video",
      duration: "45 mins"
    },
    {
      id: 2,
      title: "Linear Equations",
      type: "pdf",
      size: "2.3 MB"
    }
  ];
  

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Updates the time every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Formatting the date and time
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
          <button className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded-lg w-full">
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

const ProgressItem = ({ label, value, count }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span>{label}</span>
      <span className="text-gray-500">{count} Registered</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 rounded-full"
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </div>
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