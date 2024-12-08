import React from "react";
import certi from "../CertificateSection/certificate.png";
import "./CertificateSection.css";


const CertificateSection = () => {
  return (
    <div className="certificate-section">
      <div className="certificate-text">
        <h2 className="heading">Certificate</h2>
        <h3>The Certification of Digitoria</h3>
        <p>
            Digitoria Education Certificates honor your hard work, preparing you for the future of work.
        </p>
      </div>
      <div className="certificate-image">
        <img
          src={certi}
          alt="Certificate"
        />
      </div>
    </div>
  );
};

export default CertificateSection;
