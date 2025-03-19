const express = require('express');
const { addToCart, buyCourses } = require('../controllers/cart'); // Import the cart controller
const router = express.Router();
 // Assuming you have an authentication middleware

// Route to add a course to the cart
router.post('/add', addToCart);

// Route to buy courses in the cart
router.post('/buy',  buyCourses);

module.exports = router; 