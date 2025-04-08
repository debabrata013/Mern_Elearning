import React, { useState, useEffect } from 'react';
import Sidebar from '../studentComponent/Sidebar';
import { jwtDecode } from "jwt-decode";
import {
  User, Edit2, Mail, Phone, BookOpen, Building, Pen, 
  Github, Linkedin, GraduationCap, FileText, Hash, Menu, X
} from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [profile, setProfile] = useState({
    id: user.id,
    userName: user.userName,
    email: user.email,
    mobile: user.mobile,
    university: user.university,
    branch: user.branch,
    Semester: user.Semester,
    rollNumber: user.rollNumber,
    description: user.description,
    enrollmentNumber: user.enrollmentNumber,
    githubprofileurl: user.githubprofileurl,
    lindeninProfileUrl: user.lindeninProfileUrl,
    resumeurl: user.resumeurl,
    profileImage: user.profileImage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put("/u/student", profile);
      console.log(response);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(file);
      setProfile(prev => ({ ...prev, profileImageUrl: imageUrl }));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Resume size should be less than 10MB');
        return;
      }
      const resumeUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, resumeLink: resumeUrl }));
    }
  };

  // Cleanup function for object URLs
  React.useEffect(() => {
    return () => {
      if (profile.profileImageUrl && profile.profileImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(profile.profileImageUrl);
      }
      if (profile.resumeLink && profile.resumeLink.startsWith('blob:')) {
        URL.revokeObjectURL(profile.resumeLink);
      }
    };
  }, [profile.profileImageUrl, profile.resumeLink]);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 shadow-xl w-[280px] h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out z-40 ${
        isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      }`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-[280px]'
      }`}>
        <div className="p-4 md:p-8">
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-transparent bg-clip-text">
                Profile
              </h1>
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            {/* Desktop Header */}
            {!isMobile && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-transparent bg-clip-text">
                  Profile Details
                </h1>
              </div>
            )}

            {/* Main Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#5491CA] to-[#7670AC] p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white">
                        {user.profileImage ? (
                          <img 
                            src={user.profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                            <User className="h-8 w-8 text-[#5491CA]" />
                          </div>
                        )}
                        {isEditing && (
                          <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProfileImageChange}
                              className="hidden"
                            />
                            <Edit2 className="h-6 w-6 text-white" />
                          </label>
                        )}
                      </div>
                    </div>
                    <div className="text-white">
                      <h2 className="text-xl md:text-2xl font-semibold">
                        {profile.userName}
                      </h2>
                      <p className="text-white/80 text-sm md:text-base">{profile.branch}</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="w-full md:w-auto px-4 md:px-6 py-2 bg-white text-[#5491CA] rounded-lg hover:bg-white/90 transition-colors font-medium text-sm md:text-base"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full md:w-auto px-4 md:px-6 py-2 bg-white text-[#5491CA] rounded-lg hover:bg-white/90 transition-colors font-medium flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <Edit2 className="h-4 w-4" /> Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-4 md:p-8">
                {/* Personal Information */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <InfoField
                      icon={<User className="h-5 w-5 text-[#5491CA]" />}
                      label="User name"
                      value={profile.userName}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="userName"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <InfoField
                      icon={<Mail className="h-5 w-5 text-[#5491CA]" />}
                      label="Email Address"
                      value={profile.email}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="email"
                      type="email"
                    />
                    <InfoField
                      icon={<Phone className="h-5 w-5 text-[#5491CA]" />}
                      label="Phone Number"
                      value={profile.mobile}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="mobile"
                      type="tel"
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <InfoField
                      icon={<Building className="h-5 w-5 text-[#7670AC]" />}
                      label="University"
                      value={profile.university}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="university"
                    />
                    <InfoField
                      icon={<BookOpen className="h-5 w-5 text-[#7670AC]" />}
                      label="Branch"
                      value={profile.branch}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="branch"
                    />
                    <InfoField
                      icon={<GraduationCap className="h-5 w-5 text-[#7670AC]" />}
                      label="Semester"
                      value={profile.Semester}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="Semester"
                    />
                    <InfoField
                      icon={<Hash className="h-5 w-5 text-[#7670AC]" />}
                      label="Roll Number"
                      value={profile.rollNumber}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="rollNumber"
                    />
                    <InfoField
                      icon={<Hash className="h-5 w-5 text-[#7670AC]" />}
                      label="Enrollment Number"
                      value={profile.enrollmentNumber}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="enrollmentNumber"
                    />
                    <InfoField
                      icon={<Pen className="h-5 w-5 text-[#7670AC]" />}
                      label="Description"
                      value={profile.description}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="description"
                    />
                  </div>
                </div>

                {/* Professional Links */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Professional Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <InfoField
                      icon={<Github className="h-5 w-5 text-[#5491CA]" />}
                      label="GitHub Profile URL"
                      value={profile.githubprofileurl}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="githubprofileurl"
                      type="url"
                    />
                    <InfoField
                      icon={<Linkedin className="h-5 w-5 text-[#5491CA]" />}
                      label="LinkedIn Profile"
                      value={profile.lindeninProfileUrl}
                      isEditing={isEditing}
                      onChange={handleChange}
                      name="lindeninProfileUrl"
                      type="url"
                    />
                    <div className="md:col-span-2">
                      <InfoField
                        icon={<FileText className="h-5 w-5 text-[#7670AC]" />}
                        label="Resume"
                        value={profile.resumeurl}
                        isEditing={isEditing}
                        onChange={handleChange}
                        name="resumeurl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const InfoField = ({ icon, label, value, isEditing, onChange, name, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
      {icon}
      {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5491CA]/20 focus:border-[#5491CA] transition-all dark:bg-gray-700 dark:text-gray-200"
      />
    ) : (
      <p className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200">{value || '-'}</p>
    )}
  </div>
);

export default StudentProfile;
