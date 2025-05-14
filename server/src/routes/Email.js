const express = require('express');
const router = express.Router();
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

/* =========================
   Forgot Password Endpoint
========================= */
router.post('/forgot-password', async (req, res) => {
  const { email, name, otp } = req.body;
  if (!email || !name || !otp) {
    return res.status(400).json({ error: 'Missing required fields (email, name, otp)' });
  }

  const subject = 'Reset Your Password';
  const htmlContent = `
    <div style="background-color: #f7f7f7; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Reset Your Password</h1>
        </div>
        <!-- Body -->
        <div style="padding: 20px; color: #333333; font-family: Arial, sans-serif; line-height: 1.6;">
          <p style="font-size: 18px;">Hello ${name},</p>
          <p style="font-size: 16px;">We received a request to reset your password. Please use the OTP code below to proceed with resetting your password:</p>
          <div style="margin: 30px 0; text-align: center;">
            <span style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: #ffffff; font-size: 20px; letter-spacing: 2px; border-radius: 5px;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #555;">Note: This OTP code will expire in 30 minutes for security reasons.</p>
          <p style="font-size: 16px;">If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
          <p style="font-size: 16px;">Thank you,<br/>The AIGIRI Team</p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
          <p style="font-size: 12px; color: #777777; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} AIGIRI. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;

  try {
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});



/* =========================
   Registration Endpoint
========================= */
router.post('/registration', async (req, res) => {
  const { email, name } = req.body;
  
  console.log(email);
  console.log(name);
  console.log(req.body);
  
  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields (email, name)' });
  } 

  const subject = 'Welcome to AIGIRI - Your E-Learning Journey Begins!';
  const htmlContent = `
    <div style="background-color: #f7f7f7; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Welcome to AIGIRI!</h1>
        </div>
        <!-- Body -->
        <div style="padding: 20px; color: #333333; font-family: Arial, sans-serif; line-height: 1.6;">
          <p style="font-size: 18px;">Hello ${name},</p>
          <p style="font-size: 16px;">Congratulations on taking the first step in your e-learning journey with AIGIRI!</p>
          <p style="font-size: 16px;">Our platform offers a diverse range of courses designed to help you acquire new skills, boost your career, and explore your passions. With interactive lessons, expert instructors, and a vibrant community, you’ll have all the tools you need for success.</p>
          <p style="font-size: 16px;">Whether you're looking to learn at your own pace or dive into advanced topics, AIGIRI is here to support you every step of the way. Log in to your dashboard to explore your courses, join discussion groups, and start your personalized learning path today.</p>
          <p style="font-size: 16px;">Happy learning, <br/>The AIGIRI Team</p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
          <p style="font-size: 12px; color: #777777; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} AIGIRI. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;

  try {
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Registration email sent successfully' });
  } catch (error) {
    console.error('Error sending registration email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});



/* =========================
   Course Purchase Endpoint
========================= */
// router.post('/purchase', async (req, res) => {
//   const { email, name, courseName } = req.body;
//   if (!email || !name || !courseName) {
//     return res.status(400).json({ error: 'Missing required fields (email, name, courseName)' });
//   }

//   const subject = 'Course Purchase Confirmation';
//   const htmlContent = `
//     <div style="background-color: #f7f7f7; padding: 30px;">
//       <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
//         <!-- Header -->
//         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
//           <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Thank You for Your Purchase!</h1>
//         </div>
//         <!-- Body -->
//         <div style="padding: 20px; color: #333333; font-family: Arial, sans-serif; line-height: 1.6;">
//           <p style="font-size: 18px;">Hello ${name},</p>
//           <p style="font-size: 16px;">Thank you for purchasing the course:</p>
//           <p style="font-size: 18px; font-weight: bold;">${courseName}</p>
//           <p style="font-size: 16px;">We're excited to welcome you to our community of learners! Here are a few steps to help you get started:</p>
//           <ul style="font-size: 16px; margin-left: 20px;">
//             <li>Visit your <a href="https://yourplatform.com/dashboard" style="color: #667eea; text-decoration: none;">Dashboard</a> to access your course materials.</li>
//             <li>Check your inbox for additional resources and course guides.</li>
//             <li>Join our discussion forum to connect with instructors and fellow students.</li>
//           </ul>
//           <p style="font-size: 16px;">If you have any questions or need assistance, please contact our support team at <a href="mailto:support@aigiri.com" style="color: #667eea; text-decoration: none;">support@aigiri.com</a>.</p>
//           <p style="font-size: 16px;">Thank you for choosing AIGIRI. We wish you an enriching and successful learning experience!</p>
//           <p style="font-size: 16px;">Best regards,<br/>The AIGIRI Team</p>
//         </div>
//         <!-- Footer -->
//         <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
//           <p style="font-size: 12px; color: #777777; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} AIGIRI. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   `;

//   try {
//     await sendEmail(email, subject, htmlContent);
//     res.status(200).json({ message: 'Purchase confirmation email sent successfully' });
//   } catch (error) {
//     console.error('Error sending purchase email:', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });

router.post('/purchase', async (req, res) => {
  const { email, name, courseName } = req.body;

  if (!email || !name || !courseName) {
    return res.status(400).json({ error: 'Missing required fields (email, name, courseName)' });
  }

  // Student email
  const studentSubject = 'Course Purchase Request Received';
  const studentHtmlContent = `
    <div style="background-color: #f7f7f7; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #218838 100%); padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Purchase Request Received</h1>
        </div>
        <!-- Body -->
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <p>Hello ${name},</p>
          <p>Thank you for your interest in our course: <strong>${courseName}</strong>.</p>
          <p>Our sales team will contact you shortly via email with the payment details and next steps.</p>
          <p>If you have any questions, feel free to contact <a href="mailto:support@aigiri.com">support@aigiri.com</a>.</p>
          <p>— AIGIRI Team</p>
        </div>
        <div style="background-color: #f0f0f0; text-align: center; padding: 10px;">
          <small>© ${new Date().getFullYear()} AIGIRI. All rights reserved.</small>
        </div>
      </div>
    </div>
  `;

  // Admin email
  const adminEmail = process.env.ADMIN_EMAIL || 'gameknowledge2018@gmail.com';
  const adminSubject = 'New Course Purchase Interest';
  const adminHtmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Course Interest Received</h2>
      <p><strong>Student Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interested Course:</strong> ${courseName}</p>
      <p>Please reach out to the student to proceed with the payment process.</p>
    </div>
  `;

  try {
    // Send emails to student and admin
    await Promise.all([
      sendEmail(email, studentSubject, studentHtmlContent),
      sendEmail(adminEmail, adminSubject, adminHtmlContent)
    ]);

    res.status(200).json({ message: 'Emails sent to student and admin successfully' });
  } catch (error) {
    console.error('Error sending purchase emails:', error);
    res.status(500).json({ error: 'Failed to send purchase emails' });
  }
});
/* =========================
   Online Class Join Endpoint
========================= */
router.post('/class-join', async (req, res) => {
  const { email, name, startTime, joinLink } = req.body;
  if (!email || !name || !startTime || !joinLink) {
    return res.status(400).json({ error: 'Missing required fields (email, name, startTime, joinLink)' });
  }

  const subject = 'Online Class Joining Details';
  const htmlContent = `
    <html>
      <head>
        <style>
          /* Reset styles */
          body, html { margin: 0; padding: 0; font-family: 'Helvetica', Arial, sans-serif; }
          /* Button styles */
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #f0f0f0;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: background 0.3s ease, box-shadow 0.3s ease;
            max-width: 300px;
            width: auto;
            text-align: center;
          }
          .button:hover {
            background: #f0f0f0;
            box-shadow: 0 6px 8px rgba(0,0,0,0.15);
          }
          /* Header styles */
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            text-align: center;
            color: #fff;
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          }
          /* Content styles */
          .content {
            padding: 20px;
            font-family: 'Helvetica', Arial, sans-serif;
            color: #333;
          }
          .content p {
            font-size: 18px;
            line-height: 1.8;
          }
          /* Footer styles */
          .footer {
            background: #f0f0f0;
            padding: 10px;
            text-align: center;
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 12px;
            color: #777;
          }
          /* Container styles */
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          /* Icon styles */
          .icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0 auto 10px;
          }
          /* Responsive design */
          @media only screen and (max-width: 600px) {
            .container {
              max-width: 100%;
              margin: 10px;
            }
            .content p {
              font-size: 16px;
            }
            .header {
              font-size: 20px;
            }
            .button {
              display: block;
              width: 100%;
              max-width: none;
              padding: 15px 30px;
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body style="background-color: #f7f7f7;">
        <div class="container">
          <div class="header">
            <div class="icon"></div>
            Online Class Details
          </div>
          <div class="content">
            <p style="font-size: 18px;">Hi <span style="color: #667eea;">${name}</span>,</p>
            <p style="font-size: 18px;">Your class is scheduled to start at <strong style="color: #667eea;">${startTime}</strong>.</p>
            <p style="font-size: 18px;">Please join your online class using the button below:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${joinLink}" class="button">Join Class</a>
            </p>
            <p style="font-size: 18px;">We’re excited to have you join our session and explore new ideas together. Make sure you’re prepared and have a stable internet connection for the best experience.</p>
            <p style="font-size: 18px;">Looking forward to seeing you in class!</p>
            <p style="font-size: 18px;">Best regards,<br/><span style="color: #667eea;">The AIGIRI Team</span></p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} AIGIRI. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Class join email sent successfully' });
  } catch (error) {
    console.error('Error sending class join email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});


module.exports = router;
