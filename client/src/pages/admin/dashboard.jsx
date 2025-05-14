  import React, { useState, useEffect, useCallback, useRef, memo, useMemo  } from 'react';
  import { FaHome, FaBook, FaUserGraduate,FaBriefcase,FaEnvelopeOpenText, FaChalkboardTeacher, FaCertificate, FaBullhorn, FaExclamationCircle, FaTags, FaPlusCircle, FaEdit } from 'react-icons/fa';

  import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, BarChart, Bar, PieChart, Pie, Cell,Legend  } from 'recharts';
  import { PlusCircle, Book, Users, DollarSign, TrendingUp, Home, Layout, BookOpen, ClipboardList, Settings, LogOut, Menu,School, ChevronDown } from 'lucide-react';

  import CertificateContent from "./certificate/certificate";
  import AnnouncementContent from "./anouncement/anouncement";
  import CouponContent from "./coupon/coupon";
  import ComplainContent from "./tickets/ticket";
  import ClassesContent from './class'
  import JobsContent from './job';
  import { useAuth } from '../../context/auth';
  import ManageStudent from './ManageStudent';
  import ManageTeacher from './ManageTeacher';
  import Teacher from './Teacher';
  import Student from './Student';
  import Queries from './queries';
  import logo from "../../../../client/public/aigiri logo.png";
  import axios from 'axios';
  import ProfileContent from './profile/ProfileContent';
  import CourseEditPage from './courseEdit';
  import EditAnnouncement from '../admin/anouncement/viewannouncement';
import CourseEnrollmentGraph from './courseEnrollmentgraph';
  // import Profile from "./profile";

  // Sample data for charts


  const courseData = [
    { name: 'Web Dev', students: 400 },
    { name: 'Data Science', students: 300 },
    { name: 'Mobile Dev', students: 250 },
    { name: 'AI/ML', students: 200 }
  ];


