const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const announcementRoutes = require('./src/routes/announcementRoutes');
const schedule = require('node-schedule');
const couponRoutes = require('./src/routes/couponRoutes'); // Import coupon routes
const complaintRoutes = require('./src/routes/complaintRoutes');
 // Import coupon model
const { deleteExpiredCoupons } = require('./src/controllers/couponController'); // Import the deleteExpiredCoupons function


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

// Database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


const jobRoutes=require('./src/routes/job')
const studentRoutes = require('./src/routes/studentRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes=require("./src/routes/course")
const quize=require("./src/routes/quize")
const adminlandin=require("./src/routes/admin_Landing");
const contactRoutes = require('./src/routes/contactRoutes');
const MailRoutes =require("./src/routes/Email")

// Use routes
app.use('/students', studentRoutes);
app.use('/admins', adminRoutes);

app.use('/teachers', teacherRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/announcements', announcementRoutes);
app.use('/coupons', couponRoutes);
app.use('/complaints', complaintRoutes);
app.use('/jobs',jobRoutes)
app.use('/quize',quize)
app.use("/data",adminlandin)
app.use("/contactus/",contactRoutes)
app.use("/mail/",MailRoutes);

const deleteOldAnnouncements = async () => {
    try {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
  
      // Delete all announcements older than 6 days
      const result = await Announcement.deleteMany({ createdAt: { $lt: sixDaysAgo } });
      console.log(`${result.deletedCount} announcements older than 6 days deleted.`);
    } catch (err) {
      console.error('Error deleting old announcements:', err);
    }
  };
  
  schedule.scheduleJob('0 0 * * *', deleteOldAnnouncements); 
  schedule.scheduleJob('0 0 * * *', deleteExpiredCoupons);
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
