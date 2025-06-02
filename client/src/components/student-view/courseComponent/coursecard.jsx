import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";
import axiosInstance from "../../../api/axiosInstance";
import toast from "react-hot-toast";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleLiveDemo = () => {
    navigate(`/course-demo/${course._id}`, { state: { course } });
  };

  const handleEnrollNow = () => {
    navigate(`/enroll/${course._id}`, { state: { course } });
  };

  const handleDownloadCurriculum = () => {
    if (course.curriculumPDF) {
      const link = document.createElement('a');
      link.href = course.curriculumPDF;
      link.download = `${course.title}-curriculum.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.dismiss();
      toast.error("Curriculum PDF is not available for this course.");
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const existingCart = user.cart || [];

      if (existingCart.some(item => item.id === course.id)) {
        toast.dismiss();
        toast("This course is already in your cart!");
        return;
      }

      try {
        const response = await axiosInstance.post(`/api/cart/add/${course._id}/${user._id}`, {
          courseId: course._id,
          userId: user._id
        });

        if (response.status === 200) {
          toast.dismiss();
          toast.success('Course added to cart successfully!');
        }

      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.dismiss();
        toast.error('Error adding to cart.');
      }

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.dismiss();
      toast.error('Failed to add course to cart. Please try again.');
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
