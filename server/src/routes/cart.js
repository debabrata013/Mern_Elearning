// routes/cart.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// Add to Cart
router.post('/add/:courseId', async (req, res) => {
    const userId = req.user._id; // after authentication middleware
    const { courseId } = req.params;

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Already purchased check
        if (user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ message: "You already own this course" });
        }

        // Already in cart?
        if (user.cart.includes(courseId)) {
            return res.status(400).json({ message: "Course already in cart" });
        }

        user.cart.push(courseId);
        await user.save();

        res.status(200).json({ message: "Course added to cart successfully", cart: user.cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.delete('/remove/:courseId', async (req, res) => {
    const userId = req.user._id;
    const { courseId } = req.params;

    try {
        const user = await User.findById(userId);
        user.cart = user.cart.filter(id => id.toString() !== courseId);
        await user.save();

        res.status(200).json({ message: "Course removed from cart", cart: user.cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Buy all courses in cart
router.post('/buy', auth, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if (!user.cart.length) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const newPurchases = [];

        for (const courseId of user.cart) {
            if (!user.purchasedCourses.includes(courseId)) {
                const course = await Course.findById(courseId);
                if (course) {
                    newPurchases.push(courseId);
                }
            }
        }

        if (!newPurchases.length) {
            return res.status(400).json({ message: 'All courses already purchased' });
        }

        user.purchasedCourses.push(...newPurchases);
        user.cart = []; // Clear cart after purchase
        await user.save();

        res.status(200).json({
            message: 'Courses purchased successfully',
            purchasedCourses: user.purchasedCourses
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 module.exports = router;
