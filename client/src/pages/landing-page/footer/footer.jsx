// Footer.jsx
import React from 'react';
import './footer.css';

const CollaborationsAndFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description Section */}
        <div className="footer-section">
          <img src="/logo.png" alt="EZY Skills" className="footer-logo" />
          <p className="footer-description">
            Let Us build your career together Be the first person to transform yourself with our unique & world class corporate level trainings.
          </p>
          <div className="newsletter">
            <h3 className="sub-new">Subscribe Our Newsletter</h3>
            <div className="newsletter-input">
              <input type="email" placeholder="Your Email address" />
              <button type="submit">→</button>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/our-story">Our Story</a></li>
            <li><a href="/best-courses">Best Courses</a></li>
            <li><a href="/faqs">Your FAQ's</a></li>
            <li><a href="/cancellation">Cancellation & Refunds</a></li>
            <li><a href="/contact">Contact US</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="contact-info">
            <p className="address">
              Navakethan Complex,<br />
              6th Floor, 605, 606 A&P opp,<br />
              Clock Tower, SD Road,<br />
              Secunderabad, Telangana 500003
            </p>
            <p className="email">info@ezyskills.in</p>
            <p className="phone">
              +91 8428448903<br />
              +91 9475484959
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="legal-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">LinkedIn</a>
            <a href="#" className="social-icon">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CollaborationsAndFooter;