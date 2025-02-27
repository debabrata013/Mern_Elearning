import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../nav-bar/nav';

const ContactForm = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Nav />
      <div className="contact-page-container pt-20 bg-white">
        <div className="flex min-h-screen flex-col items-center animate__animated animate__fadeIn px-4">
          <h1 className="text-4xl font-extrabold text-[#5491CA] mb-6 text-center">Contact Our Team</h1>
          

          <div className="w-full max-w-7xl rounded-xl bg-white p-8 shadow-xl border border-[#5491CA] transition duration-300 hover:shadow-2xl">
          <p className="text-gray-600 mb-10 max-w text-center">
            Have questions or need help? Fill out the form below, and we'll get back to you shortly.
          </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Your Name *</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    placeholder="Julia William"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Contact Email *</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Phone Number *</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Issue Related *</label>
                  <select
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    required
                  >
                    <option>Course Structure</option>
                    <option>Payment Failure</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block font-medium text-gray-700">Your Message *</label>
                <textarea
                  className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                  rows="4"
                  placeholder="Type your message..."
                  required
                ></textarea>
              </div>
              <div className="text-sm text-gray-500">
                By submitting this form, you agree to our terms and privacy policy.
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#5491CA] px-6 py-3 font-medium text-white transition duration-300 hover:bg-[#7670AC] md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 mb-10 flex flex-col items-center space-y-6 md:flex-row md:space-x-12 md:space-y-0 ">
            <div className="flex flex-col items-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#5491CA] text-white">
                ✉️
              </div>
              <p className="font-medium text-gray-700">Email Us</p>
              <p className="text-sm text-gray-500">help@ezyskills.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#7670AC] text-white">
                📞
              </div>
              <p className="font-medium text-gray-700">Call Us</p>
              <p className="text-sm text-gray-500">+91 85888 99999</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
