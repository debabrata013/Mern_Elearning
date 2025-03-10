const User = require("../../models/User");
const Course = require("../../models/Course");
const Subscriber = require("../../models/subscriber");

const getAllteacherData= async(req,res)=>{
    try {
        const teacherData = await User.find({ role: "teacher" });
       
        res.json(teacherData);
        } catch (error) {
            res.status(500).json({ message: "Error fetching teacher data" });
            }
        }
const getAllCourseData= async(req,res)=>{
    try {
        const courseData = await Course.find();
        res.json(courseData);
        } catch (error) {
            res.status(500).json({ message: "Error fetching course data" });
            }
            }
const storeScbscriber= async(req,res)=>{
    try {
        const { email } = req.body;
        const subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            res.json({ message: "You are already subscribed" });
            } else {
                const newSubscriber = new Subscriber({ email });
                await newSubscriber.save();
                res.json({ message: "You have been subscribed" });
                }
                } catch (error) {
                    res.status(500).json({ message: "Error subscribing" });
                    }
                    }
                    module.exports = { getAllteacherData,getAllCourseData,storeScbscriber };

           


    
