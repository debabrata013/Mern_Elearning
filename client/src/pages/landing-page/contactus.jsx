import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CollaborationsAndFooter from './footer/footer';
import "./App.css";
import "./he.css"
import Nav from "./nav-bar/nav";
import Fuoter from "./footer/footer"
const ContactForm = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <> <Nav/>
    <div className="me">
    <div className="flex min-h-screen flex-col items-center ">
      <h1 className="mb-8 text-3xl font-bold text-white">Contact Our Team</h1>
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Your name *
              </label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
                placeholder="Julia William"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Contact email *
              </label>
              <input
                type="email"
                className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Phone Number*
              </label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
                placeholder="Your phone number"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Issue Related to *
              </label>
              <select
                className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
                required
              >
                <option>Course Structure</option>
                <option>Payment Failure</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Your message*
            </label>
            <textarea
              className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
              rows="4"
              placeholder="Type your message..."
              required
            ></textarea>
          </div>
          <div className="text-sm text-gray-500">
            By submitting this form you agree to our terms and conditions and
            our Privacy Policy which explains how we may collect, use and
            disclose your personal information including to third parties.
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-6 py-2 font-medium text-white transition duration-300 hover:bg-blue-800 md:w-auto"
          >
            Send
          </button>
        </form>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center space-y-6 text-center md:flex-row md:space-x-12 md:space-y-0">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-yellow-100 p-4">
            {/* Replace with appropriate icon */}
            <img src="/email-icon.png" alt="Email Icon" className="h-6 w-6" />
          </div>
          <p className="font-medium text-gray-700">Email Us</p>
          <p className="text-sm text-gray-500">help@ezyskills.com</p>
        </div>
        <div>
          <div className="mb-2 inline-flex rounded-full bg-red-100 p-4">
            {/* Replace with appropriate icon */}
            <img src="/phone-icon.png" alt="Phone Icon" className="h-6 w-6" />
          </div>
          <p className="font-medium text-gray-700">Call Us</p>
          <p className="text-sm text-gray-500">+91 85888 99999</p>
        </div>
      </div>
    </div>
    </div>
    <CollaborationsAndFooter />
    </>
  );
};

export default ContactForm;