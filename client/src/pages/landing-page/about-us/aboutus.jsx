import React from "react";
import Footer from "../footer/footer";
import Nav from "../nav-bar/nav";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <Nav />

      {/* Main Container */}
      <div className="px-4 md:px-10 lg:px-28">
        {/* Hero Section */}
        <section className="relative mx-auto bg-white text-gray-900 py-16 px-6 text-center shadow-xl rounded-3xl mt-16 md:mt-24 min-h-[50vh] flex flex-col justify-center items-center border border-[#5491CA]">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in text-[#5491CA]">
            Welcome to <span className="text-[#7670AC]">AIGIRI</span>
          </h1>
          <p className="text-sm md:text-lg leading-relaxed text-justify text-black italic">
            &ldquo;Unlock a world of knowledge with expert-led courses, immersive 
            learning experiences, and a dynamic educational journey that fuels 
            your curiosity and growth. At AIGIRI, we believe in empowering minds 
            with high-quality, accessible education that adapts to your needs.&rdquo;
          </p>

          <button className="mt-4 md:mt-6 bg-[#5491CA] text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-md hover:bg-[#7670AC] transition-transform transform hover:scale-105">
            Explore Courses
          </button>
        </section>

        {/* Mission & Vision */}
        <section className="text-center my-12 md:my-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-[#5491CA]">
            Our Mission & Vision
          </h2>
          <p className="text-sm md:text-lg text-justify text-black leading-relaxed italic">
            &ldquo;At AIGIRI, we strive to create an inclusive, accessible, and engaging 
            learning platform for all. Our vision is to provide high-quality education 
            that empowers individuals worldwide.&rdquo;
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 bg-gray-100 shadow-md rounded-xl flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-[#7670AC]">
            Why Choose <span className="text-[#7670AC]">AIGIRI?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 sm:px-10">
            {[
              { title: "🎓 Expert Instructors", desc: "Learn from industry professionals with real-world experience." },
              { title: "🔥 Interactive Learning", desc: "Engage with hands-on projects and quizzes." },
              { title: "💰 Affordable & Flexible", desc: "Study anytime, anywhere, at an affordable price." }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#5491CA]">{item.title}</h3>
                <p className="text-gray-700 text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#5491CA] mb-6 md:mb-8">
            What Our Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-10">
            {[
              { name: "Amit Sharma", feedback: "AIGIRI changed my career! The courses are top-notch, and the instructors are amazing." },
              { name: "Priya Patel", feedback: "I love the interactive learning approach. It keeps me engaged and motivated." },
              { name: "Rohan Das", feedback: "Affordable and flexible learning that fits perfectly into my busy schedule." }
            ].map((user, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
                <p className="text-sm md:text-lg italic text-gray-700">"{user.feedback}"</p>
                <h3 className="mt-4 text-lg md:text-xl font-semibold text-[#7670AC]">- {user.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-12 mt-16 bg-gray-100 shadow-md rounded-xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-[#5491CA]">
            Our <span className="text-[#7670AC]">Achievements</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4 sm:px-10">
            {[
              { icon: "🎓", value: "150+", label: "Courses Offered" },
              { icon: "📚", value: "50K+", label: "Total Enrollments" },
              { icon: "🌍", value: "30+", label: "Countries Reached" },
              { icon: "⭐", value: "4.8/5", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition">
                <span className="text-4xl">{stat.icon}</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 text-[#7670AC]">
                  {stat.value}
                </h3>
                <p className="text-gray-700 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#5491CA]">
            Start Your Learning Journey Today!
          </h2>
          <p className="text-sm md:text-lg max-w-3xl mx-auto mt-4 text-gray-700">
            Join thousands of learners and explore our high-quality courses.
          </p>
          <button className="mt-4 mb-16 md:mt-6 bg-[#5491CA] text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-[#7670AC] transition-transform transform hover:scale-105">
            Get Started
          </button>
        </section>  
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
