import React, { useEffect } from 'react';
import Nav from '../nav-bar/nav';
import Footer from '../footer/footer';
import './AboutUs.css';
import image1 from '../about-us/group.png';
import image2 from '../about-us/mask.png';
import circleImage from '../about-us/circle.png';
import missionIcon from '../about-us/Frame-1.png';
import visionIcon from '../about-us/Frame.png';

const AboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fadeIn, .slideIn, .bounceIn, .zoomIn');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <Nav />
      </nav>
      <section className="about-us">
        {/* Header Section - Improved with background and spacing */}
        <div className="heading1">
          <div className="heading-container">
            <span className="hh1">About </span>
            <span className="hh2">Us</span>
          </div>
        </div>

        {/* Top Section - Added container for better spacing */}
        <div className="top-section-container">
          <div className="top-section fadeIn">
            <div className="top-left">
              <h5 className="section-tag">ABOUT US</h5>
              <h1 className="main-heading">The Platform For The Next Billion Learners</h1>
              <div className="desc">
                <p className="subtext">
                  Transforming tech education for the next generation of students & employees
                </p>
                <p className="additional-text">
                  Our vision is to make high-quality education accessible to everyone, anywhere. Whether you're
                  looking to boost your skills for a better job or acquire new knowledge for personal growth, we
                  have something for everyone.
                </p>
                <p className="additional-text">
                  We believe in the power of technology to unlock learning opportunities that were once unavailable.
                  Join us as we shape the future of education.
                </p>
              </div>
            </div>
            <div className="top-right slideIn">
              <img src={image1} alt="Top Section Image 1" className="image-placeholder img-1" />
              <img src={image2} alt="Top Section Image 2" className="image-placeholder img-2" />
            </div>
          </div>
        </div>

        {/* Bottom Section - Added container for consistency */}
        <div className="bottom-section-container">
          <div className="bottom-section bounceIn">
            <div className="bottom-left">
              <img src={circleImage} alt="Circle Shape" className="circle-image img-3" />
              <div className="decorative-shape"></div>
            </div>
            <div className="bottom-right">
              <h5 className="story-tag">OUR STORY</h5>
              <h2 className="story-heading">Innovating new ways to train students</h2>
              <p className="story-text">
                We see no limits to what we can achieve by harnessing our individual and collective strengths. We are
                changing the world with our ideas, insights, and unique perspectives.
              </p>
              <p className="story-text">
                Our journey began with a shared vision of creating a platform that not only provides education but
                helps learners adapt to the evolving demands of the workforce. We are committed to building an
                educational ecosystem that prepares students for real-world challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Mission and Vision Section - Improved layout */}
        <div className="mission-vision-container">
          <div className="mission-vision zoomIn">
            <div className="mission">
              <div className="icon-wrapper">
                <img src={missionIcon} alt="Mission" className="icon1" />
              </div>
              <h2 className="section-title">Our <span className="highlight">Mission</span></h2>
              <p className="section-description">
                Provide practice-based skill trainings using unique teaching methodologies to enhance the right skills
                required in industry for working professionals, college students, and startups.
              </p>
            </div>
            <div className="vision">
              <div className="icon-wrapper">
                <img src={visionIcon} alt="Vision" className="icon" />
              </div>
              <h2 className="section-title">Our <span className="highlight">Vision</span></h2>
              <p className="section-description">
                To transform students into skilled employees by imparting industry-relevant skills within a corporate
                working environment with a holistic approach.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
