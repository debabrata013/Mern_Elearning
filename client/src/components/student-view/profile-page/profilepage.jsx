import React, { useState } from 'react';
import logo from '../../../../../client/public/AIGIRI.png';
import {
  GraduationCap,
  User,
  Bell,
  Edit2,
  MapPin,
  Mail,
  Phone,
  Link,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Settings,
} from 'lucide-react';
import { GitHub } from '@mui/icons-material';

const StudentProfile = () => {
  // Manage whether the profile is in edit mode.
  const [isEditing, setIsEditing] = useState(false);
  // Separate toggle for "About Me" editing if needed.
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  // Profile data state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    location: 'New York, USA',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    university: 'Columbia University',
    branch: 'Computer Science',
    semester: '6th Semester',
    resumeLink: 'https://example.com/resume.pdf',
    about:
      'I am a motivated learner with a keen interest in software development, data science, and emerging technologies. I love collaborating with peers and contributing to community projects.',
  });

  // Handle change in profile details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes and exit edit mode
  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, send the data to backend API here.
    setIsEditing(false);
    setIsEditingAbout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 mb-8">
                  <img src={logo} alt="AIGIRI Logo" className="h-8 w-8" />
                  <span className="text-xl font-bold text-[#7670AC]">AIGIRI</span>
                </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Cover and Info */}
      <section className="relative">
        {/* Cover Photo */}
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x300?education')" }}
        ></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 relative -mt-16 flex flex-col md:flex-row">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src="https://source.unsplash.com/random/300x300?face"
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => alert('Implement profile image change')}
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transform translate-x-1/4 translate-y-1/4"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
            {/* Profile Details */}
            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                )}
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                  </button>
                )}
              </div>
              <p className="text-gray-600 mt-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  profile.location
                )}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.email}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.phone}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">University</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="university"
                      value={profile.university}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.university}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Branch</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="branch"
                      value={profile.branch}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.branch}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Semester</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="semester"
                      value={profile.semester}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.semester}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm text-gray-500">Resume Link</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="resumeLink"
                    value={profile.resumeLink}
                    onChange={handleChange}
                    className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <a href={profile.resumeLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                )}
              </div>
              <div className="flex items-center mt-4 space-x-4">
                <a href="#" className="text-blue-500 hover:underline">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-black-400 hover:underline">
                  <GitHub className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-800 hover:underline">
                  <Link className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          {/* About Me */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
              {isEditingAbout ? (
                <button onClick={() => setIsEditingAbout(false)} className="text-sm text-green-500 hover:underline">
                  Save
                </button>
              ) : (
                <button onClick={() => setIsEditingAbout(true)} className="text-sm text-blue-500 hover:underline">
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            ) : (
              <p className="text-gray-600">{profile.about}</p>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" /> Completed "React Advanced" course
              </li>
              <li className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" /> Earned 5 certificates
              </li>
              <li className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" /> Top performer in JavaScript challenge
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <BookOpen className="h-5 w-5 mr-2" /> My Courses
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <Award className="h-5 w-5 mr-2" /> Certificates
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <Settings className="h-5 w-5 mr-2" /> Account Settings
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Main Content */}
        <section className="md:col-span-2 space-y-6">
          {/* Course Progress */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-700">React for Beginners</h4>
                  <p className="text-sm text-gray-500">In Progress</p>
                </div>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="text-sm text-gray-600">70%</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-700">Advanced CSS Techniques</h4>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm text-gray-600">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-700">Data Structures & Algorithms</h4>
                  <p className="text-sm text-gray-500">In Progress</p>
                </div>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-sm text-gray-600">40%</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    Completed <span className="font-medium">Advanced CSS Techniques</span>.
                  </p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    Started a new course: <span className="font-medium">Data Structures & Algorithms</span>.
                  </p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Settings className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">Updated profile information.</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Account Settings */}
          
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow py-4 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          &copy; {new Date().getFullYear()} AIGIRI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentProfile;
