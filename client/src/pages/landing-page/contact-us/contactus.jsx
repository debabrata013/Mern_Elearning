import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../nav-bar/nav";

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    phoneNumber: "",
    issueRelated: "Billing",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4400/contactus/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          contactEmail: "",
          phoneNumber: "",
          issueRelated: "Billing",
          message: "",
        });
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setErrorMessage(
        "Failed to send message. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="contact-page-container mt-4 pt-20 bg-white px-4 md:px-8 lg:px-[7.5rem]">
        <div className="flex min-h-screen flex-col items-center animate__animated animate__fadeIn">

          <div className="w-full max-w-7xl rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-[#5491CA] transition duration-300 hover:shadow-2xl">
            <h1 className="text-2xl md:text-4xl font-bold text-[#5491CA] mb-6 md:mb-10 text-center">
              Contact Our Team
            </h1>
            <p className="text-gray-600 mb-6 md:mb-10 text-center">
              Have questions or need help? Fill out the form below, and we'll get back to you shortly.
            </p>

            {/* Success & Error Messages */}
            {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    placeholder="Julia William"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Contact Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Phone Number *</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">Issue Related *</label>
                  <select
                    name="issueRelated"
                    value={formData.issueRelated}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#7670AC] px-4 py-3 focus:border-[#5491CA] focus:ring-[#5491CA] outline-none"
                    required
                  >
                    <option value="Billing">Billing</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block font-medium text-gray-700">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 mb-10 flex flex-col items-center space-y-6 md:flex-row md:space-x-12 md:space-y-0 w-full max-w-3xl">
            <a href="mailto:aigiri.company@gmail.com" className="flex flex-col items-center cursor-pointer text-center w-full">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#5491CA] text-white">
                ✉️
              </div>
              <p className="font-medium text-gray-700">Email Us</p>
              <p className="text-sm text-gray-500">aigiri.company@gmail.com</p>
            </a>

            <a href="https://wa.me/918588899999" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer text-center w-full">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#7670AC] text-white">
                📞
              </div>
              <p className="font-medium text-gray-700">WhatsApp Us</p>
              <p className="text-sm text-gray-500">+91 85888 99999</p>
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactForm;
