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
router.post('/buy', async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        // Filter courses already purchased
        const newPurchases = user.cart.filter(
            courseId => !user.purchasedCourses.includes(courseId)
        );

        if (newPurchases.length === 0) {
            return res.status(400).json({ message: "No new courses to purchase" });
        }

        user.purchasedCourses.push(...newPurchases);
        user.cart = []; // clear cart
        await user.save();

        res.status(200).json({ message: "Courses purchased successfully", purchasedCourses: user.purchasedCourses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

 module.exports = router;
