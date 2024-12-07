// controllers/auth-controller/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../../models/User'); // Adjust the path as needed
const jwt = require('jsonwebtoken');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback', // Replace with your URL
}, async (token, tokenSecret, profile, done) => {
  const { id, displayName, emails } = profile;
  
  try {
    let user = await User.findOne({ userEmail: emails[0].value });
    if (!user) {
      user = new User({
        userName: displayName,
        userEmail: emails[0].value,
        role: 'user',
        googleId: id,
      });
      await user.save();
    }

    // Generate JWT for the authenticated user
    const accessToken = jwt.sign(
      { _id: user._id, userName: user.userName, userEmail: user.userEmail, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '120m' }
    );

    return done(null, { user, accessToken });
  } catch (error) {
    console.error(error);
    return done(error, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/github/callback', // Replace with your URL
}, async (token, tokenSecret, profile, done) => {
  const { id, username, emails } = profile;
  
  try {
    let user = await User.findOne({ userEmail: emails[0].value });
    if (!user) {
      user = new User({
        userName: username,
        userEmail: emails[0].value,
        role: 'user',
        githubId: id,
      });
      await user.save();
    }

    // Generate JWT for the authenticated user
    const accessToken = jwt.sign(
      { _id: user._id, userName: user.userName, userEmail: user.userEmail, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '120m' }
    );

    return done(null, { user, accessToken });
  } catch (error) {
    console.error(error);
    return done(error, null);
  }
}));

// Serialize and Deserialize user for session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
