import React, { useEffect, useState } from "react";
import "./collab.css";
import google from"./Google-logo.png"
import a2 from"./hitachi.png"
import a3 from"./microsoft-logo.png"
import a4 from"./samsung-logo.png"
import a5 from"./tagheuer-logo.png"
const Collaborators = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-up effect when the component is loaded
    setIsVisible(true);
  }, []);

  return (
    <div className={`collaborators-container ${isVisible ? "visible" : ""}`}>
      <div className="logo-carousel">
        <div className="logos">
          {/* Replace these with your actual logos */}
          <div className="logo">
          <img src={google} alt="Logo 1" />
          </div>
          <div className="logo"><img src={a2} alt="Logo 1" /></div>
          <div className="logo"><img src={a3} alt="Logo 1" /></div>
          <div className="logo"><img src={a4} alt="Logo 1" /></div>
          <div className="logo"><img src={a5} alt="Logo 1" /></div>
          {/* Duplicate logos for smooth loop */}
          <div className="logo"><img src={google} alt="Logo 1" /></div>
          <div className="logo"><img src={a2} alt="Logo 1" /></div>
          <div className="logo"><img src={a3} alt="Logo 1" /></div>
          <div className="logo"><img src={a4} alt="Logo 1" /></div>
          <div className="logo"><img src={a5} alt="Logo 1" /></div>
          {/* Duplicate logos for smooth loop */}
          <div className="logo"><img src={google} alt="Logo 1" /></div>
          <div className="logo"><img src={a2} alt="Logo 1" /></div>
          <div className="logo"><img src={a3} alt="Logo 1" /></div>
          <div className="logo"><img src={a4} alt="Logo 1" /></div>
          <div className="logo"><img src={a5} alt="Logo 1" /></div>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;