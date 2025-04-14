const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');  // 🆕 Needed for socket.io
const { Server } = require('socket.io'); // 🆕

dotenv.config();

const app = express();
const server = http.createServer(app); // 🆕 Create server for socket.io
const io = new Server(server, {
    cors: {
        origin: '*', // ⚠️ Adjust to match your frontend domain
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// 🆕 Routes for doubts and messages
const doubtRoutes = require('./src/routes/doubtRoutes');
const messageRoutes = require('./src/routes/messageRoutes');

// 🔁 Import other routes
const announcementRoutes = require('./src/routes/announcementRoutes');
const couponRoutes = require('./src/routes/couponRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const ProfileRouters = require('./src/routes/profileRoutes');
const jobRoutes = require('./src/routes/job');
const studentRoutes = require('./src/routes/studentRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require("./src/routes/course");
const quize = require("./src/routes/quize");
const adminlandin = require("./src/routes/admin_Landing");
const contactRoutes = require('./src/routes/contactRoutes');
const MailRoutes = require("./src/routes/Email");
const landingRoutes = require('./src/routes/landingRouters');
const cartRoutes = require('./src/routes/cartRoutes');
const TodoRoutes = require('./src/routes/TodoRouters');
const UserRoutes = require('./src/routes/userRoutes');
const picRouters = require('./src/routes/picrouter');
const LRouter = require("./src/routes/lechcherRoutes");
const todoRoutes = require('./src/routes/TodoRouters');
const StudentAssigementRouter = require("./src/routes/studentAssignments")
const TeacherAssigementRouter = require("./src/routes/teacherAssignments")
const asdRoutes= require("./src/routes/util")



// 🧠 Doubt Chat Sockets
require('./src/sockets/doubtSocket')(io); // <-- pass io to socket handler

// ⛳ Mount All Routes
app.use('/students', studentRoutes);
app.use('/admins', adminRoutes);
app.use('/teachers', teacherRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/announcements', announcementRoutes);
app.use('/coupons', couponRoutes);
app.use('/complaints', complaintRoutes);
app.use('/jobs', jobRoutes);
app.use('/quize', quize);
app.use("/data", adminlandin);
app.use("/landing", landingRoutes);
app.use("/profile", ProfileRouters);
app.use("/contactus/", contactRoutes);
app.use("/mail/", MailRoutes);
// app.use('/cart', cartRoutes);
// app.use('/todos', TodoRoutes);
app.use("/u", UserRoutes);
app.use('/pic', picRouters);
app.use("/lac", LRouter);
const carteRoutes = require('./src/routes/cart');
app.use("/api/course/",asdRoutes)//
app.use('/api/doubts', doubtRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/todos', todoRoutes);//
app.use("/api/teacher/assignments", TeacherAssigementRouter);//
app.use("/api/student/assignments",StudentAssigementRouter);
app.use('/api/cart', carteRoutes);
// Start server with Socket.io support
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

