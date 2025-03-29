const express = require('express');
const { addToCart, buyCourses } = require('../controllers/cart'); // Import the cart controller
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
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
// Route to remove a course from the cart
router.post('/remove', async (req, res) => {
    try {
        const { courseId, userId } = req.body; // Assuming you have a way to get the logged-in user
//remove the course id from the cart array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: courseId } },
            { new: true }
        );
        // Check if the user was found and updated
         // If the user is not found, return a 404 error
         // If the user is found but not updated, return a 404 error
        // If the user is found and updated, return a success message
        // If the user is not found, return a 404 error
        // If the user is found but not updated, return a 404 error
        // If the user is found and updated, return a success message
        // If the user is not found, return a 404 error
      

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Course removed from cart successfully hola' });
    } catch (error) {
        console.error('Error removing course from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to buy courses in the cart
router.post('/buy',  buyCourses);

module.exports = router; 