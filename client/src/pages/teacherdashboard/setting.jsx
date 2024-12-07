import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';

const SettingsContent = () => {
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Handle name change submission
    console.log('Name submitted:', name);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    // Handle image submission
    console.log('Image submitted:', selectedImage);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Change Section */}
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-600">Change Name</Label>
              <div className="flex gap-4">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter new name"
                  className="border-blue-200 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Update Name
                </Button>
              </div>
            </div>
          </form>

          {/* Profile Image Section */}
          <form onSubmit={handleImageSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-image" className="text-blue-600">Change Profile Image</Label>
              <div className="flex gap-4">
                <div className="relative">
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
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                  {selectedImage && (
                    <span className="ml-2 text-sm text-blue-600">
                      {selectedImage.name}
                    </span>
                  )}
                </div>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!selectedImage}
                >
                  Update Image
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsContent;