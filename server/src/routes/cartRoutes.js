const express = require('express');
const { addToCart, buyCourses } = require('../controllers/cart'); // Import the cart controller
const router = express.Router();
const { authenticate } = require('../middleware/auth'); // Assuming you have an authentication middleware

// Route to add a course to the cart
router.post('/add', authenticate, addToCart);

// Route to buy courses in the cart
router.post('/buy', authenticate, buyCourses);

module.exports = router; 