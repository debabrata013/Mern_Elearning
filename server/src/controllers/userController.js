const User = require("../models/User");

exports.updateuserProfileadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, description, address, city, country, pincode, lindeninProfileUrl, githubprofileurl, Skills, Languages, Dob, mobile } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userName = userName;
    user.email = email;
    user.description = description;
    user.address = address;
    user.city = city;
    user.country = country;
    user.pincode = pincode;
    user.lindeninProfileUrl = lindeninProfileUrl;
    user.githubprofileurl = githubprofileurl;
    user.Skills = Skills;
    user.Languages = Languages;
    user.Dob = Dob;
    user.mobile = mobile;

    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateuserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, description, mobile, university, branch, Semester, rollNumber, enrollmentNumber, lindeninProfileUrl, githubprofileurl, resumeurl, Skills, Languages, Dob } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userName = userName;
    user.email = email;
    user.description = description;
    user.mobile = mobile;
    user.university = university;
    user.branch = branch;
    user.Semester = Semester;
    user.rollNumber = rollNumber;
    user.enrollmentNumber = enrollmentNumber;
    user.lindeninProfileUrl = lindeninProfileUrl;
    user.githubprofileurl = githubprofileurl;
    user.resumeurl = resumeurl;
    user.Skills = Skills;
    user.Languages = Languages;
    user.Dob = Dob;

    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTeacherProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            userName, 
            description, 
            subjectKnowledge, 
            resumeurl, 
            githubprofileurl, 
            lindeninProfileUrl, 
            Skills, 
            mobile,
        
        } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the user is a teacher
        if (user.role !== 'teacher') {
            return res.status(403).json({ message: "Profile update is only allowed for teachers" });
        }

        user.userName = userName;
        user.description = description;
        user.subjectKnowledge = subjectKnowledge;
        user.resumeurl = resumeurl;
        user.githubprofileurl = githubprofileurl;
        user.lindeninProfileUrl = lindeninProfileUrl;
        user.Skills = Skills;
        user.mobile = mobile;
       

        await user.save();
        res.status(200).json({ message: "Teacher profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};