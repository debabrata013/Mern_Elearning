// src/components/AboutUs.js
import React from "react";
import { useNavigate } from "react-router-dom";
import CollaborationsAndFooter from "../footer/footer";
import Nav from "../nav-bar/nav";
const AboutUs = () => {
  return (
    <>
   <Nav/>
   <div className="m3">
    <div className="bg-blue-900 text-white py-12 px-6 md:px-16 ">
      {/* Header Section */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-4xl font-bold mb-4">
          The Platform For The Next Billion Learners
        </h2>
        <p className="text-gray-300 text-lg">
          Transforming education to shape the next generation of students,
          employees, and innovators.
        </p>
      </div>

      {/* Image and Story Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
          <img
            src="https://imgs.search.brave.com/AehGQc1Es9BFnZkVCAlz4ge9JXFeFWhVDXEcQ-T_6EI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nMmdvLmNvbS9h/c3NldHMvaW1nL2Jh/Y2tkb2MucG5n"
            alt="Students"
            className="w-full md:w-1/2 rounded-md"
          />
          <img
            src="https://imgs.search.brave.com/_pIGNp-lfOpexzWlfyfRw-JWBvyG3LgQt2Pe-HDC0C8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdy/ZXNpemVycy5jb20v/aWRlYS5zdmc"
            alt="Learning"
            className="w-full md:w-1/2 rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-orange-400 text-xl font-semibold mb-2">
            Our Story
          </h3>
          <h4 className="text-2xl font-bold mb-4 text-gray-100">
            Innovating new ways to train students
          </h4>
          <p className="text-gray-300">
            We strive to redefine what we can achieve by providing resources,
            guidance, and mentorship to help students achieve their dreams. Our
            goal is to make learning available and affordable for everyone,
            anywhere.
          </p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="bg-white text-blue-900 py-12 px-6 md:px-16 rounded-lg flex flex-col md:flex-row justify-between gap-8 mb-12">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">
            Our Mission
          </h3>
          <p>
            Provide passion-based learning by using a unique approach to prepare
            students for real-world challenges. Our mission is to create an
            engaging, vibrant, and innovative learning experience.
          </p>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">
            Our Vision
          </h3>
          <p>
            To revolutionize the digital sphere by implementing learning
            innovations that drive student success, fostering a supportive
            environment for future leaders.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold mb-6">Our Team</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Individual Team Member */}
          <div className="w-40 text-center">
            <img
              src="https://imgs.search.brave.com/IAgd4knwQ7AD9eFSuQU9HLfvm0TSfFCMqpfdNSlc2gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvbWFu/LXVzZXItY2lyY2xl/LWljb24uc3Zn"
              alt="Team Member"
              className="w-full rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg">Keshav Kumar</h4>
            <p className="text-gray-300">Director of Operations</p>
          </div>
          <div className="w-40 text-center">
            <img
              src="https://imgs.search.brave.com/IAgd4knwQ7AD9eFSuQU9HLfvm0TSfFCMqpfdNSlc2gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvbWFu/LXVzZXItY2lyY2xl/LWljb24uc3Zn"
              alt="Team Member"
              className="w-full rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg">Suchitra</h4>
            <p className="text-gray-300">Design Lead</p>
          </div>
          <div className="w-40 text-center">
            <img
              src="https://imgs.search.brave.com/IAgd4knwQ7AD9eFSuQU9HLfvm0TSfFCMqpfdNSlc2gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvbWFu/LXVzZXItY2lyY2xl/LWljb24uc3Zn"
              alt="Team Member"
              className="w-full rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg">Naren M</h4>
            <p className="text-gray-300">Tech Lead</p>
          </div>
        </div>
      </div>

      {/* Advisors Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-6">Our Advisors</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Individual Advisor */}
          <div className="w-40 text-center">
            <img
              src="https://imgs.search.brave.com/IAgd4knwQ7AD9eFSuQU9HLfvm0TSfFCMqpfdNSlc2gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvbWFu/LXVzZXItY2lyY2xl/LWljb24uc3Zn"
              alt="Advisor"
              className="w-full rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg">John Doe</h4>
            <p className="text-gray-300">Strategic Advisor</p>
          </div>
          <div className="w-40 text-center">
            <img
              src="https://imgs.search.brave.com/IAgd4knwQ7AD9eFSuQU9HLfvm0TSfFCMqpfdNSlc2gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvbWFu/LXVzZXItY2lyY2xl/LWljb24uc3Zn"
              alt="Advisor"
              className="w-full rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg">Jane Smith</h4>
            <p className="text-gray-300">Mentor</p>
          </div>
          <div className="w-40 text-center">
            <img
              src="https://imgs.search.brave.com/IAgd4knwQ7AD9eFSuQU9HLfvm0TSfFCMqpfdNSlc2gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvbWFu/LXVzZXItY2lyY2xl/LWljb24uc3Zn"
              alt="Advisor"
              className="w-full rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg">Aditi Patel</h4>
            <p className="text-gray-300">Industry Expert</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    <CollaborationsAndFooter/>
    </>
  );
};

export default AboutUs;