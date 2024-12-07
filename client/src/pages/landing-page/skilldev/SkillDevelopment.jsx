import React from 'react';
import './SkillDevelopment.css';
import image1 from './Groupicons-1.png';
import image2 from './Groupicons-2.png';
import image3 from './Groupicons-3.png';
import image4 from './Groupicons.png';
import groupImage from './Group 2224.png';
import master from './working.png';
const SkillDevelopment = () => {
  const whoCanJoin = [
    {
      id: '01',
      icon: 'image1',
      title: 'Colleges/Universities'
    },
    {
      id: '02',
      icon: '/icons/professional.svg',
      title: 'Individuals/Working\nProfessionals'
    },
    {
      id: '03',
      icon: '/icons/startup.svg',
      title: 'Startups'
    },
    {
      id: '04',
      icon: '/icons/corporate.svg',
      title: 'Corporates'
    }
  ];

  const workflowSteps = [
    {
      id: '01',
      title: 'Assessment\nAptitude Test\nInterview'
    },
    {
      id: '02',
      title: 'Hands-on Practice\nScreening Test\nCases'
    },
    {
      id: '03',
      title: 'Soft Skills &\nBusiness Training'
    },
    {
      id: '04',
      title: 'Daily, Weekly, Monthly\nAssessments'
    },
    {
      id: '05',
      title: 'Real Time Project\nHackathons'
    },
    {
      id: '06',
      title: 'Assessment Guidance\n& Mentoring'
    }
  ];

  return (
    <div className="skill-development">
      <div className="who-can-join">
        <h3 className="section-subtitle">WHO CAN JOIN</h3>
        <h2 className="section-title">Skill Development<br />Schemes For All</h2>
        
        <div className="join-content">
          <div className="join-categories">
            
              <div  className="category-item">
                <div className="category-number">01</div>
                <img src={image1}  className="category-icon" />
                <p className="category-title">Individuals/Working Professionals
                </p>
              </div>

              <div  className="category-item">
                <div className="category-number">02</div>
                <img src={image2}  className="category-icon" />
                <p className="category-title">Startups</p>
              </div>

              <div  className="category-item">
                <div className="category-number">03</div>
                <img src={image3}  className="category-icon" />
                <p className="category-title">Corporates</p>
              </div>

              <div  className="category-item">
                <div className="category-number">04</div>
                <img src={image4}  className="category-icon" />
                <p className="category-title">Colleges/Universities</p>
              </div>
            
          </div>
          
          <div className="illustration">
            <img src={master} alt="Learning illustration" />
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2 className="workflow-title">How It Works</h2>


        <div className="workflow-container">
          <div className="workflow-endpoint start">
            <img className='image' src={groupImage} alt="Group" /></div>
        </div>


      </div>
    </div>
  );
};

export default SkillDevelopment;