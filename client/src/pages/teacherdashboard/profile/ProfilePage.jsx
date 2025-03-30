  import React, { useState } from 'react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
  import { Label } from '@/components/ui/label';
  import { Textarea } from '@/components/ui/textarea';
  import { 
    Camera, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Book, 
    Clock, 
    Save, 
    ArrowLeft, 
    FileText,  // Resume
    Github,    // GitHub
    Linkedin   // LinkedIn
  } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';

const ProfilePage = ({ onBack }) => {
  const user= JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState({
      id:user._id,
      userName: user?.userName,
      email: user?.email,
      phone: user?.mobile,
      address: user?.address,
      profileImage: user?.profileImage,
      description: user?.description,
      specialization: user?.subjectKnowledge,
      resumeurl:user?.resumeurl ,
      lindeninProfileUrl:user?.lindeninProfileUrl,
      githubprofileurl:user?.githubprofileurl

    });

    const [selectedImage, setSelectedImage] = useState(null);
    const handelChangeProifle= async(e)=>{
      try {
        const response = await axiosInstance.post("/pic/upload/", { userId: user._id, image: selectedImage });
    
        if (response.data) {
          // Remove old user data from localStorage
          localStorage.removeItem("user");
    
          // Store updated user data in localStorage
          localStorage.setItem("user", JSON.stringify(response.data));
          alert("profile updated")
          window.location.reload();
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
      
      
    }

    const handleProfileSubmit = async(e) => {
      e.preventDefault();
      try {
        const response= await axiosInstance.put("/u/teacher",userData);
        if(response.status==200){
          alert("Profile updated");
        }
        
      } catch (error) {
        console.log(error);
        
        alert("server error")
        
      }
     
    };

    return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#5491CA]" />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5491CA] to-[#7670AC] bg-clip-text text-transparent">
          My Profile
          </h1>
        </div>
        
      <div className="space-y-6">
        {/* Profile Image Card */}
        <Card className="border-[#5491CA]/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-[#5491CA] to-[#7670AC]">
                  
                      <img 
                        src={userData.profileImage} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover"
                      />
                  
                  </div>
                  
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[#5491CA]">{userData.userName}</h2>
                  <p className="text-gray-500">{userData.specialization}</p>
                </div>
                <div className="flex flex-wrap gap-3">
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
                    className="bg-[#5491CA] hover:bg-[#4a82b6] text-white"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                    upload Photo
                    </Button>
                    <Button type="button" onClick={handelChangeProifle}
                    className="bg-[#5491CA] hover:bg-[#4a82b6] text-white ml-5">
                      Change photo
                    </Button>

                </div>
              </div>
                </div>
              </CardContent>
            </Card>

        {/* Personal Information Card */}
        <Card className="border-[#5491CA]/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-[#5491CA]/10 bg-gradient-to-r from-[#5491CA]/5 to-[#7670AC]/5">
                <CardTitle className="text-[#5491CA]">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                        <User className="w-4 h-4" /> Full Name
                      </Label>
                      <Input
                        value={userData.userName}
                        onChange={e => setUserData({...userData, userName: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                    </div>

                <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                      </Label>
                      <Input
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                    </div>

                <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                      </Label>
                      <Input
                        value={userData.phone}
                        onChange={e => setUserData({...userData, phone: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                    </div>

                <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Address
                      </Label>
                      <Input
                        value={userData.address}
                        onChange={e => setUserData({...userData, address: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                  </div>
                  
                <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                      <Book className="w-4 h-4" /> Specialization
                    </Label>
                    <Input
                      value={userData.specialization}
                      onChange={e => setUserData({...userData, specialization: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                    />
                  </div>
                  <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Resume URL
                      </Label>
                      <Input
                        value={userData.resumeurl}
                        onChange={e => setUserData({...userData, resumeurl: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                  </div>
                  <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                        <Github className="w-4 h-4" /> GitHub URL
                      </Label>
                      <Input
                        value={userData.githubprofileurl}
                        onChange={e => setUserData({...userData, githubprofileurl: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                  </div>
                  <div className="space-y-2">
                  <Label className="text-[#5491CA] flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> LinkedIn URL
                      </Label>
                      <Input
                        value={userData.lindeninProfileUrl}
                        onChange={e => setUserData({...userData, lindeninProfileUrl: e.target.value})}
                    className="border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                      />
                  </div>
                  
            
                  </div>
                  
              <div className="space-y-2">
                <Label className="text-[#5491CA] flex items-center gap-2">
                      <Book className="w-4 h-4" /> Bio
                    </Label>
                    <Textarea
                      value={userData.description}
                      onChange={e => setUserData({...userData, description: e.target.value})}
                  className="min-h-[100px] border-[#5491CA]/20 focus:border-[#5491CA] focus:ring-[#5491CA]/20"
                    />
                  </div>
                  
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#5491CA] to-[#7670AC] hover:opacity-90 text-white"
              >
                    <Save className="w-4 h-4 mr-2" />
                Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
      </div>
      </div>
    );
  };

export default ProfilePage;