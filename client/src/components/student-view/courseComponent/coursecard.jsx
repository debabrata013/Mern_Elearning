import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";
import axiosInstance from "../../../api/axiosInstance";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleLiveDemo = () => {
    navigate(`/course-demo/${course._id}`, { state: { course } });
  };

  const handleEnrollNow = () => {
    navigate(`/course-enrollment/${course._id}`, { state: { course } });
  };

  const handleDownloadCurriculum = () => {
    // Check if curriculum PDF exists
    if (course.curriculumPDF) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = course.curriculumPDF;
      link.download = `${course.title}-curriculum.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // If no PDF is available, show an alert
      alert("Curriculum PDF is not available for this course.");
    }
  };

  const handleAddToCart = async () => {
    try {
      // Get existing cart items
      // const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const user = JSON.parse(localStorage.getItem('user'));
      const existingCart = user.cart || [];
      
      // Check if course is already in cart
      if (existingCart.some(item => item.id === course.id)) {
        alert('This course is already in your cart!');
        return;
      }

     try {
      const response = await axiosInstance.post('/cart/add', {
        courseId: course._id,
        userId: user._id
      });
      if (response.status === 200) {
        alert('Course added to cart successfully!');
      }
      

     } catch (error) {
      console.error('Error adding to cart:', error);
      
        
        console.error('Error adding to cart:', error);
        
     }
     
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add course to cart. Please try again.');
    }
  };

  const cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;

  return (
    <div className="course-container">
      <div className="course-card">
        <div className="card-header">
          <img src={course.coverImage} alt={`${course.title} Logo`} className="course-logo" />
        </div>
        <div className="card-body">
          <h3 className="course-title">{course.title}</h3>
          <p className="course-description">{course.description}</p>
        </div>
      </div>
      <div className="buttons">
        <button className="btn live-demo" onClick={handleAddToCart}>Add to cart</button>
        <button className="btn enroll-now" onClick={handleEnrollNow}>Enroll Now</button>
        <button className="btn download-curriculum" onClick={handleDownloadCurriculum}>Download Curriculum</button>
      </div>
    </div>
  );
};

export default CourseCard;
