// import React, { useState } from "react";
// import { PlusCircle, Book, Users, X, Menu ,Target,Home} from "lucide-react";
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import Modal from './Modal'; // Import the Modal component
// import StatsCard from './StatsCard'; // Import the StatsCard component
// import ChartCard from './ChartCard'; // Import ChartCard for charts

// import "tailwindcss/tailwind.css";

// const Dashboard = () => {
//   const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
//   const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

//   const [teacherForm, setTeacherForm] = useState({ username: '', email: '', subjects: '' });
//   const [courseForm, setCourseForm] = useState({ title: '', description: '', price: '', duration: '', teacher: '' });

//   const userActivityData = [{ name: "Jan", users: 4000 }, { name: "Feb", users: 3000 }, { name: "Mar", users: 5000 }];
//   const courseEnrollmentData = [{ name: "Course A", enrolled: 120 }, { name: "Course B", enrolled: 200 }];
//   const studentDistributionData = [{ name: "Course A", value: 40 }, { name: "Course B", value: 30 }];
//   const recentOrders = [
//     { course: "React Basics", student: "John Doe", date: "2024-12-01", price: "$99.99" },
//     { course: "Advanced Node.js", student: "Jane Smith", date: "2024-12-02", price: "$149.99" },
//   ];

//   const closeModals = () => { setIsTeacherModalOpen(false); setIsCourseModalOpen(false); };

//   const handleTeacherFormChange = (e) => {
//     const { name, value } = e.target;
//     setTeacherForm({ ...teacherForm, [name]: value });
//   };

//   const handleCourseFormChange = (e) => {
//     const { name, value } = e.target;
//     setCourseForm({ ...courseForm, [name]: value });
//   };

//   const handleSubmitTeacher = (e) => { e.preventDefault(); console.log("Teacher added", teacherForm); closeModals(); };
//   const handleSubmitCourse = (e) => { e.preventDefault(); console.log("Course added", courseForm); closeModals(); };

//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

//   return (
//     <div className="flex">
//      {/* Sidebar */}
// <div className={`fixed top-0 left-0 z-10 shadow-[0px_4px_6px_rgba(0,0,0,0.4)] text-white transition-transform duration-300 ${isMenuOpen ? "transform-none" : "-translate-x-full"} sm:transform-none sm:relative sm:w-64 sm:block h-screen`}>
//   <div className="flex justify-between items-center p-4">
//     <div className="flex items-center">
//       {/* You can put a logo or branding here */}
//     </div>
//     <button onClick={toggleMenu} className="sm:hidden">
//       {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//     </button>
//   </div>

//   <div className="flex flex-col p-4 h-full">
//     <button className="flex items-center mb-4 bg-yellow-500 text-white p-2 roundedrounded">
//       <Home className="mr-2" />Home
//     </button>
//     <button onClick={() => setIsCourseModalOpen(true)} className="flex items-center mb-4 text-white p-2 bg-blue-600 rounded">
//       <PlusCircle className="mr-2" /> Add Course
//     </button>
//     <button onClick={() => setIsTeacherModalOpen(true)} className="flex items-center mb-4 text-white p-2 bg-green-600 rounded">
//       <PlusCircle className="mr-2" /> Add Teacher
//     </button>
//     <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
//       <Book className="mr-2" /> Manage Courses
//     </button>
//     <button className="flex items-center mb-4 text-white p-2 bg-yellow-600 rounded">
//       <Users className="mr-2" /> Manage Teachers
//     </button>
    
   
//     <button  className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
//      <Target className="mr-2"/> New Job

//     </button>
//     <button className="flex items-center p-2 bg-red-600 text-white rounded">
//       Logout
//     </button>

//   </div>
// </div>


//       {/* Main Content */}
//       <div className="flex-1 p-6 sm:ml-20">
//         {/* Stats */}
//         <div className="flex justify-between items-center w-full">
//           <h1 className="text-lg font-medium">Dashboard</h1>
//           <button onClick={toggleMenu} className="sm:hidden">
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatsCard title="Revenue" value="$2,500" color="text-blue-600" />
//           <StatsCard title="Active Users" value="1,200" color="text-green-600" />
//           <StatsCard title="Total Courses" value="50" color="text-purple-600" />
//           <StatsCard title="Enrollment Rate" value="85%" color="text-yellow-600" />
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           <ChartCard title="Course Enrollment" data={courseEnrollmentData} chartType="bar" />
//           <ChartCard title="Student Distribution" data={studentDistributionData} chartType="pie" />
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white p-6 rounded shadow-lg mt-8">
//           <h3 className="text-lg font-medium">Recent Orders</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full mt-4">
//               <thead>
//                 <tr className="border-b">
//                   <th className="px-4 py-2 text-left">Course</th>
//                   <th className="px-4 py-2 text-left">Student</th>
//                   <th className="px-4 py-2 text-left">Date</th>
//                   <th className="px-4 py-2 text-left">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentOrders.map((order, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="px-4 py-2">{order.course}</td>
//                     <td className="px-4 py-2">{order.student}</td>
//                     <td className="px-4 py-2">{order.date}</td>
//                     <td className="px-4 py-2">{order.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modals */}
//         <Modal isOpen={isTeacherModalOpen} close={closeModals} title="Add Teacher" onSubmit={handleSubmitTeacher}>
//           <form onSubmit={handleSubmitTeacher} className="space-y-4">
//             <input type="text" name="username" placeholder="Username" value={teacherForm.username} onChange={handleTeacherFormChange} className="w-full p-2 border rounded" />
//             <input type="email" name="email" placeholder="Email" value={teacherForm.email} onChange={handleTeacherFormChange} className="w-full p-2 border rounded" />
//             <input type="text" name="subjects" placeholder="Subjects" value={teacherForm.subjects} onChange={handleTeacherFormChange} className="w-full p-2 border rounded" />
//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Teacher</button>
//           </form>
//         </Modal>

