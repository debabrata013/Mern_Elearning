import React, { useState } from "react";
import certi from "../CertificateSection/certificate.png";

const CertificateSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const certificates = [certi, certi, certi];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="my-4 md:my-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 shadow-xl  rounded-xl">
      <div className="md:pr-48 text-center md:text-left">
        <h2 className="text-xl text-orange-500 uppercase mb-20 font-semibold">Certificate</h2>
        <h3 className="text-4xl font-bold text-black">
          <span className="text-blue-900">The Certification of<br /></span>
          <span className="text-orange-500">Digitoria</span>
        </h3>
        <p className="text-gray-600 text-base leading-relaxed mt-4">
          Digitoria Education Certificates honor your hard work, preparing you
          for the future of work.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {certificates.map((image, index) => (
              <div className="min-w-full" key={index}>
                <img
                  src={image}
                  alt={`Certificate ${index + 1}`}
                  className="w-full h-auto border-2 border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="bg-orange-500 text-white p-3 rounded-full text-2xl hover:bg-blue-900 transition"
            onClick={prevSlide}
          >
            &#8592;
          </button>
          <button
            className="bg-orange-500 text-white p-3 rounded-full text-2xl hover:bg-blue-900 transition"
            onClick={nextSlide}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;
