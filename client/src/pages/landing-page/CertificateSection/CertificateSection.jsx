import React, { useState } from "react";
import certi from "../CertificateSection/certificate.png";
import "./CertificateSection.css";

const CertificateSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dummy images: Replace with actual images later
  const certificates = [certi, certi, certi];

  // Function to navigate next
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  // Function to navigate previous
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="certificate-section">
      <div className="certificate-text">
        <h2 className="heading">Certificate</h2>
        <h3>
          <span className="top">The Certification of<br /></span>
          <span className="bottom">Digitoria</span>
        </h3>
        <p>
          Digitoria Education Certificates honor your hard work, preparing you
          for the future of work.
        </p>
      </div>

      {/* Slider Section */}
      <div className="certificate-slider">
        <button className="slider-btn left" onClick={prevSlide}>
          &#8592;
        </button>

        <div className="certificate-carousel">
          {/* Dynamic sliding */}
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {certificates.map((image, index) => (
              <div className="carousel-slide" key={index}>
                <img src={image} alt={`Certificate ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <button className="slider-btn right" onClick={nextSlide}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default CertificateSection;
