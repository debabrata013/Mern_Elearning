import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the course detail or progress page (adjust route as needed)
    navigate(`/mycourse/course/${course._id}`, { state: { course } });
  };


  return (
    <div
      className="flex flex-col items-center w-[260px] h-[320px] cursor-pointer transition-transform hover:-translate-y-1 duration-300"
    >
      <div className="bg-[#5491CA] text-white rounded-2xl overflow-hidden w-full shadow-lg hover:shadow-2xl">
        <div className="p-5 bg-[#5491CA] flex justify-center items-center h-[100px]">
          <img
            src={course.coverImage}
            alt={`${course.title} Logo`}
            className="max-h-[60px] object-contain"
          />
        </div>
  
        <div className="bg-white text-black px-4 py-3 h-[200px] rounded-t-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold text-center">{course.title}</h3>
            <p className="text-sm mt-2 leading-snug text-center line-clamp-4">
              {course.description}
            </p>
          </div>
          <button className="mt-4 bg-[#5491CA] text-white text-sm font-medium py-2 rounded-lg hover:bg-[#467bb0] transition-colors duration-200"
           onClick={handleContinue}>
          Continue
        </button>
        </div>
        
      </div>
      
    </div>
  );
};

export default CourseCard;
