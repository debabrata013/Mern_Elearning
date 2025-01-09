import React, { useState } from "react";
import "./certificate.css";
import html2canvas from "html2canvas";  /////need to install ---------------npm install html2canvas


const CertificatePage = () => {
  const [view, setView] = useState("home");
  const [certificates, setCertificates] = useState([]);
  const [editData, setEditData] = useState(null);
  const [activeText, setActiveText] = useState(null);
  const [activeColor, setActiveColor] = useState("#000000");

  const handleAddCertificate = () => {
    setView("addCertificate");
    setEditData(null);
  };

  const handleSaveCertificate = (data) => {
    if (editData) {
      setCertificates((prev) =>
        prev.map((cert) =>
          cert.id === editData.id ? { ...cert, ...data } : cert
        )
      );
    } else {
      setCertificates((prev) => [
        ...prev,
        { ...data, id: Date.now() },
      ]);
    }
    setView("home");
  };

  const handleEditCertificate = (id) => {
    const cert = certificates.find((c) => c.id === id);
    setEditData(cert);
    setView("addCertificate");
  };

  const handleDeleteCertificate = (id) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  return (
    <div className="certificate-page">
      {view === "home" ? (
        <div className="home-page">
          <h1>Certificate Dashboard</h1>
          <div className="controls-row">
            <input
              type="text"
              placeholder="Search certificates..."
              className="search-bar"
            />
            <button className="add-button" onClick={handleAddCertificate}>
              Add Certificate
            </button>
          </div>
          <div className="certificates-container">
            {certificates.map((cert) => (
              <div key={cert.id} className="certificate-card">
                <img
                  src={cert.template}
                  alt="Certificate"
                  className="certificate-image"
                />
                <div className="certificate-details">
                  <p><b>Course:</b> {cert.courseName}</p>
                  <p><b>Organization:</b> {cert.organization}</p>
                  <p><b>Student:</b> {cert.firstName} {cert.lastName}</p>
                  <p><b>Date:</b> {cert.date}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditCertificate(cert.id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCertificate(cert.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AddCertificatePage
          onSave={handleSaveCertificate}
          onCancel={() => setView("home")}
          editData={editData}
          activeText={activeText}
          setActiveText={setActiveText}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      )}
    </div>
  );
};

const AddCertificatePage = ({
  onSave,
  onCancel,
  editData,
  activeText,
  setActiveText,
  activeColor,
  setActiveColor,
}) => {
  const [formData, setFormData] = useState(
    editData || {
      template: "",
      firstName: "",
      lastName: "",
      description: "",
      supervisorSign: "", 
      leaderSign: "",
      courseName: "",
      organization: "",
      date: "",
      positions: {
        firstName: { x: 50, y: 10, size: 16, color: "#000000", font: "Arial" },
        lastName: { x: 50, y: 30, size: 16, color: "#000000", font: "Arial" },
        description: { x: 50, y: 50, size: 16, color: "#000000", font: "Arial" },
        courseName: { x: 50, y: 50, size: 16, color: "#000000", font: "Arial" },
        organization: { x: 50, y: 50, size: 16, color: "#000000", font: "Arial" },
        date: { x: 50, y: 50, size: 16, color: "#000000", font: "Arial" },
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handlePositionChange = (axis, value) => {
    if (activeText) {
      setFormData((prev) => {
        const updatedPositions = { ...prev.positions };
        updatedPositions[activeText] = { ...updatedPositions[activeText], [axis]: value };
        return { ...prev, positions: updatedPositions };
      });
    }
  };

  const handleSizeChange = (value) => {
    if (activeText) {
      setFormData((prev) => {
        const updatedPositions = { ...prev.positions };
        updatedPositions[activeText] = { ...updatedPositions[activeText], size: value };
        return { ...prev, positions: updatedPositions };
      });
    }
  };

  const handleColorChange = (e) => {
    if (activeText) {
      setFormData((prev) => {
        const updatedPositions = { ...prev.positions };
        updatedPositions[activeText] = { ...updatedPositions[activeText], color: e.target.value };
        return { ...prev, positions: updatedPositions };
      });
    }
    setActiveColor(e.target.value);
  };

  const handleFontChange = (e) => {
    if (activeText) {
      setFormData((prev) => {
        const updatedPositions = { ...prev.positions };
        updatedPositions[activeText] = { ...updatedPositions[activeText], font: e.target.value };
        return { ...prev, positions: updatedPositions };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleSaveAsImage = () => {
    const certificateElement = document.querySelector(".certificate-preview-container");
    if (certificateElement) {
      html2canvas(certificateElement).then((canvas) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };
  

  return (
    <div className="add-certificate-page">
      <h1>{editData ? "Edit Certificate" : "Add Certificate"}</h1>
      <div className="add-certificate-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <label>Certificate Template:</label>
            <input type="file" name="template" onChange={handleFileChange} />
            <label> Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter the name"
              value={formData.firstName}
              onChange={handleChange}
              onClick={() => setActiveText("firstName")}
            />
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter the description "
              value={formData.description}
              onChange={handleChange}
              onClick={() => setActiveText("description")}
            />
            <label>Course Name:</label>
            <input
              type="text"
              name="courseName"
              placeholder="Course name"
              value={formData.courseName}
              onChange={handleChange}
              onClick={() => setActiveText("courseName")}
            />
            <label>Organization Name:</label>
            <input
              type="text"
              name="organization"
              placeholder="organization name"
              value={formData.organization}
              onChange={handleChange}
              onClick={() => setActiveText("organization")}
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onClick={() => setActiveText("date")}
            />
            <button type="submit" className="submit-button">
              {editData ? "Update" : "Submit"}
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            
          </form>
          
        </div>

        <div className="preview-section">
          {formData.template && (
            <div className="certificate-preview-container">
              <img
                src={formData.template}
                alt="Certificate Preview"
                className="certificate-preview"
              />
              <div
                className="certificate-text"
                style={{
                  position: "absolute",
                  top: `${formData.positions.firstName.y}%`,
                  left: `${formData.positions.firstName.x}%`,
                  fontSize: `${formData.positions.firstName.size}px`,
                  color: formData.positions.firstName.color,
                  fontFamily: formData.positions.firstName.font,
                }}
              >
                {formData.firstName}
              </div>
              
              <div
                className="certificate-text"
                style={{
                  position: "absolute",
                  top: `${formData.positions.description.y}%`,
                  left: `${formData.positions.description.x}%`,
                  fontSize: `${formData.positions.description.size}px`,
                  color: formData.positions.description.color,
                  fontFamily: formData.positions.description.font,
                }}
              >
                {formData.description}
              </div>
              <div
                className="certificate-text"
                style={{
                  position: "absolute",
                  top: `${formData.positions.courseName.y}%`,
                  left: `${formData.positions.courseName.x}%`,
                  fontSize: `${formData.positions.courseName.size}px`,
                  color: formData.positions.courseName.color,
                  fontFamily: formData.positions.courseName.font,
                }}
              >
                {formData.courseName}
              </div>
              <div
                className="certificate-text"
                style={{
                  position: "absolute",
                  top: `${formData.positions.organization.y}%`,
                  left: `${formData.positions.organization.x}%`,
                  fontSize: `${formData.positions.organization.size}px`,
                  color: formData.positions.organization.color,
                  fontFamily: formData.positions.organization.font,
                }}
              >
                {formData.organization}
              </div>
              <div
                className="certificate-text"
                style={{
                  position: "absolute",
                  top: `${formData.positions.date.y}%`,
                  left: `${formData.positions.date.x}%`,
                  fontSize: `${formData.positions.date.size}px`,
                  color: formData.positions.date.color,
                  fontFamily: formData.positions.date.font,
                }}
              >
                {formData.date}
              </div>
            </div>
          )}
          
        </div>
    <div className="text-manipulation-box">
        <h3>Text Manipulation</h3>
        {activeText && (
          <>
            <label>X Position:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.positions[activeText].x}
              onChange={(e) => handlePositionChange("x", e.target.value)}
            />
            <label>Y Position:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.positions[activeText].y}
              onChange={(e) => handlePositionChange("y", e.target.value)}
            />
            <label>Size:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.positions[activeText].size}
              onChange={(e) => handleSizeChange(e.target.value)}
            />
            <label>Text Color:</label>
            <input
              type="color"
              value={formData.positions[activeText].color}
              onChange={handleColorChange}
            />
            <label>Font:</label>
            <select
              value={formData.positions[activeText].font}
              onChange={handleFontChange}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
            </select>
            <button onClick={handleSaveAsImage} className="save-button">
            Save as Image
          </button>
          </>
        )}
      </div>
      </div>
          
    </div>
    
  );
};

export default CertificatePage;
