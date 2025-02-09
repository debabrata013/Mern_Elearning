import React from 'react';
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
  Monitor
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
return (
  <div className="flex min-h-screen bg-gray-50">
    {/* Fixed Sidebar */}
    <div className="bg-white shadow-lg w-[250px] h-screen fixed top-0 left-0">
      <Sidebar />
    </div>

    {/* Main Content */}
    <main className="ml-64 flex-1 overflow-y-auto px-8 py-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, Student!</h1>
          <p className="text-gray-600">Continue your learning journey with ease.</p>
        </div>
        <Link
          to="/abop"
          className="flex items-center space-x-3 bg-white px-4 py-3 rounded-lg shadow hover:shadow-md transition"
        >
          <User className="h-6 w-6 text-gray-700" />
          <span className="text-gray-900 font-semibold">John</span>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Courses in Progress", value: "4", icon: <BookOpen className="h-8 w-8 text-[#7670AC]" /> },
          { title: "Hours Learned", value: "26", icon: <Clock className="h-8 w-8 text-[#5491CA]" /> },
          { title: "Certificates Earned", value: "3", icon: <Medal className="h-8 w-8 text-[#7670AC]" /> },
          { title: "Overall Progress", value: "78%", icon: <BarChart3 className="h-8 w-8 text-[#5491CA]" /> }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Content Sections in Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-[#7670AC]">Learning Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#7670AC"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-[#5491CA]">Performance Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="students" fill="#5491CA" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#7670AC]">
            <Calendar className="h-5 w-5" /> Upcoming Classes
          </h2>
          {upcomingClasses.map((session) => (
            <div key={session.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-900">{session.course}</p>
                <p className="text-sm text-gray-500">{session.date} • {session.time}</p>
              </div>
              <button className="bg-[#7670AC] text-white px-3 py-1 rounded-full text-sm hover:bg-[#6457a1] transition">
                Join
              </button>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#5491CA]">
            <BookMarked className="h-5 w-5" /> Announcements
          </h2>
          {announcements.map((announcement) => (
            <div key={announcement.id} className="py-3 border-b last:border-0">
              <p className="font-medium text-gray-900">{announcement.title}</p>
              <p className="text-sm text-gray-500">{announcement.time}</p>
            </div>
          ))}
        </div>

        {/* Recommended Courses */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#7670AC]">
            <Trophy className="h-5 w-5" /> Recommended Courses
          </h2>
          {recommendedCourses.map((course) => (
            <div key={course.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              </div>
              <button className="bg-[#5491CA] text-white px-3 py-1 rounded-full text-sm hover:bg-[#4677b6] transition">
                Enroll
              </button>
            </div>
          ))}
        </div>
        {/* Recent Discussions */}
<div className="bg-white p-6 rounded-xl shadow-lg">
  <h2 className="text-lg font-semibold mb-4 flex items-center text-[#7670AC] gap-2">
    <MessageSquare className="h-5 w-5 text-[#7670AC]" /> Recent Discussions
  </h2>
  {[
    { title: "Help with JavaScript Promise", replies: 5, time: "2h ago" },
    { title: "React Hooks Best Practices", replies: 8, time: "4h ago" },
    { title: "CSS Grid vs Flexbox", replies: 12, time: "6h ago" }
  ].map((discussion, index) => (
    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center space-x-3">
        <MessageSquare className="h-5 w-5 text-gray-400" />
        <div>
          <p className="font-medium text-gray-900">{discussion.title}</p>
          <p className="text-sm text-gray-500">
            {discussion.replies} replies • {discussion.time}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </main>
  </div>
);

  
};

export default StudentDashboard;
