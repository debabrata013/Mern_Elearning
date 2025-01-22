// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Camera } from 'lucide-react';

// const SettingsContent = () => {
//   const [name, setName] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     // Handle name change submission
//     console.log('Name submitted:', name);
//   };

//   const handleImageSubmit = (e) => {
//     e.preventDefault();
//     // Handle image submission
//     console.log('Image submitted:', selectedImage);
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
//       <Card className="border-blue-200">
//         <CardHeader>
//           <CardTitle className="text-blue-700">Settings</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Name Change Section */}
//           <form onSubmit={handleNameSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name" className="text-blue-600">Change Name</Label>
//               <div className="flex gap-4">
//                 <Input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter new name"
//                   className="border-blue-200 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <Button 
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   Update Name
//                 </Button>
//               </div>
//             </div>
//           </form>

//           {/* Profile Image Section */}
//           <form onSubmit={handleImageSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="profile-image" className="text-blue-600">Change Profile Image</Label>
//               <div className="flex gap-4">
//                 <div className="relative">
//                   <Input
//                     id="profile-image"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => setSelectedImage(e.target.files[0])}
//                   />
//                   <Button
//                     type="button"
//                     onClick={() => document.getElementById('profile-image').click()}
//                     className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
//                   >
//                     <Camera className="w-4 h-4 mr-2" />
//                     Choose Image
//                   </Button>
//                   {selectedImage && (
//                     <span className="ml-2 text-sm text-blue-600">
//                       {selectedImage.name}
//                     </span>
//                   )}
//                 </div>
//                 <Button 
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                   disabled={!selectedImage}
//                 >
//                   Update Image
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SettingsContent;
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';

const TeacherSettings = () => {
  const [userData, setUserData] = useState({
    userName: '',
    description: '',
    salary: 50000,
    profileImage: ''
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { userName: userData.userName, description: userData.description });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    console.log('Image updated:', selectedImage);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password update:', passwords);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Teacher Settings</h1>
      
      {/* Personal Information */}
      <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-700">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <Label className="text-blue-600 font-medium">Username</Label>
              <Input
                value={userData.userName}
                onChange={e => setUserData({...userData, userName: e.target.value})}
                className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label className="text-blue-600 font-medium">Description</Label>
              <Input
                value={userData.description}
                onChange={e => setUserData({...userData, description: e.target.value})}
                className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                placeholder="Add a brief description"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Profile Image */}
      <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-700">Profile Image</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleImageSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
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
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
              >
                <Camera className="w-5 h-5 mr-2" />
                Choose Image
              </Button>
              {selectedImage && (
                <span className="text-blue-600">{selectedImage.name}</span>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={!selectedImage}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Image
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Salary Display */}
      <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-700">Salary Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div>
            <Label className="text-blue-600 font-medium">Current Salary</Label>
            <Input
              value={`$${userData.salary.toLocaleString()}`}
              disabled
              className="mt-2 bg-blue-50 border-blue-200 text-blue-700 font-medium"
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-700">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <Label className="text-blue-600 font-medium">Current Password</Label>
              <Input
                type="password"
                value={passwords.current}
                onChange={e => setPasswords({...passwords, current: e.target.value})}
                className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div>
              <Label className="text-blue-600 font-medium">New Password</Label>
              <Input
                type="password"
                value={passwords.new}
                onChange={e => setPasswords({...passwords, new: e.target.value})}
                className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div>
              <Label className="text-blue-600 font-medium">Confirm Password</Label>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSettings;