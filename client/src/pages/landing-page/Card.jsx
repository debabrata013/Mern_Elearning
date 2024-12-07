import React from 'react';
import { useNavigate } from "react-router-dom";
const CollegeProgramCard = ({ program, children }) => {
  return (
    <div className="mx-auto max-w-sm rounded-lg bg-white p-4 text-center shadow-lg">
      <div className="rounded-t-lg bg-blue-900 py-2 font-semibold text-white">
        {program}
      </div>
      <div className="px-4 py-6">
        <p className="text-3xl font-bold text-orange-500">
          ₹ 20,000 <span className="text-lg font-medium">+ Tax</span>
        </p>
        <p className="mt-1 text-gray-500">(Exclusive of GST & Taxes)</p>
        <div className="mt-6 flex justify-center space-x-4 text-gray-600">
          <div className="flex flex-col items-center">
            <img
              src="/college-icon.png"
              alt="College Icon"
              className="mb-2 h-6"
            />
            <p>{children}</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/calendar-icon.png"
              alt="Calendar Icon"
              className="mb-2 h-6"
            />
            <p>Common Timings</p>
          </div>
        </div>
        <button className="mt-6 rounded border border-orange-500 bg-transparent px-4 py-2 font-medium text-orange-500 transition duration-300 hover:bg-orange-500 hover:text-white">
          Choose Plan
        </button>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        <p>Powered by Razorpay</p>
      </div>
    </div>
  );
};

export default CollegeProgramCard;