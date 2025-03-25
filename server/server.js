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
const ProfileRouters = require('./src/routes/profileRoutes');
 // Import coupon model
const { deleteExpiredCoupons } = require('./src/controllers/couponController'); // Import the deleteExpiredCoupons function
 // Import cart routes


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
const landingRoutes = require('./src/routes/landingRouters');
const cartRoutes = require('./src/routes/cartRoutes');
const TodoRoutes = require('./src/routes/TodoRouters');

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
app.use("/landing",landingRoutes);
app.use("/profile",ProfileRouters)
app.use("/contactus/",contactRoutes)
app.use("/mail/",MailRoutes);
app.use('/cart', cartRoutes); // Add this line to use cart routes
app.use('/todos', TodoRoutes);


  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
