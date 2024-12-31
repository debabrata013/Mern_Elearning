import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/UIComponents";
import { Input } from "./ui/UIComponents";
import { Label } from "./ui/UIComponents";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Book,
  Award,
  Edit,
  X,
  Save,
} from "lucide-react";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Anderson",
    studentId: "STU2024135",
    email: "sarah.anderson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Drive, University City, ST 12345",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.89",
    enrollmentDate: "2022",
    currentCourses: "Advanced Algorithms, Database Systems, Web Development",
    achievements: "Dean's List (3 semesters), Hackathon Winner 2023",
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
          {!isEditing && (
            <Button onClick={handleEdit} className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Photo Section */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mt-3">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {isEditing ? (
                    <Input
                      value={editedData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="text-center"
                    />
                  ) : (
                    profileData.name
                  )}
                </h2>
                <p className="text-gray-500">
                  Student ID: {profileData.studentId}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Main Profile Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Address
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.address}</p>
                    )}
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Book className="w-4 h-4" /> Major
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.major}
                        onChange={(e) => handleChange("major", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.major}</p>
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Year
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.year}
                        onChange={(e) => handleChange("year", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.year}</p>
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <Award className="w-4 h-4" /> GPA
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.gpa}
                        onChange={(e) => handleChange("gpa", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.gpa}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Enrollment Date
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedData.enrollmentDate}
                      onChange={(e) =>
                        handleChange("enrollmentDate", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-600">
                      {profileData.enrollmentDate}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Current Courses</Label>
                  {isEditing ? (
                    <Input
                      value={editedData.currentCourses}
                      onChange={(e) =>
                        handleChange("currentCourses", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-600">
                      {profileData.currentCourses}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Achievements</Label>
                  {isEditing ? (
                    <Input
                      value={editedData.achievements}
                      onChange={(e) =>
                        handleChange("achievements", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.achievements}</p>
                  )}
                </div>
              </div>

              {/* Edit Mode Buttons */}
              {isEditing && (
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
