// import { GraduationCap, TvMinimalPlay } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useContext } from "react";
// // import { AuthContext } from "@/context/auth-context";

// function StudentViewCommonHeader() {
//   const navigate = useNavigate();
//   // const { resetCredentials } = useContext(AuthContext);

//   function handleLogout() {
//     // resetCredentials();
//     sessionStorage.clear();
//   }

//   return (
//     <header className="flex items-center justify-between p-4 border-b relative">
//       <div className="flex items-center space-x-4">
//         <Link to="/home" className="flex items-center hover:text-black">
//           <GraduationCap className="h-8 w-8 mr-4 " />
//           <span className="font-extrabold md:text-xl text-[14px]">
//             LMS LEARN
//           </span>
//         </Link>
//         <div className="flex items-center space-x-1">
//           <Button
//             variant="ghost"
//             onClick={() => {
//               location.pathname.includes("/courses")
//                 ? null
//                 : navigate("/courses");
//             }}
//             className="text-[14px] md:text-[16px] font-medium"
//           >
//             Explore Courses
//           </Button>
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="flex gap-4 items-center">
//           <div
//             onClick={() => navigate("/student-courses")}
//             className="flex cursor-pointer items-center gap-3"
//           >
//             <span className="font-extrabold md:text-xl text-[14px]">
//               My Courses
//             </span>
//             <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
//           </div>
//           <Button onClick={handleLogout}>Sign Out</Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default StudentViewCommonHeader;
import React from 'react';
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
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

const progressData = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 45 },
  { name: 'Week 4', progress: 60 },
  { name: 'Week 5', progress: 75 },
  { name: 'Week 6', progress: 85 }
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">NextSkills</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-300">
              <Bell className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-300">
              <User className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Student!</h1>
        <p className="text-gray-600 mb-6">Continue your learning journey with ease.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[ 
            { title: "Courses in Progress", value: "4", icon: <BookOpen className="h-8 w-8 text-blue-500" /> },
            { title: "Hours Learned", value: "26", icon: <Clock className="h-8 w-8 text-green-500" /> },
            { title: "Certificates Earned", value: "3", icon: <Medal className="h-8 w-8 text-yellow-500" /> },
            { title: "Overall Progress", value: "78%", icon: <BarChart3 className="h-8 w-8 text-purple-500" /> }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="url(#progressGradient)" 
                  strokeWidth={3} 
                  dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" /> Upcoming Classes
          </h2>
          {upcomingClasses.map((session) => (
            <div key={session.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-900">{session.course}</p>
                <p className="text-sm text-gray-500">{session.date} • {session.time}</p>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition">
                Join
              </button>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-green-500" /> Announcements
          </h2>
          {announcements.map((announcement) => (
            <div key={announcement.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-900">{announcement.title}</p>
                <p className="text-sm text-gray-500">{announcement.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Discussions */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-gray-400" /> Recent Discussions
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

        {/* Recommended Courses */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-500" /> Recommended Courses
          </h2>
          {recommendedCourses.map((course) => (
            <div key={course.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              </div>
              <button className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-600 transition">
                Enroll
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default StudentDashboard;
