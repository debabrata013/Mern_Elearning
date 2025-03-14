// Mearn_Elearning/server/src/config/passport-setup.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    const existingUser = await User.findOne({ githubId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }

    // If not, create a new user in our db
    const newUser = await new User({
        userName: profile.username,
        githubId: profile.id,
        profileImage: profile._json.avatar_url,
        email: profile._json.email || `${profile.username}@github.com`, // GitHub may not provide email
        role: 'student'
    }).save();
    done(null, newUser);
}));