import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/context/ThemeContext';
import { 
  Camera, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Book, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Moon, 
  Sun, 
  Clock, 
  Languages, 
  Save, 
  Trash2, 
  Download, 
  Upload, 
  AlertCircle
} from 'lucide-react';

import { toast } from 'react-hot-toast';

const TeacherSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [userData, setUserData] = useState({
    userName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Education St, Teaching City',
    description: 'Experienced mathematics teacher with a passion for making complex concepts simple.',
    salary: 50000,
    profileImage: '',
    specialization: 'Mathematics',
    experience: '5 years',
    education: 'M.Ed in Education, University of Teaching',
    certifications: ['Teaching License', 'Advanced Mathematics Certification']
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // New states for additional features
  const [language, setLanguage] = useState('english');
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
    updates: true,
    studentMessages: true,
    adminMessages: true
  });
  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showPhone: false,
    publicProfile: true,
    allowStudentMessages: true
  });
  const [appearance, setAppearance] = useState({
    colorScheme: 'blue',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false
  });

  // Load user data from localStorage if available
  useEffect(() => {
    const savedUserData = localStorage.getItem('teacherUserData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    
    const savedAppearance = localStorage.getItem('teacherAppearance');
    if (savedAppearance) {
      setAppearance(JSON.parse(savedAppearance));
    }
    
    const savedNotifications = localStorage.getItem('teacherNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    const savedPrivacy = localStorage.getItem('teacherPrivacy');
    if (savedPrivacy) {
      setPrivacy(JSON.parse(savedPrivacy));
    }
    
    const savedLanguage = localStorage.getItem('teacherLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('teacherUserData', JSON.stringify(userData));
    console.log('Profile updated:', userData);
    // Show success message
    toast.success('Profile updated successfully!');
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      // In a real app, you would upload the image to a server
      // For now, we'll just update the state and pretend it worked
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUserData = { ...userData, profileImage: reader.result };
        setUserData(updatedUserData);
        localStorage.setItem('teacherUserData', JSON.stringify(updatedUserData));
      };
      reader.readAsDataURL(selectedImage);
    }
    console.log('Image updated:', selectedImage);
    // Show success message
    toast.success('Profile image updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match!');
      return;
    }
    console.log('Password update:', passwords);
    // Show success message
    toast.success('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleNotificationChange = (key, value) => {
    const updatedNotifications = {
      ...notifications,
      [key]: value
    };
    setNotifications(updatedNotifications);
    localStorage.setItem('teacherNotifications', JSON.stringify(updatedNotifications));
  };

  const handlePrivacyChange = (key, value) => {
    const updatedPrivacy = {
      ...privacy,
      [key]: value
    };
    setPrivacy(updatedPrivacy);
    localStorage.setItem('teacherPrivacy', JSON.stringify(updatedPrivacy));
  };

  const handleAppearanceChange = (key, value) => {
    const updatedAppearance = {
      ...appearance,
      [key]: value
    };
    setAppearance(updatedAppearance);
    localStorage.setItem('teacherAppearance', JSON.stringify(updatedAppearance));
  };

  const handleSaveAppearance = () => {
    localStorage.setItem('teacherAppearance', JSON.stringify(appearance));
    toast.success('Appearance settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('teacherNotifications', JSON.stringify(notifications));
    toast.success('Notification settings saved successfully!');
  };

  const handleSavePrivacy = () => {
    localStorage.setItem('teacherPrivacy', JSON.stringify(privacy));
    toast.success('Privacy settings saved successfully!');
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem('teacherLanguage', value);
  };

  const handleUpdateLanguage = () => {
    toast.success(`Language updated to ${language}!`);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(userData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'teacher-profile-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      toast.success('Account deletion request submitted. An administrator will contact you.');
    }
  };
    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] bg-clip-text text-transparent">
            Teacher Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your preferences, and account settings
            </p>
        </div>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-800">
            {/* <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA] dark:text-gray-300 dark:data-[state=active]:text-[#6ba2d8]">
                <User className="w-4 h-4 mr-2" />
                Profile
            </TabsTrigger> */}
            <TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA] dark:text-gray-300 dark:data-[state=active]:text-[#6ba2d8]">
                <Palette className="w-4 h-4 mr-2" />
                Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA] dark:text-gray-300 dark:data-[state=active]:text-[#6ba2d8]">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA] dark:text-gray-300 dark:data-[state=active]:text-[#6ba2d8]">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA] dark:text-gray-300 dark:data-[state=active]:text-[#6ba2d8]">
                <User className="w-4 h-4 mr-2" />
                Account
            </TabsTrigger>
            </TabsList>
            
            
            <TabsContent value="appearance" className="space-y-6">
            <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20 dark:bg-gray-800/50 dark:border-gray-700">
                <CardTitle className="text-[#5491CA] dark:text-[#6ba2d8]">Theme Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">Customize your dashboard appearance</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Dark Mode</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <Switch 
                        checked={theme === 'dark'} 
                        onCheckedChange={toggleTheme}
                        className="data-[state=checked]:bg-[#5491CA]"
                        />
                        <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    </div>
                    
                    <div className="space-y-2">
                    <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Color Scheme</Label>
                    <div className="grid grid-cols-5 gap-2">
                        {['blue', 'purple', 'green', 'orange', 'pink'].map(color => (
                        <button
                            key={color}
                            onClick={() => handleAppearanceChange('colorScheme', color)}
                            className={`h-10 rounded-md ${
                            appearance.colorScheme === color ? 'ring-2 ring-[#5491CA] ring-offset-2 dark:ring-offset-gray-800' : ''
                            } ${
                            color === 'blue' ? 'bg-blue-500' :
                            color === 'purple' ? 'bg-purple-500' :
                            color === 'green' ? 'bg-green-500' :
                            color === 'orange' ? 'bg-orange-500' :
                            'bg-pink-500'
                            }`}
                            aria-label={`${color} theme`}
                        />
                        ))}
                    </div>
                    </div>
                    
                    <div className="space-y-2">
                    <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Font Size</Label>
                    <Select 
                        value={appearance.fontSize} 
                        onValueChange={(value) => handleAppearanceChange('fontSize', value)}
                    >
                        <SelectTrigger className="border-gray-200 focus:ring-[#5491CA] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="small" className="dark:text-white">Small</SelectItem>
                        <SelectItem value="medium" className="dark:text-white">Medium</SelectItem>
                        <SelectItem value="large" className="dark:text-white">Large</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
            {/* Notification Settings */}
            <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20 dark:bg-gray-800/50 dark:border-gray-700">
                <CardTitle className="text-[#5491CA] dark:text-[#6ba2d8]">Notification Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Email Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications</p>
                    </div>
                    <Switch 
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange('email', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Browser Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive browser notifications</p>
                    </div>
                    <Switch 
                        checked={notifications.browser}
                        onCheckedChange={(value) => handleNotificationChange('browser', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Mobile Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive mobile notifications</p>
                    </div>
                    <Switch 
                        checked={notifications.mobile}
                        onCheckedChange={(value) => handleNotificationChange('mobile', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Updates</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates</p>
                    </div>
                    <Switch 
                        checked={notifications.updates}
                        onCheckedChange={(value) => handleNotificationChange('updates', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Student Messages</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive student messages</p>
                    </div>
                    <Switch 
                        checked={notifications.studentMessages}
                        onCheckedChange={(value) => handleNotificationChange('studentMessages', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Admin Messages</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive admin messages</p>
                    </div>
                    <Switch 
                        checked={notifications.adminMessages}
                        onCheckedChange={(value) => handleNotificationChange('adminMessages', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
            {/* Privacy Settings */}
            <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20 dark:bg-gray-800/50 dark:border-gray-700">
                <CardTitle className="text-[#5491CA] dark:text-[#6ba2d8]">Privacy Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">Manage your privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Show Email</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Show your email address</p>
                    </div>
                    <Switch 
                        checked={privacy.showEmail}
                        onCheckedChange={(value) => handlePrivacyChange('showEmail', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Show Phone</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Show your phone number</p>
                    </div>
                    <Switch 
                        checked={privacy.showPhone}
                        onCheckedChange={(value) => handlePrivacyChange('showPhone', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Public Profile</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Make your profile public</p>
                    </div>
                    <Switch 
                        checked={privacy.publicProfile}
                        onCheckedChange={(value) => handlePrivacyChange('publicProfile', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Allow Student Messages</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Allow student messages</p>
                    </div>
                    <Switch 
                        checked={privacy.allowStudentMessages}
                        onCheckedChange={(value) => handlePrivacyChange('allowStudentMessages', value)}
                        className="data-[state=checked]:bg-[#5491CA]"
                    />
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
            {/* Account Settings */}
            <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20 dark:bg-gray-800/50 dark:border-gray-700">
                <CardTitle className="text-[#5491CA] dark:text-[#6ba2d8]">Account Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Language</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
                    </div>
                    <Select 
                        value={language}
                        onValueChange={handleLanguageChange}
                    >
                        <SelectTrigger className="border-gray-200 focus:ring-[#5491CA] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="portuguese">Portuguese</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Export Data</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Export your data</p>
                    </div>
                    <Button
                        onClick={handleExportData}
                        className="bg-[#5491CA]/10 text-[#5491CA] hover:bg-[#5491CA]/20 border border-[#5491CA]/20 dark:bg-[#5491CA]/20 dark:border-[#5491CA]/30 dark:text-[#6ba2d8]"
                    >
                        Export Data
                    </Button>
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-[#5491CA] font-medium dark:text-[#6ba2d8]">Delete Account</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Delete your account</p>
                    </div>
                    <Button
                        onClick={handleDeleteAccount}
                        className="bg-[#5491CA]/10 text-[#5491CA] hover:bg-[#5491CA]/20 border border-[#5491CA]/20 dark:bg-[#5491CA]/20 dark:border-[#5491CA]/30 dark:text-[#6ba2d8]"
                    >
                        Delete Account
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    );
    };

    export default TeacherSettings;
