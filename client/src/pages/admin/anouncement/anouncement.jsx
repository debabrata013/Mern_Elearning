import React, { useState, useEffect } from "react";
import "./noti.css";

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [isAddNotificationVisible, setAddNotificationVisible] = useState(false);
  const [notificationFor, setNotificationFor] = useState(""); // 'student' or 'teacher'
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNotification, setEditingNotification] = useState(null);

  // Open Add Notification Page
  const handleAddNotification = (type) => {
    setNotificationFor(type);
    setEditingNotification(null);
    setAddNotificationVisible(true);
  };

  // Handle Notification Submission
  const handleNotificationSubmit = (newNotification) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = Date.now(); // Save timestamp
    if (editingNotification !== null) {
      setNotifications((prev) =>
        prev.map((n, i) =>
          i === editingNotification.index
            ? {
                ...newNotification,
                date: editingNotification.date,
                time: editingNotification.time,
                for: editingNotification.for,
              }
            : n
        )
      );
    } else {
      setNotifications([
        ...notifications,
        { ...newNotification, date: currentDate, time: currentTime, for: notificationFor },
      ]);
    }
    setAddNotificationVisible(false);
    setEditingNotification(null);
  };

  // Delete Notification
  const handleDeleteNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  // Edit Notification
  const handleEditNotification = (index) => {
    const notificationToEdit = notifications[index];
    setEditingNotification({ ...notificationToEdit, index });
    setAddNotificationVisible(true);
  };

  // Search Filter
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Calculate elapsed time for each notification
  const calculateElapsedTime = (timestamp) => {
    const now = Date.now();
    const elapsed = now - timestamp; // Time difference in milliseconds

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  // Periodically refresh elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [...prev]); // Trigger re-render
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Filtered Notifications
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      {isAddNotificationVisible ? (
        <AddNotificationPage
          onSubmit={handleNotificationSubmit}
          onCancel={() => setAddNotificationVisible(false)}
          editingNotification={editingNotification}
        />
      ) : (
        <div className="home-page">
          <h1 className="headingi">Notifications </h1>

          <div className="inner-body">
          {notifications.length > 0 && (
            <input
              type="text"
              placeholder="Search Notifications..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-bar"
            />
          )}
          <button className="dropdown-button">
            Add Notification
            <div className="dropdown-content">
              <button onClick={() => handleAddNotification("student")}>For Student</button>
              <button onClick={() => handleAddNotification("teacher")}>For Teacher</button>
            </div>
          </button>
          {notifications.length === 0 ? (
            <p className="home-text">No notifications added.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>For Whom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((notification, index) => (
                  <tr key={index}>
                    <td>{notification.title}</td>
                    <td>
                      {notification.link ? (
                        <>
                          {notification.description}
                          <br />
                          <a
                            href={notification.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="join-button"
                          >
                            Join
                          </a>
                        </>
                      ) : (
                        notification.description
                      )}
                    </td>
                    <td>{notification.date}</td>
                    <td>{calculateElapsedTime(notification.time)}</td>
                    <td>{notification.for}</td>
                    <td className="action-cell">
                      <button onClick={() => handleEditNotification(index)}>Edit</button>
                      <button onClick={() => handleDeleteNotification(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        </div>
      )
      }
    </div>
    
  );
};


const AddNotificationPage = ({ onSubmit, onCancel, editingNotification }) => {
  const [formData, setFormData] = useState(
    editingNotification || {
      title: "",
      description: "",
      link: "",
      image: null,
      type: "none",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="add-notification">
      <h1>{editingNotification ? "Edit Notification" : "Add Notification"}</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
      ></textarea>
      <div>
        <label>
          Notification Type
          <select
            name="type"
            value={formData.type}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="none">None</option>
            <option value="text">Text</option>
            <option value="link">Link</option>
          </select>
        </label>
        {formData.type === "text" && (
          <input
            type="text"
            name="description"
            placeholder="Text Notification"
            value={formData.description}
            onChange={handleInputChange}
          />
        )}
        {formData.type === "link" && (
          <input
            type="url"
            name="link"
            placeholder="Link Notification"
            value={formData.link}
            onChange={handleInputChange}
          />
        )}
      </div>
      {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
      <div className="buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
