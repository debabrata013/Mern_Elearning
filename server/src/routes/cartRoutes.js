const express = require('express');
const { addToCart, buyCourses } = require('../controllers/cart'); // Import the cart controller
const router = express.Router();
const Course = require('../models/Course'); // Assuming you have a Course model
 // Assuming you have an authentication middleware

// Route to add a course to the cart
router.post('/add', addToCart);
router.get('/', async (req, res) => {
    try {
        const {cart}= req.body; // Assuming you have a way to get the logged-in user
       
        // cart having a array inwhich course ids are present send all the course details present in the card
        const courses = await Course.find({ _id: { $in: cart } });
        if (!courses) {
            return res.status(404).json({ message: 'Courses not found' });
        }
        res.status(200).json(courses);
       
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

// Route to buy courses in the cart
router.post('/buy',  buyCourses);

module.exports = router; 