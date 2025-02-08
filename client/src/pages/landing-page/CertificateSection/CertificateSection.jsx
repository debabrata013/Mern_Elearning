import React, { useState } from "react";
import certi from "../CertificateSection/certificate.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="my-8 md:my-24 p-10 shadow-2xl rounded-2xl bg-white flex flex-col md:flex-row items-center gap-12">
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-lg text-[#5491CA] uppercase font-semibold tracking-wider mb-4">
          Certificate
        </h2>
        <h3 className="text-4xl font-bold text-[#7670AC] leading-tight">
          The Certification of <br />
          <span className="text-[#5491CA]">Excellence</span>
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed mt-4">
          These certificates recognize your dedication and achievements, paving
          the way for a brighter future.
        </p>
      </div>

      {/* Certificate Slider */}
      <div className="relative w-full md:w-1/2 overflow-hidden">
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {certificates.map((image, index) => (
              <div className="min-w-full flex justify-center" key={index}>
                <img
                  src={image}
                  alt={`Certificate ${index + 1}`}
                  className="w-4/5 md:w-full h-auto shadow-lg border border-gray-300 rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 space-x-6">
          <button
            className="p-3 bg-[#7670AC] text-white rounded-full shadow-md hover:bg-[#5491CA] transition"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="p-3 bg-[#7670AC] text-white rounded-full shadow-md hover:bg-[#5491CA] transition"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;
