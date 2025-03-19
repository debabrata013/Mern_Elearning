import React, { useState, useEffect } from 'react';
import Sidebar from '../studentComponent/Sidebar';
import { jwtDecode } from "jwt-decode";
import {
  User, Edit2, Mail, Phone, BookOpen, Building, 
  Github, Linkedin, GraduationCap, FileText, Hash
} from 'lucide-react';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    email: '',
    phone: '',
    university: '',
    branch: '',
    semester: '',
    rollNumber: '',
    enrollmentNumber: '',
    github: '',
    linkedin: '',
    resumeLink: null,
    profileImageUrl: null
  });

  // Fetch user data from cookies when component mounts
  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Get the access token from cookies
        const cookies = document.cookie.split(';');
        const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
        
        if (accessTokenCookie) {
          const token = accessTokenCookie.split('=')[1];
          const decodedToken = jwtDecode(token);

          // Update profile state with decoded token data
          setProfile({
            firstName: decodedToken.userName || '',
            email: decodedToken.email || '',
            profileImageUrl: decodedToken.profileImage || null,
            github: decodedToken.githubprofileurl || '',
            linkedin: decodedToken.lindeninProfileUrl || '',
            resumeLink: decodedToken.resumeurl || null,
            phone: '',  // Add these fields if they're available in your token
            university: '',
            branch: '',
            semester: '',
            rollNumber: '',
            enrollmentNumber: ''
          });
        }

        // Also check for userData cookie which might contain additional information
        const userDataCookie = cookies.find(cookie => cookie.trim().startsWith('userData='));
        if (userDataCookie) {
          const userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
          setProfile(prev => ({
            ...prev,
            ...userData,
            firstName: userData.userName || prev.firstName,
            profileImageUrl: userData.profileImage || prev.profileImageUrl,
            github: userData.githubprofileurl || prev.github,
            linkedin: userData.lindeninProfileUrl || prev.linkedin,
            resumeLink: userData.resumeurl || prev.resumeLink
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Here you would send the updated profile data to your backend
      // Include the profileImage file if it exists
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        formData.append(key, profile[key]);
      });
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      // Make API call to update profile
      // const response = await fetch('/api/profile/update', {
      //   method: 'PUT',
      //   body: formData,
      //   credentials: 'include' // to include cookies
      // });

      // if (response.ok) {
      //   const updatedData = await response.json();
      //   setProfile(updatedData);
      // }

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
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white dark:bg-gray-800 shadow-xl w-[250px] h-screen fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="ml-[250px] p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-transparent bg-clip-text">
              Profile Details
            </h1>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#5491CA] to-[#7670AC] p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white">
                      {profile.profileImageUrl ? (
                        <img 
                          src={profile.profileImageUrl} 
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
                    <h2 className="text-2xl font-semibold">
                      {profile.firstName}
                    </h2>
                    <p className="text-white/80">{profile.branch}</p>
                  </div>
                </div>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-white text-[#5491CA] rounded-lg hover:bg-white/90 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 bg-white text-[#5491CA] rounded-lg hover:bg-white/90 transition-colors font-medium flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfoField
                    icon={<User className="h-5 w-5 text-[#5491CA]" />}
                    label="User name"
                    value={profile.firstName}
                    isEditing={isEditing}
                    onChange={handleChange}
                    name="firstName"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={profile.phone}
                    isEditing={isEditing}
                    onChange={handleChange}
                    name="phone"
                    type="tel"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={profile.semester}
                    isEditing={isEditing}
                    onChange={handleChange}
                    name="semester"
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
                </div>
              </div>

              {/* Professional Links */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField
                    icon={<Github className="h-5 w-5 text-[#5491CA]" />}
                    label="GitHub Profile"
                    value={profile.github}
                    isEditing={isEditing}
                    onChange={handleChange}
                    name="github"
                    type="url"
                  />
                  <InfoField
                    icon={<Linkedin className="h-5 w-5 text-[#5491CA]" />}
                    label="LinkedIn Profile"
                    value={profile.linkedin}
                    isEditing={isEditing}
                    onChange={handleChange}
                    name="linkedin"
                    type="url"
                  />
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-[#7670AC]" />
                      Resume
                    </label>
                    {isEditing ? (
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="w-full text-sm text-gray-500 
                          file:mr-4 file:py-2.5 file:px-4 file:rounded-lg 
                          file:border-0 file:text-sm file:font-medium
                          file:bg-gradient-to-r file:from-[#5491CA] file:to-[#7670AC] 
                          file:text-white hover:file:opacity-90"
                      />
                    ) : profile.resumeLink ? (
                      <a 
                        href={profile.resumeLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                      >
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm">No resume uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ icon, label, value, isEditing, onChange, name, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
      {icon}
      {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5491CA]/20 focus:border-[#5491CA] transition-all"
      />
    ) : (
      <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-800">{value || '-'}</p>
    )}
  </div>
);

export default StudentProfile;
