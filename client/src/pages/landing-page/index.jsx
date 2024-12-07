// import React, { useState } from "react";
// import SkillDevelopment from './skilldev/SkillDevelopment';
// import LandingSection from './Hero/hero';
// import Achievements from './Achievements/achievement';
// import Mentors from './Mentors/mentors';
// import Appi from './All-learning/AI';
// import CollaborationsAndFooter from './footer/footer';
// import PopularCourses from './PopularCourses';

// import { useNavigate } from "react-router-dom";
// import "./App.css";

// const App = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="app-container">
//       {/* Navigation Bar */}
//       <div className="navbar-container">
//         <nav className="navbar">
//           <div className="logo-section">
//             <div className="logo-icon">
//               <div className="logo-lines">
//                 <div className="logo-line"></div>
//                 <div className="logo-line"></div>
//               </div>
//             </div>
//             <div className="logo-text">
//               <span className="logo-ezy">EZY</span>
//               <span className="logo-skills">SKILLS</span>
//             </div>
//           </div>

//           {/* Hamburger Menu for Mobile */}
//           <div className="menu-icon" onClick={toggleMenu}>
//             <div className="menu-bar"></div>
//             <div className="menu-bar"></div>
//             <div className="menu-bar"></div>
//           </div>

//           <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
//             <a href="/" className="nav-link active-link">Home</a>
//             {/* <a href="/pop" className="nav-link">Courses</a> */}
//             <a href="/pricing" className="nav-link">Pricing</a>
//             <a href="/faq" className="nav-link">FAQ</a>
//             <a href="/contactus" className="nav-link">Contact Us</a>
//             <a href="/aboutus" className="nav-link">About Us</a>
//           </div>

//           {/* Get Started Button */}
//           <div className="auth-buttons">
//           <a href='/log' className="get-started-button">Get Started</a>
//           </div>
//         </nav>
//         <div className="landing">
//           <LandingSection />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//          <Appi />
//         <SkillDevelopment /> 
//        <PopularCourses />
//         <Achievements />
//         <Mentors />
//       </div>

//       {/* Footer and Collaborations Section */}
//       <CollaborationsAndFooter />
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import SkillDevelopment from './skilldev/SkillDevelopment';
import LandingSection from './Hero/hero';
import Achievements from './Achievements/achievement';
import Mentors from './Mentors/mentors';
import Appi from './All-learning/AI';
import CollaborationsAndFooter from './footer/footer';
import PopularCourses from './popular_courses/courses';
import Collaborators from './collaborators/collab';
import { useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./nav";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add smooth scroll effect when component mounts
  useEffect(() => {
    // Get all sections for intersection observer
    const sections = document.querySelectorAll('section');
    
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    // Observe all sections
    sections.forEach(section => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-container">
      <Nav />
      
      {/* Main Content */}
      <div className="main-content">
        <section className="landing section">
          <LandingSection />
        </section>
        <section>
          <Collaborators/>
        </section>
        <section className="ai-section section">
          <Appi />
        </section>
        
        <section className="skilldev section">
          <SkillDevelopment />
        </section>
        
        <section className="courses-section section">
          <PopularCourses />
        </section>
        
        <section className="achievement-section">
          <Achievements />
        </section>
        
        <section className="mentors-section section">
          <Mentors />
        </section>
      </div>

      {/* Footer and Collaborations Section */}
      <section className="footer-section">
        <CollaborationsAndFooter />
      </section>
    </div>
  );
};

export default App;