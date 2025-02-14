import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Edit2, 
  Settings, 
  Users, 
  BookOpen, 
  Award,
  BarChart2,
  Calendar,
  Mail,
  Phone,
  Link,
  FileText,
  Shield,
  Activity,
  Clock
} from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Sarah Anderson',
    role: 'Senior Administrator',
    location: 'San Francisco, USA',
    email: 'sarah.anderson@aigiri.edu',
    phone: '+1 (415) 555-0123',
    department: 'Academic Operations',
    yearsOfExperience: '8 years',
    about:
      'Experienced educational administrator with expertise in curriculum development, student affairs, and institutional operations. Passionate about leveraging technology to enhance educational outcomes and streamline administrative processes.',
  });

  const [stats] = useState({
    totalStudents: 2480,
    activeCourses: 45,
    facultyMembers: 120,
    completionRate: 92,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setIsEditingAbout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold text-blue-600">AIGIRI Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="h-6 w-6 text-gray-700" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <section className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg p-8 relative -mt-16">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 shadow-lg">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold text-gray-800">
                        {profile.name}
                      </h2>
                    )}
                    <p className="text-lg text-blue-600 mt-1">{profile.role}</p>
                  </div>
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md transition"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md transition"
                    >
                      <Edit2 className="h-4 w-4 inline mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Department</span>
                    <span className="text-gray-800 font-medium">
                      {profile.department}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Experience</span>
                    <span className="text-gray-800 font-medium">
                      {profile.yearsOfExperience}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Email</span>
                    <span className="text-gray-800 font-medium">
                      {profile.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="text-gray-800 font-medium">
                      {profile.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <aside className="space-y-6">
          {/* About */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
              {isEditingAbout ? (
                <button
                  onClick={() => setIsEditingAbout(false)}
                  className="text-green-500 hover:text-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingAbout(true)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditingAbout ? (
              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{profile.about}</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-medium">Students</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalStudents}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center text-green-600 mb-2">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span className="font-medium">Courses</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.activeCourses}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center text-purple-600 mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-medium">Faculty</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.facultyMembers}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center text-yellow-600 mb-2">
                  <Activity className="h-5 w-5 mr-2" />
                  <span className="font-medium">Completion</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.completionRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition">
                <span className="flex items-center text-gray-700">
                  <Shield className="h-5 w-5 mr-3 text-blue-500" />
                  Security Settings
                </span>
                <span className="text-blue-500">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition">
                <span className="flex items-center text-gray-700">
                  <FileText className="h-5 w-5 mr-3 text-blue-500" />
                  Generate Reports
                </span>
                <span className="text-blue-500">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition">
                <span className="flex items-center text-gray-700">
                  <Users className="h-5 w-5 mr-3 text-blue-500" />
                  Manage Users
                </span>
                <span className="text-blue-500">→</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="md:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800">
                    <span className="font-medium">New Faculty Onboarding</span> - Completed orientation for 3 new professors
                  </p>
                  <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-2">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800">
                    <span className="font-medium">Course Update</span> - Approved 5 new course proposals
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-lg p-2">
                  <BarChart2 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800">
                    <span className="font-medium">Performance Review</span> - Completed quarterly assessment reports
                  </p>
                  <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Upcoming Tasks
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Faculty Meeting</p>
                    <p className="text-sm text-gray-600">
                      Review curriculum changes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">Tomorrow</p>
                  <p className="text-sm text-gray-600">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">System Maintenance</p>
                    <p className="text-sm text-gray-600">
                      Update servers and software
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    Next Monday
                  </p>
                  <p className="text-sm text-gray-600">02:00 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Newsletter Dispatch
                    </p>
                    <p className="text-sm text-gray-600">
                      Prepare and send monthly newsletter
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-yellow-600">Friday</p>
                  <p className="text-sm text-gray-600">03:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminProfile;
