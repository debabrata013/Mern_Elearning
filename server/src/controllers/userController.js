const User = require("../models/User");

exports.updateuserProfileadmin = async (req, res) => {
  try {
    const { id,userName, email,mobile, description, address, city, country, pincode, lindeninProfileUrl, githubprofileurl, Skills, Languages, Dob } = req.body;
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
   
    const {id, userName, email, description, mobile, university, branch, Semester, rollNumber, enrollmentNumber, lindeninProfileUrl, githubprofileurl, resumeurl} = req.body;

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
    

    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTeacherProfile = async (req, res) => {
    try {
        
        const { 
          id,
            userName, 
            description, 
            specialization, 
            resumeurl, address,
            githubprofileurl, 
            lindeninProfileUrl, 
        
            phone,
        
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
        user.subjectKnowledge = specialization;
        user.address=address;
        user.resumeurl = resumeurl;
        user.githubprofileurl = githubprofileurl;
        user.lindeninProfileUrl = lindeninProfileUrl;
  
        user.mobile = phone,
       

        await user.save();
        res.status(200).json({ message: "Teacher profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};