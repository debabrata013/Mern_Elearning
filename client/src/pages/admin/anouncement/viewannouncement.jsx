import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./view.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const AnnouncementView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4400/announcements/");
      setAnnouncements(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await axios.delete(`http://localhost:4400/announcements/${id}`);
        fetchAnnouncements(); // Refresh the announcements list
      } catch (err) {
        console.error("Error deleting announcement:", err);
        setError("Failed to delete announcement.");
      }
    }
  };

  // Filter announcements based on search term and filter type
  const filteredAnnouncements = announcements.filter(announcement => {
    if (filterType !== "all" && announcement.targetAudience !== filterType) {
      return false;
    }
    if (searchTerm) {
      return (
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="inner-body">
      <h1 className="headingi">View Announcements</h1>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div className="dropdown-button">
          Filter By
          <div className="dropdown-content dropdown-2">
            <button onClick={() => handleFilterChange("all")}>All</button>
            <button onClick={() => handleFilterChange("student")}>Students</button>
            <button onClick={() => handleFilterChange("teacher")}>Teachers</button>
          </div>
        </div>
        
        <input
          type="text"
          className="search-bar"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="home-text">Loading announcements...</div>
      ) : error ? (
        <div className="home-text" style={{ color: "red" }}>
          {error}
          <button onClick={fetchAnnouncements} className="join-button" style={{ marginLeft: "10px" }}>
            Retry
          </button>
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="home-text">No announcements found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Target Audience</th>
              <th>Type</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((announcement) => (
              <tr key={announcement._id || announcement.id}>
                <td>{announcement.title}</td>
                <td>{announcement.description.length > 100 ? `${announcement.description.substring(0, 100)}...` : announcement.description}</td>
                <td style={{ textTransform: "capitalize" }}>{announcement.targetAudience}</td>
                <td>{announcement.type}</td>
                <td>{new Date(announcement.createdAt || Date.now()).toLocaleDateString()}</td>
                <td className="action-cell">
                  {announcement.type === "link" && announcement.link && (
                    <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="join-button" style={{ marginRight: "5px", textDecoration: "none" }}>
                      <FaEye className="mr-1" /> View
                    </a>
                  )}
                  <button className="action-btn edit-btn" style={{ marginRight: "5px", backgroundColor: "#5491CA" }}>
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button className="action-btn delete-btn" style={{ backgroundColor: "#FF6B6B" }} onClick={() => handleDelete(announcement._id || announcement.id)}>
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnnouncementView;