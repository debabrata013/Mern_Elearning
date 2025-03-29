import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../../api/axiosInstance";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      
  
     
  
      // First get the user's cart with course IDs
     
      
      // Then fetch the full course details for each course in the cart
      const coursePromises =  await user.cart.map(courseId => 
        axiosInstance.get(`/courses/${courseId}`)
      );
      
      
      const courseResponses = await Promise.all(coursePromises);
      const courses = courseResponses.map(response => response.data);
      
      setCartItems(courses);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user || !user._id) {
        alert("Please log in to manage your cart.");
        return;
      }
  
      const response = await axiosInstance.post("/cart/remove", {
        courseId,
        userId: user._id,
      });

      if (response.status === 200) {
        // Refresh cart items after successful removal
        fetchCartItems();
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove course from cart. Please try again.");
    }
  };

  const handlePurchase = (courseId) => {
    try {
      const courseData = cartItems.find(item => item._id === courseId);
      if (!courseData) {
        throw new Error('Course not found in cart');
      }
      
      navigate(`/enroll/${courseId}`, { 
        state: { 
          course: courseData
        }
      });
    } catch (error) {
      console.error('Error navigating to enroll page:', error);
      alert('Failed to navigate to enrollment page. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[#5491CA] hover:text-[#7670AC] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Cart ({cartItems.length})</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5491CA]"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaShoppingCart className="w-16 h-16 text-[#5491CA] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty!</h2>
            <p className="text-gray-600 mb-6">Add courses to your cart and they will appear here</p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-[#5491CA] text-white px-8 py-3 rounded-lg hover:bg-[#7670AC] transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {cartItems.map((course) => (
              <div key={course._id} className="flex flex-col items-center max-w-[18rem] mx-auto">
                <div className="w-full bg-[#5491CA] rounded-xl overflow-hidden text-center text-white shadow-lg hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                  <div className="p-6">
                    <img 
                      src={course.coverImage ? course.coverImage : 'https://via.placeholder.com/150'} 
                      alt={`${course. title} Logo`} 
                      className="h-[85px] object-contain mx-auto"
                    />
                  </div>
                  
                  <div className="bg-white text-black p-4 rounded-xl h-[160px]">
                    <h3 className="text-xl font-bold">{course.
title}</h3>
                    <p className="text-sm mt-3 line-clamp-3">{course.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 w-full mt-2">
                  <button 
                    onClick={() => removeFromCart(course._id)}
                    className="px-4 py-3 rounded-lg border-2 border-[#5491CA] text-[#5491CA] hover:bg-[#5491CA] hover:text-white transition-colors shadow-md text-sm font-medium"
                  >
                    Remove from Cart
                  </button>
                  <button 
                    onClick={() => handlePurchase(course._id)}
                    className="px-4 py-3 rounded-lg bg-[#5491CA] text-white hover:bg-[#7670AC] transition-colors shadow-md text-sm font-medium"
                  >
                    Purchase Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 