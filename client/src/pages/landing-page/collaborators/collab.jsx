import React, { useEffect, useState } from "react";
import "./collab.css";
import google from "./Google-logo.png";
import a2 from "./hitachi.png";
import a3 from "./microsoft-logo.png";
import a4 from "./samsung-logo.png";
import a5 from "./tagheuer-logo.png";

const Collaborators = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`collaborators-container ${isVisible ? "visible" : ""}`}>
      <div className="logo-carousel">
        <div className="logos">
          <div className="logo">
            <img src={google} alt="Google Logo" />
          </div>
          <div className="logo">
            <img src={a2} alt="Hitachi Logo" />
          </div>
          <div className="logo">
            <img src={a3} alt="Microsoft Logo" />
          </div>
          <div className="logo">
            <img src={a4} alt="Samsung Logo" />
          </div>
          <div className="logo">
            <img src={a5} alt="Tag Heuer Logo" />
          </div>
          {/* Duplicate logos for smooth loop */}
          <div className="logo">
            <img src={google} alt="Google Logo" />
          </div>
          <div className="logo">
            <img src={a2} alt="Hitachi Logo" />
          </div>
          <div className="logo">
            <img src={a3} alt="Microsoft Logo" />
          </div>
          <div className="logo">
            <img src={a4} alt="Samsung Logo" />
          </div>
          <div className="logo">
            <img src={a5} alt="Tag Heuer Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
