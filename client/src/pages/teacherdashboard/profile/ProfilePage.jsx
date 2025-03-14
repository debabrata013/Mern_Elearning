import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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

const TeacherSettings = () => {
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
  const [theme, setTheme] = useState('light');
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', userData);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    console.log('Image updated:', selectedImage);
    // Show success message
    alert('Profile image updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password update:', passwords);
    // Show success message
    alert('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAppearanceChange = (key, value) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
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
      alert('Account deletion request submitted. An administrator will contact you.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] bg-clip-text text-transparent">
          Teacher Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your profile, preferences, and account settings
        </p>
      </div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA]">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA]">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA]">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA]">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5491CA]/20 data-[state=active]:to-[#b1a9f1]/20 data-[state=active]:text-[#5491CA]">
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Image */}
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Profile Image</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-[#5491CA]/20">
                  {selectedImage ? (
                    <img 
                      src={URL.createObjectURL(selectedImage)} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userData.profileImage ? (
                      <img 
                        src={userData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#5491CA]/30 to-[#b1a9f1]/30">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )
                  )}
                </div>
                
                <form onSubmit={handleImageSubmit} className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById('profile-image').click()}
                      className="bg-[#5491CA]/10 text-[#5491CA] hover:bg-[#5491CA]/20 border border-[#5491CA]/20"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                    {selectedImage && (
                      <span className="text-[#5491CA] text-sm">{selectedImage.name}</span>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={!selectedImage}
                    className="bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Image
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      value={userData.userName}
                      onChange={e => setUserData({...userData, userName: e.target.value})}
                      className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address
                    </Label>
                    <Input
                      value={userData.email}
                      onChange={e => setUserData({...userData, email: e.target.value})}
                      className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div>
                    <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </Label>
                    <Input
                      value={userData.phone}
                      onChange={e => setUserData({...userData, phone: e.target.value})}
                      className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Address
                    </Label>
                    <Input
                      value={userData.address}
                      onChange={e => setUserData({...userData, address: e.target.value})}
                      className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                    <Book className="w-4 h-4" /> Specialization
                  </Label>
                  <Input
                    value={userData.specialization}
                    onChange={e => setUserData({...userData, specialization: e.target.value})}
                    className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                    placeholder="Your teaching specialization"
                  />
                </div>
                
                <div>
                  <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Experience
                  </Label>
                  <Input
                    value={userData.experience}
                    onChange={e => setUserData({...userData, experience: e.target.value})}
                    className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                    placeholder="Your teaching experience"
                  />
                </div>
                
                <div>
                  <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                    <Book className="w-4 h-4" /> Education
                  </Label>
                  <Input
                    value={userData.education}
                    onChange={e => setUserData({...userData, education: e.target.value})}
                    className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA]"
                    placeholder="Your educational background"
                  />
                </div>
                
                <div>
                  <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                    <Book className="w-4 h-4" /> Bio
                  </Label>
                  <Textarea
                    value={userData.description}
                    onChange={e => setUserData({...userData, description: e.target.value})}
                    className="mt-2 border-gray-200 focus:border-[#5491CA] focus:ring-[#5491CA] min-h-[100px]"
                    placeholder="Tell us about yourself"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Salary Display */}
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Salary Information</CardTitle>
              <CardDescription>View your current salary details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-[#5491CA] font-medium">Current Salary</Label>
                  <Input
                    value={`$${userData.salary.toLocaleString()}`}
                    disabled
                    className="mt-2 bg-[#5491CA]/5 border-[#5491CA]/20 text-[#5491CA] font-medium"
                  />
                </div>
                <div>
                  <Label className="text-[#5491CA] font-medium">Payment Schedule</Label>
                  <Input
                    value="Monthly (1st of each month)"
                    disabled
                    className="mt-2 bg-[#5491CA]/5 border-[#5491CA]/20 text-[#5491CA] font-medium"
                  />
                </div>
              </div>
              <div className="mt-4 p-4 bg-[#5491CA]/5 rounded-lg border border-[#5491CA]/20">
                <p className="text-sm text-gray-600">
                  For any salary-related inquiries, please contact the HR department at <span className="text-[#5491CA] font-medium">hr@example.com</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Theme Settings</CardTitle>
              <CardDescription>Customize your dashboard appearance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#5491CA] font-medium">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-gray-500" />
                    <Switch 
                      checked={theme === 'dark'} 
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                    <Moon className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#5491CA] font-medium">Color Scheme</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {['blue', 'purple', 'green', 'orange', 'pink'].map(color => (
                      <button
                        key={color}
                        onClick={() => handleAppearanceChange('colorScheme', color)}
                        className={`h-10 rounded-md ${
                          appearance.colorScheme === color ? 'ring-2 ring-[#5491CA] ring-offset-2' : ''
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
                  <Label className="text-[#5491CA] font-medium">Font Size</Label>
                  <Select 
                    value={appearance.fontSize} 
                    onValueChange={(value) => handleAppearanceChange('fontSize', value)}
                  >
                    <SelectTrigger className="border-gray-200 focus:ring-[#5491CA]">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#5491CA] font-medium">Reduced Motion</Label>
                    <p className="text-sm text-gray-500">Minimize animations</p>
                  </div>
                  <Switch 
                    checked={appearance.reducedMotion} 
                    onCheckedChange={(checked) => handleAppearanceChange('reducedMotion', checked)}
                    className="data-[state=checked]:bg-[#5491CA]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#5491CA] font-medium">High Contrast</Label>
                    <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <Switch 
                    checked={appearance.highContrast} 
                    onCheckedChange={(checked) => handleAppearanceChange('highContrast', checked)}
                    className="data-[state=checked]:bg-[#5491CA]"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Language Settings</CardTitle>
              <CardDescription>Choose your preferred language</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#5491CA] font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Interface Language
                  </Label>
                  <Select 
                    value={language} 
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger className="border-gray-200 focus:ring-[#5491CA]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white">
                  <Languages className="w-4 h-4 mr-2" />
                  Update Language
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#5491CA]">Notification Channels</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Browser Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                    </div>
                    <Switch 
                      checked={notifications.browser} 
                      onCheckedChange={(checked) => handleNotificationChange('browser', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mobile Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications on your mobile device</p>
                    </div>
                    <Switch 
                      checked={notifications.mobile} 
                      onCheckedChange={(checked) => handleNotificationChange('mobile', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#5491CA]">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Platform Updates</Label>
                      <p className="text-sm text-gray-500">New features and improvements</p>
                    </div>
                    <Switch 
                      checked={notifications.updates} 
                      onCheckedChange={(checked) => handleNotificationChange('updates', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Student Messages</Label>
                      <p className="text-sm text-gray-500">Messages from your students</p>
                    </div>
                    <Switch 
                      checked={notifications.studentMessages} 
                      onCheckedChange={(checked) => handleNotificationChange('studentMessages', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Admin Messages</Label>
                      <p className="text-sm text-gray-500">Messages from administrators</p>
                    </div>
                    <Switch 
                      checked={notifications.adminMessages} 
                      onCheckedChange={(checked) => handleNotificationChange('adminMessages', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Privacy Settings</CardTitle>
              <CardDescription>Control your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#5491CA]">Notification Channels</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Browser Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                    </div>
                    <Switch 
                      checked={notifications.browser} 
                      onCheckedChange={(checked) => handleNotificationChange('browser', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mobile Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications on your mobile device</p>
                    </div>
                    <Switch 
                      checked={notifications.mobile} 
                      onCheckedChange={(checked) => handleNotificationChange('mobile', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#5491CA]">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Platform Updates</Label>
                      <p className="text-sm text-gray-500">New features and improvements</p>
                    </div>
                    <Switch 
                      checked={notifications.updates} 
                      onCheckedChange={(checked) => handleNotificationChange('updates', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Student Messages</Label>
                      <p className="text-sm text-gray-500">Messages from your students</p>
                    </div>
                    <Switch 
                      checked={notifications.studentMessages} 
                      onCheckedChange={(checked) => handleNotificationChange('studentMessages', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Admin Messages</Label>
                      <p className="text-sm text-gray-500">Messages from administrators</p>
                    </div>
                    <Switch 
                      checked={notifications.adminMessages} 
                      onCheckedChange={(checked) => handleNotificationChange('adminMessages', checked)}
                      className="data-[state=checked]:bg-[#5491CA]"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <Card className="border-[#5491CA]/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-[#5491CA]/20">
              <CardTitle className="text-[#5491CA]">Account Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#5491CA]">Export Data</h3>
                  <Button className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#5491CA]">Delete Account</h3>
                  <Button className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] hover:opacity-90 text-white" onClick={handleDeleteAccount}>
                    <Trash2 className="w-4 h-4 mr-2" />
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