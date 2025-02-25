const User = require("../../models/User"); // Import your User model
const Course = require("../../models/Course"); // Import your Course model
const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).send(totalUsers.toString()); // Send as plain text
    } catch (error) {
        res.status(500).send("Error fetching user count");
    }
};

// Get total number of teachers
const getTotalTeachers = async (req, res) => {
    try {
        const totalTeachers = await User.countDocuments({ role: "teacher" });
        res.status(200).send(totalTeachers.toString()); // Send as plain text
    } catch (error) {
        res.status(500).send("Error fetching teacher count");
    }
};

// Get total number of students
const getTotalStudents = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        res.status(200).send(totalStudents.toString()); // Send as plain text
    } catch (error) {
        res.status(500).send("Error fetching student count");
    }
};
const getCourse = async (req, res) => {
    try{
         const totalCourse= await Course.countDocuments();
        res.status(200).send(totalCourse.toString());
    }catch(error){
        res.status(500).send("Error fetching course count");
    }
}
module.exports = { getTotalUsers, getTotalTeachers, getTotalStudents,getCourse };


