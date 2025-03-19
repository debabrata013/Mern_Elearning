const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter (using Gmail in this example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password or app-specific password
    }
});

// Helper function to send email
const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: `"AIGIRI Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent
    };
    return transporter.sendMail(mailOptions);
};

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
        console.log(userData);
        console.log(accessToken);
        console.log();
        

        return res.send({ userData, accessToken, success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Function to check OTP and update password
exports.checkOtpAndUpdatePassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body; // Get email, OTP, and new password from request body

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if the OTP matches
        if (user.otp !== otp) {
            user.otpCount = (user.otpCount || 0) + 1; // Increment OTP count
            await user.save(); // Save the updated user document

            // If OTP count exceeds 3, generate a new OTP and reset the count
            if (user.otpCount > 3) {
                const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                user.otp = newOtp;
                user.otpCount = 0; // Reset count after generating new OTP
                await user.save();

                // Send new OTP to user's email
                const subject = 'New OTP for Password Reset';
                const htmlContent = `
                    <div style="background-color: #f7f7f7; padding: 30px;">
                        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); padding: 20px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">New OTP for Password Reset</h1>
                            </div>
                            <div style="padding: 20px; color: #333333; font-family: Arial, sans-serif; line-height: 1.6;">
                                <p style="font-size: 18px;">Hello,</p>
                                <p style="font-size: 16px;">We received a request to reset your password. Please use the new OTP code below to proceed:</p>
                                <div style="margin: 30px 0; text-align: center;">
                                    <span style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: #ffffff; font-size: 20px; letter-spacing: 2px; border-radius: 5px;">${newOtp}</span>
                                </div>
                                <p style="font-size: 14px; color: #555;">Note: This OTP code will expire in 30 minutes for security reasons.</p>
                            </div>
                        </div>
                    </div>
                `;

                await sendEmail(user.email, subject, htmlContent);
                return res.status(400).send({ error: 'Invalid OTP. A new OTP has been sent to your email.' });
            }

            return res.status(400).send({ error: 'Invalid OTP. Please try again.' });
        }

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 8); // Ensure the new password is hashed
        user.otp = null; // Clear the OTP after successful verification
        user.otpCount = 0; // Reset OTP count after successful password update
        await user.save(); // Save the updated user document

        return res.send({ message: 'Password updated successfully' });
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

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        // Send OTP email
        const subject = 'Reset Your Password';
        const htmlContent = `
            <div style="background-color: #f7f7f7; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Reset Your Password</h1>
                    </div>
                    <div style="padding: 20px; color: #333333; font-family: Arial, sans-serif; line-height: 1.6;">
                        <p style="font-size: 18px;">Hello,</p>
                        <p style="font-size: 16px;">We received a request to reset your password. Please use the OTP code below to proceed:</p>
                        <div style="margin: 30px 0; text-align: center;">
                            <span style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: #ffffff; font-size: 20px; letter-spacing: 2px; border-radius: 5px;">${otp}</span>
                        </div>
                        <p style="font-size: 14px; color: #555;">Note: This OTP code will expire in 30 minutes for security reasons.</p>
                    </div>
                </div>
            </div>
        `;

        await sendEmail(email, subject, htmlContent);
        res.send({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Signup function
exports.signup = async (req, res) => {
    try {
        const { email, password, userName } = req.body; // Get email, password, and username from request body

        // Validate input
        if (!email || !password || !userName) {
            return res.status(400).send({ error: 'Email, password, and username are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            userName,
            otp: null, // Initialize OTP to null
            role: 'student',
            otpCount: 0, // Initialize OTP count
        });

        // Save the user to the database
        await newUser.save();

        // Send welcome email
        const subject = 'Welcome to AIGIRI - Your E-Learning Journey Begins!';
        const htmlContent = `
            <div style="background-color: #f7f7f7; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Welcome to AIGIRI!</h1>
                    </div>
                    <div style="padding: 20px; color: #333333; font-family: Arial, sans-serif; line-height: 1.6;">
                        <p style="font-size: 18px;">Hello ${userName},</p>
                        <p style="font-size: 16px;">Congratulations on taking the first step in your e-learning journey with AIGIRI!</p>
                        <p style="font-size: 16px;">Happy learning, <br/>The AIGIRI Team</p>
                    </div>
                </div>
            </div>
        `;

        await sendEmail(email, subject, htmlContent);

        // Optionally, generate a JWT token for the new user
        const accessToken = jwt.sign(
            {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profileImage: newUser.profileImage,
                role: newUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '120m' }
        );

        // Set access token in a cookie
        res.cookie('accessToken', accessToken, { httpOnly: true });

        // Send user data except password
        const { password: _, ...userData } = newUser.toObject();

        // Add all user data except password to the cookie
        res.cookie('userData', JSON.stringify(userData), { httpOnly: true });

        return res.status(201).send({ userData, accessToken, success: true, message: "Signup successful" });
    } catch (error) {
        res.status(500).send(error);
    }
};