import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { FaHome, FaBook, FaUserGraduate, FaChalkboardTeacher, FaCertificate, FaBullhorn, FaExclamationCircle, FaTags, FaPlusCircle, FaEdit } from 'react-icons/fa';

import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { PlusCircle, Book, Users, DollarSign, TrendingUp, Home, Layout, BookOpen, ClipboardList, Settings, LogOut, Menu,School, ChevronDown } from 'lucide-react';

import ClassesContent from './class'

import JobsContent from './job';
import { useAuth } from '../../context/auth';
import ManageStudent from './ManageStudent';
import ManageTeacher from './ManageTeacher';
import Teacher from './Teacher';
import Student from './Student';
// import AddStudentContent from './Addstudent';

// Sample data for charts
const userActivityData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 3000 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 4500 },
  { name: 'May', users: 6000 },
  { name: 'Jun', users: 5500 }
];

const courseData = [
  { name: 'Web Dev', students: 400 },
  { name: 'Data Science', students: 300 },
  { name: 'Mobile Dev', students: 250 },
  { name: 'AI/ML', students: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Content components for each section
const HomeContent = () => {
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [specializedSubjects, setSpecializedSubjects] = useState(["JAVA", "DataScience", "Backend"]);
  const [newSubject, setNewSubject] = useState("");
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    teacher: ''
  });

  const handleAddSubject = () => {
    if (newSubject && specializedSubjects.length < 10) {
      setSpecializedSubjects([...specializedSubjects, newSubject]);
      setNewSubject("");
    }
  };

  const handleCourseInputChange = (e) => {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value
    });
  };
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  return (
    <>
      {/* Welcome Banner */}
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Main Content Section */}
        <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Overview Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">$53,000</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-500">Active Users</p>
                <p className="text-2xl font-bold">2,300</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Book className="text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="text-purple-500" />
              </div>
              <div>
                <p className="text-gray-500">Enrollment Rate</p>
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow hidden lg:block">
              <h2 className="text-xl font-semibold mb-4">User Activity</h2>
              <LineChart width={600} height={300} data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" animationDuration={2000} />
              </LineChart>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hidden lg:block">
              <h2 className="text-xl font-semibold mb-4">Course Enrollment Distribution</h2>
              <BarChart width={600} height={300} data={courseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#1e3a8a" barSize={40} radius={[10, 10, 0, 0]} />
                <Bar dataKey="students" fill="#3b82f6" barSize={30} radius={[10, 10, 0, 0]} />
                <Bar dataKey="students" fill="#60a5fa" barSize={20} radius={[10, 10, 0, 0]} />
              </BarChart>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Course Categories</h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={courseData}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="students"
                  animationDuration={2000}
                >
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Book size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">New Course Added</p>
                    <p className="text-sm text-gray-500">Web Development Bootcamp</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users size={16} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">New Teacher Joined</p>
                    <p className="text-sm text-gray-500">Sarah Johnson</p>
                  </div>
                </div>
              </div>
            </div>

            {/* New Cards for Total Instructors and Total Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaChalkboardTeacher className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-gray-500">Total Instructors</p>
                  <p className="text-2xl font-bold">150</p> {/* Replace with dynamic data if available */}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <FaUserGraduate className="text-pink-500" />
                </div>
                <div>
                  <p className="text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold">3,200</p> {/* Replace with dynamic data if available */}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Teacher Modal */}
        {isTeacherModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">Create Teacher</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    placeholder="Enter username"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    placeholder="Enter password"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Specialized Subject</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Enter subject"
                  />
                  <button
                    type="button"
                    className="mt-2 text-blue-500"
                    onClick={handleAddSubject}
                  >
                    Add Subject
                  </button>
                </div>

                <div className="mb-4">
                  <button
                    type="button"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                    onClick={() => setIsTeacherModalOpen(false)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { logout } = useAuth();
  

  const renderContent = () => {
    switch (currentSection) {
      case 'course-add':
        return <ClassesContent />;
      case 'course-edit':
        return <EditCourseContent />;
      case 'student-add':
        return <Student/>;
      case 'student-edit':
        return <ManageStudent />;
      case 'instructor-add':
        return <Teacher />;
      case 'instructor-edit':
        return <ManageTeacher />;
      case 'certificate':
        return <CertificateContent />;
      case 'announcement':
        return <AnnouncementContent />;
      case 'complain':
        return <ComplainContent />;
      case 'coupon-add':
        return <AddCouponContent />;
      case 'coupon-view':
        return <ViewCouponsContent />;
      case 'jobs':
        return <JobsContent />;
      default:
        return <HomeContent />;
    }
  };

  const handleLogout = () => {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    
    logout();
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-blue-600 text-white p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-20`}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Layout className="h-6 w-6" />
            EduDash Admin
          </h1>
        </div>
        
        <nav className="space-y-2">
          <NavItem 
            icon={<FaHome />} 
            label="Dashboard" 
            active={currentSection === 'home'}
            onClick={() => setCurrentSection('home')}
          />
          
          <NavDropdown
            icon={<FaBook />}
            label="Manage Course"
            active={currentSection.startsWith('course')}
            items={[
              { 
                value: 'course-add',
                label: 'Add Course',
                icon: <FaPlusCircle className="w-4 h-4" />
              },
              {
                value: 'course-edit',
                label: 'Edit Course',
                icon: <FaEdit className="w-4 h-4" />
              }
            ]}
            onItemClick={(value) => setCurrentSection(value)}
          />

          <NavDropdown
            icon={<FaUserGraduate />}
            label="Manage Student"
            active={currentSection.startsWith('student')}
            items={[
              { 
                value: 'student-add',
                label: 'Add Student',
                icon: <FaPlusCircle className="w-4 h-4" />
              },
              {
                value: 'student-edit',
                label: 'Edit Student',
                icon: <FaEdit className="w-4 h-4" />
              }
            ]}
            onItemClick={(value) => setCurrentSection(value)}
          />

          <NavDropdown
            icon={<FaChalkboardTeacher />}
            label="Manage Instructor"
            active={currentSection.startsWith('instructor')}
            items={[
              { 
                value: 'instructor-add',
                label: 'Add Instructor',
                icon: <FaPlusCircle className="w-4 h-4" />
              },
              {
                value: 'instructor-edit',
                label: 'Edit Instructor',
                icon: <FaEdit className="w-4 h-4" />
              }
            ]}
            onItemClick={(value) => setCurrentSection(value)}
          />

          <NavItem 
            icon={<FaCertificate />} 
            label="Certificate" 
            active={currentSection === 'certificate'}
            onClick={() => setCurrentSection('certificate')}
          />

          <NavItem 
            icon={<FaBullhorn />} 
            label="Announcement" 
            active={currentSection === 'announcement'}
            onClick={() => setCurrentSection('announcement')}
          />

          <NavItem 
            icon={<FaExclamationCircle />} 
            label="Complain" 
            active={currentSection === 'complain'}
            onClick={() => setCurrentSection('complain')}
          />

          <NavDropdown
            icon={<FaTags />}
            label="Coupon"
            active={currentSection.startsWith('coupon')}
            items={[
              { 
                value: 'coupon-add',
                label: 'Add Coupon',
                icon: <FaPlusCircle className="w-4 h-4" />
              },
              {
                value: 'coupon-view',
                label: 'View Coupons',
                icon: <FaEdit className="w-4 h-4" />
              }
            ]}
            onItemClick={(value) => setCurrentSection(value)}
          />

          <NavItem 
            icon={<FaTags />} 
            label="Jobs" 
            active={currentSection === 'jobs'}
            onClick={() => setCurrentSection('jobs')}
          />
        </nav>
        
        <div className="absolute bottom-4 w-full pr-8">
          <button className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded-lg w-full" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6">
        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4 flex flex-row justify-between items-center w-full">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
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
     hey
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

// Memoized dropdown item component
const DropdownItem = memo(({ item, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 hover:bg-blue-700 transition-colors duration-200
      flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
  >
    {item.icon}
    {item.label}
  </button>
));

DropdownItem.displayName = 'DropdownItem';

// Optimized NavDropdown component
const NavDropdown = ({ icon, label, items, active, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = useCallback((value) => {
    onItemClick(value);
    setIsOpen(false);
  }, [onItemClick]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center justify-between w-full p-2 rounded-lg 
          transition-colors duration-200
          ${active ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 
            ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <div 
        className={`
          absolute left-full top-0 ml-2 w-48 
          md:left-0 md:top-full md:mt-1 md:ml-0
          ${isOpen ? 'block' : 'hidden'}
          bg-blue-500 rounded-lg shadow-lg 
          z-50
          transform transition-all duration-200 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-button"
      >
        <div className="py-1">
          {items.map((item, index) => (
            <DropdownItem
              key={item.value || index}
              item={item}
              onClick={() => handleItemClick(item.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;