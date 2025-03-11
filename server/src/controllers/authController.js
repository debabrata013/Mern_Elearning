const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
// exports.signup = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).send({ message: 'User created successfully' });
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        // Generate access token
        const accessToken = jwt.sign(
            {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                profileImage: user.profileImage,
                resumeurl:user.resumeurl,
                lindeninProfileUrl:user.lindeninProfileUrl,
                githubprofileurl:user.githubprofileurl,
                
                
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '120m' }
        );

        // Set access token in a cookie
        res.cookie('accessToken', accessToken, { httpOnly: true });

        // Send user data except password
        const { password: _, ...userData } = user.toObject();

        // Add all user data except password to the cookie
        res.cookie('userData', JSON.stringify(userData), { httpOnly: true });

        return res.send({ userData, accessToken, success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Generate OTP or reset token logic here
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        // Send OTP to user's email (implement email sending logic)
        res.send({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).send(error);
    }
};