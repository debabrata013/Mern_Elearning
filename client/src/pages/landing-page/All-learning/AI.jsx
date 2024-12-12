import React, { useState, useEffect } from 'react';
import './AI.css';
import image1 from './assets/2225.png';
import image2 from './assets/2226.png';
import image3 from './assets/2227.png';
import image4 from './assets/2228.png';

const Appi = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="containeri">
      <div className="text-section">
        <h1 className="title">
          World's
          <br />
          First AI-Based
          <br />
          <span className="highlight">Online Learning</span>
          <br />
          Platform
        </h1>

        <div className="dots-container">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="dot"></div>
          ))}
        </div>
      </div>

      <div className="image-section">
        <div className="image-card">
          <div className="carousel">
            {images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === currentImage ? 'active' : ''}`}
              >
                <img
                  src={img}
                  alt={`Course Selector ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </div>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appi;
