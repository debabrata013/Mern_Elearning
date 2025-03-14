const User = require('../models/User'); // Import the User model
const Course = require('../models/Course'); // Import the Course model

// Function to add a course to the user's cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const { courseId } = req.body; // Get course ID from request body

        // Validate course ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the user and update their cart
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { cart: courseId } }, // Use $addToSet to avoid duplicates
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Course added to cart', cart: user.cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Function to buy courses in the user's cart
const buyCourses = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user

        // Find the user and populate their cart with course details
        const user = await User.findById(userId).populate('cart');
        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or user not found' });
        }

        // Here you would typically process the payment
        // For example, integrate with a payment gateway (e.g., Stripe, PayPal)
        // This is a placeholder for payment processing logic
        const paymentSuccessful = true; // Simulate payment success

        if (!paymentSuccessful) {
            return res.status(500).json({ message: 'Payment processing failed' });
        }

        // If payment is successful, update the user's purchased courses
        user.purchasedCourses.push(...user.cart); // Add all courses from cart to purchasedCourses
        user.cart = []; // Clear the cart after purchase

        await user.save(); // Save the updated user document

        return res.status(200).json({ message: 'Courses purchased successfully', purchasedCourses: user.purchasedCourses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addToCart,
    buyCourses, // Export the new buyCourses function
};
