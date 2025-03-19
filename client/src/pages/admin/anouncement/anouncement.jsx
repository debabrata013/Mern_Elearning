import React, { useState } from "react";
import "./noti.css";
import axios from 'axios';

const AddNotificationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    type: "text",
    targetAudience: "student"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ 
      ...prevData, 
      [name]: value 
    }));
    setErrors(prevErrors => ({ 
      ...prevErrors, 
      [name]: "" 
    }));
  };

  const onCancel = () => {
    setFormData({
      title: "",
      description: "",
      link: "",
      type: "text",
      targetAudience: "student"
    });
    setErrors({});
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const validationErrors = {};

    // Validation checks
    if (!formData.title) validationErrors.title = "Title is required";
    if (!formData.description) validationErrors.description = "Description is required";
    if (!formData.type) validationErrors.type = "Notification type is required";
    if (formData.type === "link" && !formData.link) validationErrors.link = "Link is required";

    // Set validation errors
    setErrors(validationErrors);

    // If there are validation errors, stop submission
    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      // Prepare data for submission
      const submissionData = {
        title: formData.title,
        description: formData.description,
        link: formData.link || "",
        type: formData.type,
        targetAudience: formData.targetAudience
      };

      // Submit notification
      const response = await axios.post("http://localhost:4400/announcements/", submissionData);
      
      // Reset form and show success
      onCancel();
      alert("Notification added successfully!");
    } catch (error) {
      console.error("Error submitting notification:", error);
      setErrors({
        general: error.response?.data?.message || "An error occurred while submitting the notification."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-notification">
      <h1>Add Notification</h1>
      
      {/* Title Input */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter notification title"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      {/* Description Input */}
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter notification description"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      {/* Notification Type */}
      <div className="form-group">
        <label>Notification Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="text">Text</option>
          <option value="link">Link</option>
        </select>
        {errors.type && <span className="error">{errors.type}</span>}
      </div>

      {/* Link Input (Conditional) */}
      {formData.type === "link" && (
        <div className="form-group">
          <label>Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter notification link"
          />
          {errors.link && <span className="error">{errors.link}</span>}
        </div>
      )}

      {/* Target Audience */}
      <div className="form-group">
        <label>Target Audience</label>
        <select
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleInputChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {/* General Error */}
      {errors.general && <div className="error">{errors.general}</div>}

      {/* Action Buttons */}
      <div className="buttons">
        <button 
          onClick={handleSubmit} 
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNotificationPage;
