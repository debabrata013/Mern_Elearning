  import React from "react";
  import { motion } from "framer-motion";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
  // import "swiper/css";
  // import "swiper/css/effect-fade";
  // import "swiper/css/navigation";
  // import "swiper/css/pagination";
  import { FaBrain, FaChalkboardTeacher, FaClipboardCheck, FaRocket } from "react-icons/fa";

  import img1 from "./assets/2225.png";
  import img2 from "./assets/2226.png";
  import img3 from "./assets/2227.png";
  import img4 from "./assets/2228.png";

  const AboutPage = () => {
    const points = [
      { text: "AI-Powered Personalized Learning", icon: <FaBrain /> },
      { text: "Adaptive Courses Tailored to You", icon: <FaChalkboardTeacher /> },
      { text: "Intelligent Assessments & Feedback", icon: <FaClipboardCheck /> },
      { text: "Next-Gen Learning Experience", icon: <FaRocket /> }
    ];

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white-900 relative">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7670AC] to-[#5491CA] opacity-20 blur-3xl"></div>
        <div className="max-w-6xl w-full p-12 bg-white rounded-2xl shadow-xl border-2 border-[#7670AC] relative z-10 overflow-hidden">
        {/* Floating Glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#7670AC] opacity-30 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#5491CA] opacity-30 blur-3xl rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Side - Animated Points */}
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-transparent bg-clip-text mb-8 text-center md:text-left">
                World's First AI-Based Online Learning Platform
              </h1>
              <div className="space-y-5">
                {points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md border-2 border-[#7670AC] hover:scale-105 transition-transform"
                    >
                    <span className="text-[#5491CA] text-3xl mr-5">{point.icon}</span>
                    <span className="text-lg font-semibold text-gray-900">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Carousel */}
            <div className="relative">
              <Swiper 
                spaceBetween={10} 
                slidesPerView={1} 
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                  className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
              >
                {[img1, img2, img3, img4].map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Slide ${index + 1}`} className="w-full rounded-xl" />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-xl animate-border-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AboutPage;