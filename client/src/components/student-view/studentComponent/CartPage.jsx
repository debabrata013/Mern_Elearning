import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    try {
      setLoading(true);
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (courseId) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== courseId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handlePurchase = (courseId) => {
    try {
      navigate('/enroll', { 
        state: { 
          courseId: courseId,
          courseData: cartItems.find(item => item.id === courseId)
        }
      });
    } catch (error) {
      console.error('Error navigating to enroll page:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5491CA]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {cartItems.length === 0 ? (
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
              <div key={course.id} className="flex flex-col items-center max-w-[18rem] mx-auto">
                {/* Course Card */}
                <div className="w-full bg-[#5491CA] rounded-xl overflow-hidden text-center text-white shadow-lg hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                  {/* Card Header */}
                  <div className="p-6">
                    <img 
                      src={course.coverImage || course.thumbnail} 
                      alt={`${course.title} Logo`} 
                      className="h-[85px] object-contain mx-auto"
                    />
                  </div>
                  
                  {/* Card Body */}
                  <div className="bg-white text-black p-4 rounded-xl h-[160px]">
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <p className="text-sm mt-3 line-clamp-3">{course.description}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-1 w-full mt-2">
                  <button 
                    onClick={() => removeFromCart(course.id)}
                    className="px-4 py-3 rounded-lg border-2 border-[#5491CA] text-[#5491CA] hover:bg-[#5491CA] hover:text-white transition-colors shadow-md text-sm font-medium"
                  >
                    Remove from Cart
                  </button>
                  <button 
                    onClick={() => handlePurchase(course.id)}
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