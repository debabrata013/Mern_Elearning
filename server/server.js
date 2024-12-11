// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth-routes/index");
// const mediaRoutes = require("./routes/instructor-routes/media-routes");
// const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
// const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
// const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
// const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
// const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true, // If you need to include cookies in requests
// }));
// // app.use(
// //   cors({
// //     origin: process.env.CLIENT_URL,
// //     methods: ["GET", "POST", "DELETE", "PUT"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );

// app.use(express.json());

// //database connection
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("mongodb is connected"))
//   .catch((e) => console.log(e));

// //routes configuration
// app.use("/auth", authRoutes);
// app.use("/media", mediaRoutes);
// app.use("/instructor/course", instructorCourseRoutes);
// app.use("/student/course", studentViewCourseRoutes);
// app.use("/student/order", studentViewOrderRoutes);
// app.use("/student/courses-bought", studentCoursesRoutes);
// app.use("/student/course-progress", studentCourseProgressRoutes);

// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is now running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');


const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");
const apiRoutes =require("./routes/api/job")
const courseRoutes = require('./routes/courseRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const progressRoutes = require('./routes/progressRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in the environment variables.");
  process.exit(1);
}

// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true,
// }));

app.use(express.json());
const s3 = new aws.S3();


// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });


// Use CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
  credentials: true,  // Enable cookies or authorization headers
}));

// Routes configuration
app.use("/auth", authRoutes);
app.use("/api/jobs",apiRoutes)
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);
app.use('/courses', courseRoutes);
app.use('/upload', uploadRoutes);
app.use('/progress', progressRoutes);
app.use('/api', userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log detailed error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong.",
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

