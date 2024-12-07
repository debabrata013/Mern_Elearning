const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth-controller/index");
const passport = require('../../controllers/auth-controller/passport');
const authenticateMiddleware = require("../../middleware/auth-middleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Check if the user is authenticated (protected route)
router.get("/check-auth", authenticateMiddleware, (req, res) => {
  const user = req.user; // The user object will be added to the request by the auth middleware

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    data: {
      user,
    },
  });
});

// Google Authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`http://localhost:3000/dashboard?token=${req.user.accessToken}`);
  }
);

// GitHub Authentication route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`http://localhost:3000/dashboard?token=${req.user.accessToken}`);
  }
);

module.exports = router;
