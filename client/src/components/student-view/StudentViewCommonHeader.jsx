import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Sidebar from './studentComponent/Sidebar';
import { 
  GraduationCap, 
  BookOpen, 
  Bell, 
  User,
  Search,
  Clock,
  Medal,
  BarChart3,
  Calendar,
  BookMarked,
  Trophy,
  MessageSquare,
  Award,
  Monitor,
  FileText,
  Users
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar 
} from "recharts";


const progressData = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 45 },
  { name: 'Week 4', progress: 60 },
  { name: 'Week 5', progress: 75 },
  { name: 'Week 6', progress: 85 }
];
const histogramData = [
  { range: "0-20%", students: 5 },
  { range: "21-40%", students: 8 },
  { range: "41-60%", students: 12 },
  { range: "61-80%", students: 7 },
  { range: "81-100%", students: 3 },
];

const upcomingClasses = [
  { id: 1, course: 'React Basics', date: 'Feb 4, 2025', time: '10:00 AM' },
  { id: 2, course: 'Advanced CSS', date: 'Feb 6, 2025', time: '2:00 PM' },
  { id: 3, course: 'JavaScript ES6', date: 'Feb 8, 2025', time: '11:00 AM' }
];

const announcements = [
  { id: 1, title: 'New Course: GraphQL Essentials', time: '1h ago' },
  { id: 2, title: 'Maintenance Downtime on Feb 10', time: '3h ago' },
  { id: 3, title: 'Live Q&A Session Tomorrow', time: '5h ago' }
];

const recommendedCourses = [
  { id: 1, title: 'Node.js for Beginners', instructor: 'Jane Doe' },
  { id: 2, title: 'UI/UX Design Fundamentals', instructor: 'John Smith' },
  { id: 3, title: 'Python Data Analysis', instructor: 'Emily White' }
];

const recentActivities = [
  {
    id: 1,
    type: 'submission',
    title: 'Assignment Submitted',
    course: 'React Fundamentals',
    time: '2 hours ago',
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    status: 'success'
  },
  {
    id: 2,
    type: 'quiz',
    title: 'Quiz Completed',
    course: 'JavaScript Basics',
    time: '5 hours ago',
    icon: <Monitor className="h-5 w-5 text-purple-500" />,
    score: '85%'
  },
  {
    id: 3,
    type: 'attendance',
    title: 'Class Attended',
    course: 'UI/UX Design',
    time: 'Yesterday',
    icon: <Users className="h-5 w-5 text-green-500" />,
    duration: '2h'
  },
  {
    id: 4,
    type: 'certificate',
    title: 'Certificate Earned',
    course: 'HTML & CSS',
    time: '2 days ago',
    icon: <Award className="h-5 w-5 text-yellow-500" />
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'React Advanced Concepts',
    type: 'class',
    datetime: '2024-03-10T10:00:00',
    duration: '1.5h',
    instructor: 'Dr. Smith',
    icon: <Monitor className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    title: 'Final Project Submission',
    type: 'deadline',
    datetime: '2024-03-12T23:59:59',
    course: 'Web Development',
    icon: <FileText className="h-5 w-5 text-red-500" />
  },
  {
    id: 3,
    title: 'JavaScript Quiz',
    type: 'quiz',
    datetime: '2024-03-15T14:00:00',
    duration: '1h',
    course: 'JavaScript Basics',
    icon: <BookOpen className="h-5 w-5 text-purple-500" />
  },
  {
    id: 4,
    title: 'Group Project Meeting',
    type: 'meeting',
    datetime: '2024-03-11T15:30:00',
    duration: '1h',
    participants: 5,
    icon: <Users className="h-5 w-5 text-green-500" />
  }
];

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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Fixed Sidebar */}
      <div className="bg-white dark:bg-gray-800 shadow-xl w-[250px] h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto px-8 py-10">
        {/* Top Bar with Search and Quick Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search courses, assignments, or resources..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-[#5491CA] focus:ring-2 focus:ring-[#5491CA]/20 transition-all dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  {/* Add your notifications list here */}
                </div>
              )}
            </div>

            {/* Profile */}
            <Link
              to="/abop"
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-[#5491CA]"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-gray-100">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Updated Welcome Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&size=128"
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-[#5491CA]"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-2 border-white dark:border-gray-800" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                  Welcome back, John! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                  You have <span className="font-semibold text-[#5491CA]">3 assignments</span> due this week and 
                  <span className="font-semibold text-[#7670AC]"> 2 upcoming quizzes</span>. Stay focused!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Course Progress",
              value: `${quickStats.coursesProgress}%`,
              icon: <BookOpen />,
              color: "from-blue-500 to-blue-600"
            },
            {
              title: "Assignments Due",
              value: quickStats.assignmentsDue,
              icon: <FileText />,
              color: "from-purple-500 to-purple-600"
            },
            {
              title: "Upcoming Quizzes",
              value: quickStats.upcomingQuizzes,
              icon: <Monitor />,
              color: "from-green-500 to-green-600"
            },
            {
              title: "Attendance Rate",
              value: `${quickStats.attendanceRate}%`,
              icon: <Calendar />,
              color: "from-orange-500 to-orange-600"
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  {React.cloneElement(stat.icon, { className: "h-6 w-6 text-white" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-6">
            {['overview', 'courses', 'assignments', 'grades'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Learning Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                      Learning Progress
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#6b7280" />
                          <YAxis stroke="#6b7280" />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="progress"
                            stroke="#5491CA"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                      Achievements
                    </h3>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-4">
                          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {achievement.title}
                            </p>
                            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                              <div
                                className="h-full bg-gradient-to-r from-[#5491CA] to-[#7670AC] rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {achievement.progress}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Updated Recent Activity & Upcoming Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Recent Activity */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#5491CA]" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.course} • {activity.time}
                            </p>
                          </div>
                          {activity.status && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                              {activity.status}
                            </span>
                          )}
                          {activity.score && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                              {activity.score}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#7670AC]" />
                      Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div 
                          key={event.id}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600">
                            {event.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {event.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(event.datetime).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                              })}
                              {event.duration && ` • ${event.duration}`}
                            </p>
                          </div>
                          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#5491CA] text-white hover:bg-[#4677b6] transition-colors">
                            {event.type === 'class' ? 'Join' : 
                             event.type === 'deadline' ? 'Submit' : 
                             event.type === 'quiz' ? 'Start' : 'View'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Add other tab contents */}
          </div>
        </div>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Join Class', icon: <Monitor />, color: 'bg-blue-500' },
            { title: 'Submit Assignment', icon: <FileText />, color: 'bg-purple-500' },
            { title: 'View Resources', icon: <BookOpen />, color: 'bg-green-500' },
            { title: 'Get Help', icon: <MessageSquare />, color: 'bg-orange-500' }
          ].map((tool, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <div className={`p-2 rounded-lg ${tool.color}`}>
                {React.cloneElement(tool.icon, { className: "h-5 w-5 text-white" })}
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">{tool.title}</span>
            </button>
          ))}
        </div>
      </main>
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
