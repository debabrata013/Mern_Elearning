import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/auth';
import axios from 'axios';
import { 
  User, Mail, Phone, MapPin, Calendar, Globe, 
  Shield, Bell, Key, Clock, FileText, Award,
  Camera, Edit3, Save, X, AlertTriangle, CheckCircle
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProfileContent = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'Admin',
    bio: user?.bio || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
    postalCode: user?.postalCode || '',
    dateOfBirth: user?.dateOfBirth || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    skills: user?.skills || ['Administration', 'Management', 'Analytics'],
    languages: user?.languages || ['English'],
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true
    },
    profileImage: user?.profileImage || null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch additional profile data if needed
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user]);

  useEffect(() => {
    const fetchUserDataFromCookies = () => {
      try {
        // Get the access token from cookies
        const cookies = document.cookie.split(';');
        const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
        
        if (accessTokenCookie) {
          const token = accessTokenCookie.split('=')[1];
          const decodedToken = jwtDecode(token);
          
          // Set user data from token
          setUserData(decodedToken);
        }

        // Get user data from userData cookie
        const userDataCookie = cookies.find(cookie => cookie.trim().startsWith('userData='));
        if (userDataCookie) {
          try {
            const parsedUserData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
            // Merge with token data if needed
            setUserData(prev => ({
              ...prev,
              ...parsedUserData
            }));
          } catch (error) {
            console.error('Error parsing userData cookie:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching user data from cookies:', error);
      }
    };

    fetchUserDataFromCookies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setProfileData({
      ...profileData,
      notifications: {
        ...profileData.notifications,
        [name]: checked
      }
    });
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProfileData({
          ...profileData,
          profileImage: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addLanguage = () => {
    if (newLanguage && !profileData.languages.includes(newLanguage)) {
      setProfileData({
        ...profileData,
        languages: [...profileData.languages, newLanguage]
      });
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove) => {
    setProfileData({
      ...profileData,
      languages: profileData.languages.filter(language => language !== languageToRemove)
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (key === 'skills' || key === 'languages' || key === 'notifications') {
          formData.append(key, JSON.stringify(profileData[key]));
        } else {
          formData.append(key, profileData[key]);
        }
      });
      
      // Example API call - replace with your actual endpoint
      // const response = await axios.put('http://localhost:4400/api/admin/profile', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in auth context (if implemented)
      if (typeof updateUser === 'function') {
        updateUser({
          ...user,
          ...profileData,
          profileImage: previewImage
        });
      }
      
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError(null);
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      setLoading(false);
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }
    
    try {
      // Example API call - replace with your actual endpoint
      // const response = await axios.post('http://localhost:4400/api/admin/change-password', {
      //   currentPassword: passwordData.currentPassword,
      //   newPassword: passwordData.newPassword
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const goToAddAnnouncementPage = () => {
    navigate("/admin/anouncement"); // Make sure this matches your route
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="relative px-6 pt-6 pb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-end mb-6">
          {/* Profile Image */}
          <div className="relative">
            <div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white"
              onClick={isEditing ? handleProfileImageClick : undefined}
            >
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#5491CA]/10 flex items-center justify-center text-4xl font-bold text-[#5491CA]">
                  {profileData.fullName.charAt(0) || user?.userName?.charAt(0) || 'A'}
                </div>
              )}
              
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} className="text-white" />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{profileData.fullName || user?.userName}</h1>
            <p className="text-[#5491CA] font-medium">{profileData.role}</p>
            <p className="text-gray-500 text-sm mt-1">
              {profileData.city && profileData.country ? `${profileData.city}, ${profileData.country}` : 'Location not set'}
            </p>
          </div>
          
          <div className="md:ml-auto">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#5491CA] text-white rounded-lg hover:bg-[#4a82b6] transition-colors flex items-center gap-2"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#5491CA] text-white rounded-lg hover:bg-[#4a82b6] transition-colors flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} />
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertTriangle size={18} />
            {error}
          </div>
        )}
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'personal'
                  ? 'border-[#5491CA] text-[#5491CA]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-[#5491CA] text-[#5491CA]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        required
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.fullName || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        required
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.email || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.phone || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.dateOfBirth || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.address || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.city || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={profileData.country}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.country || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="postalCode"
                        value={profileData.postalCode}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{profileData.postalCode || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-lg min-h-[100px]">
                    {profileData.bio || 'No bio information provided.'}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        placeholder="https://example.com"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">
                        {profileData.website ? (
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-[#5491CA] hover:underline">
                            {profileData.website}
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="linkedin"
                        value={profileData.linkedin}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        placeholder="https://linkedin.com/in/username"
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">
                        {profileData.linkedin ? (
                          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#5491CA] hover:underline">
                            {profileData.linkedin}
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="bg-[#5491CA]/10 text-[#5491CA] px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-[#5491CA] hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      placeholder="Add a skill"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-[#5491CA] text-white rounded-lg hover:bg-[#4a82b6] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.languages.map((language, index) => (
                    <div key={index} className="bg-[#b1a9f1]/10 text-[#b1a9f1] px-3 py-1 rounded-full text-sm flex items-center">
                      {language}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(language)}
                          className="ml-2 text-[#b1a9f1] hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                      placeholder="Add a language"
                    />
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="px-4 py-2 bg-[#5491CA] text-white rounded-lg hover:bg-[#4a82b6] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        required
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{passwordData.currentPassword || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        required
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{passwordData.newPassword || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={16} className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA]"
                        required
                      />
                    ) : (
                      <p className="pl-10 p-2 bg-gray-50 rounded-lg">{passwordData.confirmPassword || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white rounded-lg hover:shadow-md transition-all"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent; 