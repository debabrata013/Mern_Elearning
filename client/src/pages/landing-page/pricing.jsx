import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import Fuoter from "./footer/footer"
import "./he.css"
const PricingCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
<Nav/>
<div className="mm">
    <div className="max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ">
      
      {/* Header Badge */}
      <div className=" px-20 pt-4">
        <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-medium text-orange-500">
          Employee Program
        </span>
      </div>

      {/* Price Section */}
      <div className="bg-orange-500 px-6 pb-6 pt-4 text-white">
        <div className="flex items-start">
          <span className="mt-1 text-2xl">₹</span>
          <span className="text-5xl font-bold">50,000</span>
          <span className="ml-1 mt-2">+ Tax</span>
        </div>
        <div className="mt-1 text-sm opacity-90">
          (Exclusive of GST & Taxes)
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4 px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <span className="text-gray-600">1-1 Individuals</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-gray-600">Choose Timings</span>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button className="w-full rounded-full border-2 border-orange-500 bg-white py-3 font-medium text-orange-500 transition-colors hover:bg-orange-50">
          Choose Plan
        </button>
      </div>

      {/* Razorpay Logo */}
      <div className="flex justify-center px-6 pb-6">
        <div className="text-sm font-bold text-blue-900">
          Razor<span className="text-blue-500">pay</span>
        </div>
      </div>
    </div>  




    <div className="max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ">
      
      {/* Header Badge */}
      <div className=" px-20 pt-4">
        <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-medium text-orange-500">
          Employee Program
        </span>
      </div>

      {/* Price Section */}
      <div className="bg-orange-500 px-6 pb-6 pt-4 text-white">
        <div className="flex items-start">
          <span className="mt-1 text-2xl">₹</span>
          <span className="text-5xl font-bold">50,000</span>
          <span className="ml-1 mt-2">+ Tax</span>
        </div>
        <div className="mt-1 text-sm opacity-90">
          (Exclusive of GST & Taxes)
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4 px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <span className="text-gray-600">1-1 Individuals</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-gray-600">Choose Timings</span>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button className="w-full rounded-full border-2 border-orange-500 bg-white py-3 font-medium text-orange-500 transition-colors hover:bg-orange-50">
          Choose Plan
        </button>
      </div>

      {/* Razorpay Logo */}
      <div className="flex justify-center px-6 pb-6">
        <div className="text-sm font-bold text-blue-900">
          Razor<span className="text-blue-500">pay</span>
        </div>
      </div>
    </div>






    <div className="max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ">
      
      {/* Header Badge */}
      <div className=" px-20 pt-4">
        <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-medium text-orange-500">
          Employee Program
        </span>
      </div>

      {/* Price Section */}
      <div className="bg-orange-500 px-6 pb-6 pt-4 text-white">
        <div className="flex items-start">
          <span className="mt-1 text-2xl">₹</span>
          <span className="text-5xl font-bold">50,000</span>
          <span className="ml-1 mt-2">+ Tax</span>
        </div>
        <div className="mt-1 text-sm opacity-90">
          (Exclusive of GST & Taxes)
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4 px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <span className="text-gray-600">1-1 Individuals</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-gray-600">Choose Timings</span>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button className="w-full rounded-full border-2 border-orange-500 bg-white py-3 font-medium text-orange-500 transition-colors hover:bg-orange-50">
          Choose Plan
        </button>
      </div>

      {/* Razorpay Logo */}
      <div className="flex justify-center px-6 pb-6">
        <div className="text-sm font-bold text-blue-900">
          Razor<span className="text-blue-500">pay</span>
        </div>
      </div>
    </div>
    </div>
    <Fuoter/>
   
    </>
  );
};

export default PricingCard;