
import Nav from "../nav-bar/nav";
import Footer from "../footer/footer";
import React from 'react';
import './AboutUs.css';

// Import Images
import image1 from '../about-us/group.png'; // Top Section Image 1
import image2 from '../about-us/mask.png'; // Top Section Image 2
import circleImage from '../about-us/circle.png'; // Bottom Section Circle Image
import missionIcon from '../about-us/Frame-1.png'; // Mission Icon
import visionIcon from '../about-us/Frame.png'; // Vision Icon


const AboutUs = () => {
  return (
    <>
    <nav className="navbar">
        <Nav />
      </nav>
    <section className="about-us">
      
    <div className="heading1">
      <span className="hh1">About </span>
      <span className="hh2">Us</span>
    </div>
      <div className="top-section">
        <div className="top-left">
          <h5 className="section-tag">ABOUT US</h5>
          <h1 className="main-heading">The Platform For The Next Billion Learners</h1>
          <p className="subtext">
            Transforming tech education for the next generation of students & employees
          </p>
        </div>
        <div className="top-right">
          <img src={image1} alt="Top Section Image 1" className="image-placeholder img-1" />
          <img src={image2} alt="Top Section Image 2" className="image-placeholder img-2" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="bottom-left">
          <img src={circleImage} alt="Circle Shape" className="circle-image img-3" />
          <div className="decorative-shape"></div>
        </div>
        <div className="bottom-right">
          <h5 className="story-tag">OUR STORY</h5>
          <h2 className="story-heading">Innovating new ways to train students</h2>
          <p className="story-text">
            We see no limits to what we can achieve by harnessing our individual and collective strengths.
            We are changing the world with our ideas, insights, and unique perspectives.
          </p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="mission-vision">
        <div className="mission">
          <img src={missionIcon} alt="Mission" className="icon1" />
          <h2 className="section-title">Our <span>Mission</span></h2>
          <p className="section-description">
            Provide practice-based skill trainings using n unique teaching methodologies to enhance the right skills
            required in industry for working professionals, college students, and startups.
          </p>
        </div>
        <div className="vision">
          <img src={visionIcon} alt="Vision" className="icon" />
          <h2 className="section-title">Our <span>Vision</span></h2>
          <p className="section-description">
            To transform students into skilled employees by imparting industry-relevant skills within a corporate
            working environment with a holistic approach.
          </p>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="team-section">  
        <h2 className="team-heading">Our <span>Team</span></h2>
        <div className="team-members">
          <div className="team-card">
            <img src="" alt="Kishore Kumar" className="profile-pic" />
            <h4>KISHORE KUMAR</h4>
            <p>CEO & FOUNDER</p>
          </div>
          <div className="team-card">
            <img src="" alt="Suchitra" className="profile-pic" />
            <h4>SUCHITRA</h4>
            <p>DIRECTOR - HR & OPERATIONS</p>
          </div>
          <div className="team-card">
            <img src="" alt="Naren M" className="profile-pic" />
            <h4>NAREN M</h4>
            <p>Co-Founder</p>
          </div>
        </div>
      </div> */}

      {/* Advisors Section */}

    </section>
    <Footer />
    </>
  );
};

export default AboutUs;
