import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#5491CA] text-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo and Description Section */}
        <div className="text-center md:text-left">
          <div className="text-4xl font-bold text-[#5491CA] mb-6">
            <span className="text-white">Digi</span> <span className="text-[#5491CA]">Toria</span>
          </div>
          <p className="text-lg mb-6">
            Let Us build your career together. Be the first person to transform yourself with our unique & world-class corporate-level trainings.
          </p>
          
          {/* Newsletter Subscription */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-3">Subscribe to Our <span className="text-[#5491CA]">Newsletter</span></h3>
            <div className="flex justify-center md:justify-start gap-4">
              <input type="email" placeholder="Your Email address" className="p-3 rounded-lg text-black w-64 focus:outline-none focus:ring-2 focus:ring-[#5491CA]" />
              <button type="submit" className="p-3 bg-[grey] text-white rounded-lg hover:bg-[#7670AC] transition duration-300 transform hover:scale-105">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-6">Quick <span className="text-[#5491CA]">Links</span></h3>
          <ul className="list-none">
            <li className="mb-3">
              <a href="/" className="hover:text-[#7670AC] transition duration-300">Home</a>
            </li>
            <li className="mb-3">
              <a href="/coursess" className="hover:text-[#7670AC] transition duration-300">Courses</a>
            </li>
            <li className="mb-3">
              <a href="/about-us" className="hover:text-[#7670AC] transition duration-300">About Us</a>
            </li>
            <li className="mb-3">
              <a href="/contactus" className="hover:text-[#7670AC] transition duration-300">Contact Us</a>
            </li>
            <li className="mb-3">
              <a href="/faq" className="hover:text-[#7670AC] transition duration-300">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-6">Contact <span className="text-[#5491CA]">Us</span></h3>
          <ul className="list-none">
            <li className="mb-3">
              <p className="hover:text-[#7670AC] transition duration-300">info@digitoria.com</p>
            </li>
            <li className="mb-3">
              <p className="hover:text-[#7670AC] transition duration-300">+91 1234567890</p>
            </li>
            <li className="mb-3">
              <p className="hover:text-[#7670AC] transition duration-300">123, XYZ Street, City, Country</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Links Section (Icons at the bottom) */}
      <div className="flex justify-center gap-6 mb-6 mt-8">
        <a href="#" className="text-white text-2xl hover:hover:text-[#1877F2] transition duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" className="text-white text-2xl hover:text-[#7670AC] transition duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="text-white text-2xl hover:text-[#E4405F] transition duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" className="text-white text-2xl hover:text-[#7670AC] transition duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="#" className="text-white text-2xl hover:text-[red] transition duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-white pt-4 text-center">
        <div className="flex justify-center gap-8 text-sm">
          <a href="/terms" className="text-white hover:text-[#7670AC] transition duration-300">Terms & Conditions</a>
          <a href="/privacy" className="text-white hover:text-[#7670AC] transition duration-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;