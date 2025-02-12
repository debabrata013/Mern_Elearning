// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const announcementRoutes = require('./src/routes/announcementRoutes');
// const schedule = require('node-schedule');
// const couponRoutes = require('./src/routes/couponRoutes'); // Import coupon routes
// const complaintRoutes = require('./src/routes/complaintRoutes');
//  // Import coupon model
// const { deleteExpiredCoupons } = require('./src/controllers/couponController'); // Import the deleteExpiredCoupons function


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using https
// }));

// // Database connection
// mongoose.connect(process.env.MONGO_URI).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
// });


// const jobRoutes=require('./src/routes/job')
// const studentRoutes = require('./src/routes/studentRoutes');
// const adminRoutes = require('./src/routes/adminRoutes');
// const teacherRoutes = require('./src/routes/teacherRoutes');
// const authRoutes = require('./src/routes/authRoutes');
// const cours=require("./src/routes/course")

// // Use routes
// app.use('/students', studentRoutes);
// app.use('/admins', adminRoutes);
// app.use('/teachers', teacherRoutes);
// app.use('/auth', authRoutes);
// app.use("/course",cours);
// app.use('/announcements', announcementRoutes);
// app.use('/coupons', couponRoutes);
// app.use('/complaints', complaintRoutes);
// app.use('/jobs',jobRoutes)
// const deleteOldAnnouncements = async () => {
//     try {
//       const sixDaysAgo = new Date();
//       sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
  
//       // Delete all announcements older than 6 days
//       const result = await Announcement.deleteMany({ createdAt: { $lt: sixDaysAgo } });
//       console.log(`${result.deletedCount} announcements older than 6 days deleted.`);
//     } catch (err) {
//       console.error('Error deleting old announcements:', err);
//     }
//   };
  
//   schedule.scheduleJob('0 0 * * *', deleteOldAnnouncements); 
//   schedule.scheduleJob('0 0 * * *', deleteExpiredCoupons);
  

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const schedule = require('node-schedule');

// Load environment variables
dotenv.config();

// Import routes
const announcementRoutes = require('./src/routes/announcementRoutes');
const couponRoutes = require('./src/routes/couponRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const jobRoutes = require('./src/routes/job');
const studentRoutes = require('./src/routes/studentRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/course');

// Import controllers/models for scheduled tasks
const { deleteExpiredCoupons } = require('./src/controllers/couponController');
const Announcement = require('./src/models/Announcement');

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================================
// Middleware Setup
// =====================================================

// Set secure HTTP headers
app.use(helmet());

// Log HTTP requests in development
app.use(morgan('dev'));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie and CORS configuration
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Restrict origins if needed
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // Use secure cookies in production environments
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// =====================================================
// Database Connection
// =====================================================

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// =====================================================
// Route Definitions
// =====================================================

app.use('/students', studentRoutes);
app.use('/admins', adminRoutes);
app.use('/teachers', teacherRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes); // changed from "/course" to "/courses" for consistency
app.use('/announcements', announcementRoutes);
app.use('/coupons', couponRoutes);
app.use('/complaints', complaintRoutes);
app.use('/jobs', jobRoutes);

// =====================================================
// Scheduled Jobs
// =====================================================

// Function to delete announcements older than 6 days
const deleteOldAnnouncements = async () => {
  try {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
    const result = await Announcement.deleteMany({ createdAt: { $lt: sixDaysAgo } });
    console.log(`${result.deletedCount} announcements older than 6 days deleted.`);
  } catch (err) {
    console.error('Error deleting old announcements:', err);
  }
};

// Schedule jobs to run daily at midnight (server time)
schedule.scheduleJob('0 0 * * *', () => {
  console.log('Running scheduled job: deleteOldAnnouncements');
  deleteOldAnnouncements();
});

schedule.scheduleJob('0 0 * * *', () => {
  console.log('Running scheduled job: deleteExpiredCoupons');
  deleteExpiredCoupons();
});

// =====================================================
// Global Error Handling Middleware
// =====================================================

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// =====================================================
// Start Server
// =====================================================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