const COLORS = ['#FFD166', '#4ECDC4'];
const InstructorStudentStats = ({ totalteacher, totalstudent }) => {
  const safeTotalTeacher = Number(totalteacher) || 0;
  const safeTotalStudent = Number(totalstudent) || 0;

  const data = [
    { name: 'Instructors', value: safeTotalTeacher },
    { name: 'Students', value: safeTotalStudent },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-400">
      <h2 className="text-lg font-semibold text-[#5491CA] mb-4">User Distribution</h2>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};


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

    // the updated api call for the top data
    const [revenue, setRevenue] = useState(null);
    const [activeUsers, setActiveUsers] = useState(null);
    const [totalCourses, setTotalCourses] = useState(null);
    const [totalstudent, setTotalstudent] = useState(null);
    const [totalteacher, setTotalTeacher] = useState(null);
    // const [enrollmentRate, setEnrollmentRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const [userActivityData, setUserActivityData] = useState([]);
    const fetchUserActivity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4400/api/analytics/analytics/login-last-6-months"
        );

        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        // Convert backend data to chart-friendly format
        const formatted = response.data.monthlyLoginStats.map((entry) => ({
          name: `${monthNames[entry.month - 1]} ${entry.year}`,
          users: entry.count,
        }));

        setUserActivityData(formatted);
       
      } catch (err) {
        console.error("Failed to fetch user activity", err);
      }
    };

    // Fetch data from API
    useEffect(() => {
       fetchUserActivity();
      
       
      const fetchData = async () => {
        try {
          const student = await axios.get("http://localhost:4400/data/totalstudent");
          const activeUsersResponse = await axios.get("http://localhost:4400/data/totaluser");
          const totalCoursesResponse = await axios.get("http://localhost:4400/data/totalcourse");
          // const enrollmentRateResponse = await axios.get("YOUR_ENROLLMENT_RATE_API_URL");
          const totalteacher=await axios.get("http://localhost:4400/data/totalteacher")

          setRevenue(1200);
          setTotalstudent(student.data);
          setActiveUsers(activeUsersResponse.data);
          setTotalCourses(totalCoursesResponse.data);
          setTotalTeacher(totalteacher.data);
          // setEnrollmentRate(12.5);
        } catch (err) {
          setError("Failed to load data");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading)
      return (
        <div className="flex items-center justify-center h-screen bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    
    if (error) return <p>{error}</p>;


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
    {/* Revenue */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 border-l-4 border-[#FF6B6B]">
      <div className="bg-[#FF6B6B]/10 p-3 rounded-full">
        <DollarSign className="text-[#FF6B6B]" />
      </div>
      <div>
        <p className="text-gray-500">Revenue</p>
        <p className="text-2xl font-bold">${revenue}</p>
      </div>
    </div>

    {/* Active Users */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 border-l-4 border-[#4ECDC4]">
      <div className="bg-[#4ECDC4]/10 p-3 rounded-full">
        <Users className="text-[#4ECDC4]" />
      </div>
      <div>
        <p className="text-gray-500">Active Users</p>
        <p className="text-2xl font-bold">{activeUsers}</p>
      </div>
    </div>

    {/* Total Courses */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 border-l-4 border-[#FFD166]">
      <div className="bg-[#FFD166]/10 p-3 rounded-full">
        <Book className="text-[#FFD166]" />
      </div>
      <div>
        <p className="text-gray-500">Total Courses</p>
        <p className="text-2xl font-bold">{totalCourses}</p>
      </div>
    </div>

    {/* Total Login User */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 border-l-4 border-[#6A0572]">
      <div className="bg-[#6A0572]/10 p-3 rounded-full">
        <TrendingUp className="text-[#6A0572]" />
      </div>
      <div>
        <p className="text-gray-500">Total login user</p>
        <p className="text-2xl font-bold">
          {userActivityData[0]?.users || 0} {/* Display the first month's user count */}
          {console.log(userActivityData)}
          
        </p>
      </div>
    </div>
  </div>

  {/* Charts Section */}
  <div className="lg:col-span-2 space-y-4">
    {/* User Activity Chart */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-[#5491CA]">User Activity</h2>
      <LineChart width={600} height={300} data={userActivityData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#5491CA" />
        <YAxis stroke="#5491CA" />
        <Tooltip contentStyle={{ borderRadius: '8px' }} />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#5491CA"
          strokeWidth={3}
          dot={{ fill: '#5491CA', r: 6 }}
          activeDot={{ fill: '#b1a9f1', r: 8, strokeWidth: 0 }}
          animationDuration={2000}
        />
      </LineChart>
    </div>

    {/* Course Enrollment Graph */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-[#5491CA]">Course Enrollment</h2>
      <CourseEnrollmentGraph />
    </div>
  </div>

  {/* Right Sidebar */}
  <div className="space-y-4">
    {/* Instructor & Student Stats */}
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <InstructorStudentStats totalteacher={totalteacher} totalstudent={totalstudent} />
    </div>
  </div>
</main>


          {/* Teacher Modal */}
          {isTeacherModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-[#5491CA]">Create Teacher</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      placeholder="Enter username"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Specialized Subject</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="Enter subject"
                    />
                    <button
                      type="button"
                      className="mt-2 text-[#5491CA] hover:text-[#b1a9f1] transition-colors"
                      onClick={handleAddSubject}
                    >
                      Add Subject
                    </button>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <button
                      type="button"
                      className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                      onClick={() => setIsTeacherModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white p-2 rounded-lg hover:shadow-lg transition-all"
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
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const { user, logout } = useAuth();
    
    // Close sidebar when navigating to a new section
    useEffect(() => {
      setSidebarOpen(false);
    }, [currentSection]);

    // Close profile menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
          setProfileMenuOpen(false);
        }
      };

      if (profileMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [profileMenuOpen]);

    const renderContent = () => {
      switch (currentSection) {
        case 'course-add':
          return <ClassesContent />;
        case 'course-edit':
          return <CourseEditPage />;
        case 'student-add':
          return <Student/>;
        case 'student-edit':
          return <ManageStudent />;
        case 'instructor-add':
          return <Teacher />;
        case 'instructor-edit':
          return <ManageTeacher />;
        // case 'certificate':
        //   return <CertificateContent />;
        case 'announcement-add':
          return <AnnouncementContent />;
        case 'announcement-edit':
          return <EditAnnouncement />;
        
        case 'jobs':
          return <JobsContent />;
        case 'profile':
          return <ProfileContent />;
        case 'queries':
          return <Queries/>;
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
        {/* Sidebar - Now white with blue text */}
        <aside className={`fixed left-0 top-0 h-full w-64 bg-white text-[#5491CA] p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-20 shadow-lg`}>
        <div className="flex items-center mb-4">
  <img className="h-11 w-auto" src={logo} alt="logo" />
  <span className="text-3xl font-bold tracking-wide text-[#7670AC] relative top-[5px] font-poppins">
    IGIRI
  </span>
</div>

          
          <nav className="space-y-2">
            <NavItem 
              icon={<FaHome className="text-[#5491CA]" />} 
              label="Dashboard" 
              active={currentSection === 'home'}
              onClick={() => setCurrentSection('home')}
            />
            
            <NavDropdown
              icon={<FaBook className="text-[#5491CA]" />}
              label="Manage Course"
              active={currentSection.startsWith('course')}
              items={[
                { 
                  value: 'course-add',
                  label: 'Add Course',
                  icon: <FaPlusCircle className="w-4 h-4 text-[#5491CA]" />
                },
                {
                  value: 'course-edit',
                  label: 'Edit Course',
                  icon: <FaEdit className="w-4 h-4 text-[#5491CA]" />
                }
              ]}
              onItemClick={(value) => setCurrentSection(value)}
            />

            <NavDropdown
              icon={<FaUserGraduate className="text-[#5491CA]" />}
              label="Manage Student"
              active={currentSection.startsWith('student')}
              items={[
                { 
                  value: 'student-add',
                  label: 'Add Student',
                  icon: <FaPlusCircle className="w-4 h-4 text-[#5491CA]" />
                },
                {
                  value: 'student-edit',
                  label: 'Edit Student',
                  icon: <FaEdit className="w-4 h-4 text-[#5491CA]" />
                }
              ]}
              onItemClick={(value) => setCurrentSection(value)}
            />

            <NavDropdown
              icon={<FaChalkboardTeacher className="text-[#5491CA]" />}
              label="Manage Instructor"
              active={currentSection.startsWith('instructor')}
              items={[
                { 
                  value: 'instructor-add',
                  label: 'Add Instructor',
                  icon: <FaPlusCircle className="w-4 h-4 text-[#5491CA]" />
                },
                {
                  value: 'instructor-edit',
                  label: 'Edit Instructor',
                  icon: <FaEdit className="w-4 h-4 text-[#5491CA]" />
                }
              ]}
              onItemClick={(value) => setCurrentSection(value)}
            />
            <NavDropdown 
              icon={<FaBullhorn className="text-[#5491CA]" />} 
              label="Announcement" 
              active={currentSection.startsWith('announcement')}
              items={[
                {
                  value: 'announcement-add',
                  label: 'Add Announcement',
                  icon: <FaPlusCircle className="w-4 h-4 text-[#5491CA]" />
                },
                {
                  value: 'announcement-edit',
                  label: 'View Announcement',
                  icon: <FaEdit className="w-4 h-4 text-[#5491CA]" />
                }
              ]}
              onItemClick={(value) => setCurrentSection(value)}
            />
            {/* <NavItem 
              icon={<FaCertificate className="text-[#5491CA]" />} 
              label="Certificate" 
              active={currentSection === 'certificate'}
              onClick={() => setCurrentSection('certificate')}
            /> */}

            <NavItem 
              icon={<FaBriefcase className="text-[#5491CA]" />} 
              label="Jobs" 
              active={currentSection === 'jobs'}
              onClick={() => setCurrentSection('jobs')}
            />
            <NavItem 
              icon={<FaEnvelopeOpenText className="text-[#5491CA]" />} 
              label="queries" 
              active={currentSection === 'queries'}
              onClick={() => setCurrentSection('queries')}
            />
            {/* <NavItem 
              icon={<Profile/>} 
              label="Jobs" 
              active={currentSection === 'profile'}
              onClick={() => setCurrentSection('profile')}
            /> */}
          </nav>
          
          {/* <div className="absolute bottom-4 w-full pr-8">
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-white hover:bg-gray-100 border border-red-200 p-2 rounded-lg w-full transition-colors" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div> */}
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 p-6">
  {/* Mobile Menu Button */}
  <div className="md:hidden mb-4 flex flex-row justify-between items-center w-full">
    <h1 className="text-xl font-bold text-[#5491CA]">Admin Dashboard</h1>
    <button
      className="p-2"
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6 text-[#5491CA]" />
    </button>
  </div>

  {/* Header */}
  <header className="mb-8">
    {/* User Info - Top right in both desktop and mobile */}
    {currentSection !== 'profile' && (
      <div
        className="flex justify-end items-center gap-4 mb-4 md:mb-2 relative"
        ref={profileMenuRef}
      >
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="h-8 w-8 rounded-full bg-[#5491CA] flex items-center justify-center text-white font-bold hover:bg-[#4a82b6] transition-colors"
          aria-label="User profile"
        >
          {user.userName?.charAt(0).toUpperCase() || "A"}
        </button>
        <div className="text-[#5491CA] font-medium hidden sm:block">
          <h2>{user.userName}</h2>
        </div>

        {/* Dropdown */}
        {profileMenuOpen && (
          <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2 animate-fadeIn">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-[#5491CA]">{user.userName}</p>
              <p className="text-sm text-gray-500">
                {user.email || "admin@aigiri.com"}
              </p>
            </div>

            <button
              className="w-full text-left px-4 py-2 hover:bg-[#b1a9f1]/20 transition-colors flex items-center gap-2 text-gray-700"
              onClick={() => {
                setCurrentSection("profile");
                setProfileMenuOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#5491CA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Edit Profile
            </button>

            <div className="border-t border-gray-100 my-1"></div>

            <button
              className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
              onClick={() => {
                handleLogout();
                setProfileMenuOpen(false);
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    )}

    {/* Search Bar - Below user info in mobile */}
    <div className="w-full md:flex md:justify-between md:items-center">
      {currentSection === "home" && (
        <div className="relative w-full max-w-xl">
          <input
            type="search"
            placeholder="Search Class, Documents, Activities..."
            className="w-full px-4 py-2 rounded-lg border border-[#5491CA] focus:ring-[#5491CA] focus:border-[#5491CA]"
            aria-label="Search"
          />
        </div>
      )}
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
        ${active ? 'bg-[#b1a9f1] text-white' : 'text-[#5491CA] hover:bg-[#b1a9f1]/20'}`}
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
          className="h-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] rounded-full"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );



  // Memoized dropdown item component
  const DropdownItem = memo(({ item, onClick }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-[#5491CA] hover:bg-[#b1a9f1]/20 transition-colors duration-200
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
            ${active ? 'bg-[#b1a9f1] text-white' : 'text-[#5491CA] hover:bg-[#b1a9f1]/20'}`}
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
            absolute left-0 w-full mt-1
            ${isOpen ? 'block' : 'hidden'}
            bg-white border border-gray-200 rounded-lg shadow-lg 
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

  // Add this CSS animation to your global styles or component
  const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out forwards;
  }
  `;

  export default Dashboard;