//         <Modal isOpen={isCourseModalOpen} close={closeModals} title="Add Course" onSubmit={handleSubmitCourse}>
//           <form onSubmit={handleSubmitCourse} className="space-y-4">
//             <input type="text" name="title" placeholder="Course Title" value={courseForm.title} onChange={handleCourseFormChange} className="w-full p-2 border rounded" />
//             <textarea name="description" placeholder="Course Description" value={courseForm.description} onChange={handleCourseFormChange} className="w-full p-2 border rounded" />
//             <input type="number" name="price" placeholder="Course Price" value={courseForm.price} onChange={handleCourseFormChange} className="w-full p-2 border rounded" />
//             <input type="text" name="duration" placeholder="Course Duration" value={courseForm.duration} onChange={handleCourseFormChange} className="w-full p-2 border rounded" />
//             <input type="text" name="teacher" placeholder="Assign Teacher" value={courseForm.teacher} onChange={handleCourseFormChange} className="w-full p-2 border rounded" />
//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Course</button>
//           </form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { PlusCircle, Book, Users, X, Menu, Target, Home } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Modal from './Modal'; // Import the Modal component
import StatsCard from './StatsCard'; // Import the StatsCard component
import ChartCard from './ChartCard'; // Import ChartCard for charts

import "tailwindcss/tailwind.css";

const Dashboard = () => {
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const [teacherForm, setTeacherForm] = useState({ username: '', email: '', subjects: '' });
  const [courseForm, setCourseForm] = useState({ title: '', description: '', price: '', duration: '', teacher: '' });

  const userActivityData = [{ name: "Jan", users: 4000 }, { name: "Feb", users: 3000 }, { name: "Mar", users: 5000 }];
  const courseEnrollmentData = [{ name: "Course A", enrolled: 120 }, { name: "Course B", enrolled: 200 }];
  const studentDistributionData = [{ name: "Course A", value: 40 }, { name: "Course B", value: 30 }];
  const recentOrders = [
    { course: "React Basics", student: "John Doe", date: "2024-12-01", price: "$99.99" },
    { course: "Advanced Node.js", student: "Jane Smith", date: "2024-12-02", price: "$149.99" },
  ];

  const closeModals = () => { setIsTeacherModalOpen(false); setIsCourseModalOpen(false); };

  const handleTeacherFormChange = (e) => {
    const { name, value } = e.target;
    setTeacherForm({ ...teacherForm, [name]: value });
  };

  const handleCourseFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm({ ...courseForm, [name]: value });
  };

  const handleSubmitTeacher = (e) => { e.preventDefault(); console.log("Teacher added", teacherForm); closeModals(); };
  const handleSubmitCourse = (e) => { e.preventDefault(); console.log("Course added", courseForm); closeModals(); };

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed top-0 bg-white left-0 z-10 shadow-[0px_4px_6px_rgba(0,0,0,0.4)] text-white transition-transform duration-300 ${isMenuOpen ? "transform-none" : "-translate-x-full"} sm:transform-none sm:relative sm:w-64 sm:block h-screen`}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            {/* You can put a logo or branding here */}
          </div>
          <button onClick={toggleMenu} className="sm:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex flex-col p-4 h-full bg-white">
          <Link to="/" className="flex items-center mb-4 bg-yellow-500 text-white p-2 rounded">
            <Home className="mr-2" /> Home
          </Link>
          <Link to="/add-course" className="flex items-center mb-4 text-white p-2 bg-blue-600 rounded">
            <PlusCircle className="mr-2" /> Add Course
          </Link>
          <Link to="/add-teacher" className="flex items-center mb-4 text-white p-2 bg-green-600 rounded">
            <PlusCircle className="mr-2" /> Add Teacher
          </Link>
          <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
            <Book className="mr-2" /> Manage Courses
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-yellow-600 rounded">
            <Users className="mr-2" /> Manage Teachers
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
            <Target className="mr-2"/> New Job
          </button>
          <button className="flex items-center p-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-20">
        {/* Stats */}
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-medium">Dashboard</h1>
          <button onClick={toggleMenu} className="sm:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Revenue" value="$2,500" color="text-blue-600" />
          <StatsCard title="Active Users" value="1,200" color="text-green-600" />
          <StatsCard title="Total Courses" value="50" color="text-purple-600" />
          <StatsCard title="Enrollment Rate" value="85%" color="text-yellow-600" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <ChartCard title="Course Enrollment" data={courseEnrollmentData} chartType="bar" />
          <ChartCard title="Student Distribution" data={studentDistributionData} chartType="pie" />
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded shadow-lg mt-8">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{order.course}</td>
                    <td className="px-4 py-2">{order.student}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
