import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const AnnouncementView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4400/announcements/");
      setAnnouncements(response.data.announcements);
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
    setIsFilterOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await axios.delete(`http://localhost:4400/announcements/${id}`);
        fetchAnnouncements();
      } catch (err) {
        console.error("Error deleting announcement:", err);
        setError("Failed to delete announcement.");
      }
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      announcement.targetAudience.includes(filterType);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="shadow-md p-4 md:p-8 rounded-xl">
      <h1 className="font-bold text-xl md:text-2xl mb-4 text-[#5491CA]">View Announcements</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="relative w-full md:w-auto">
          <button 
            className="bg-[#5491CA] text-white px-5 py-2 rounded-md text-base w-full md:w-auto flex justify-between items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter By
            <svg 
              className={`ml-2 w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-md z-10 w-full">
              <button className="block px-5 py-2 text-left w-full hover:bg-gray-100" onClick={() => handleFilterChange("all")}>All</button>
              <button className="block px-5 py-2 text-left w-full hover:bg-gray-100" onClick={() => handleFilterChange("student")}>Students</button>
              <button className="block px-5 py-2 text-left w-full hover:bg-gray-100" onClick={() => handleFilterChange("teacher")}>Teachers</button>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2.5 text-base border border-gray-300 rounded-lg focus:border-[#5491CA] focus:outline-none focus:shadow-[0_0_8px_rgba(84,145,202,0.3)]"
        />
      </div>

      {loading ? (
        <div className="text-center border-2 border-dashed border-[#5491CA] bg-[#5491CA10] text-lg md:text-xl py-8 md:py-10 rounded-md">
          Loading announcements...
        </div>
      ) : error ? (
        <div className="text-center border-2 border-dashed border-[#5491CA] bg-[#5491CA10] text-lg md:text-xl py-8 md:py-10 rounded-md text-red-600">
          {error}
          <button onClick={fetchAnnouncements} className="ml-2 bg-[#5491CA] text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-[#4a82b6]">
            Retry
          </button>
        </div>
      ) : (
        <div className="overflow-auto">
          {/* Desktop Table */}
          <table className="w-full mt-5 border-collapse bg-white rounded-md shadow-md hidden md:table">
            <thead className="bg-[#5491CA] text-white">
              <tr>
                <th className="p-3 md:p-4 text-left text-sm md:text-base font-bold">Title</th>
                <th className="p-3 md:p-4 text-left text-sm md:text-base font-bold">Description</th>
                <th className="p-3 md:p-4 text-left text-sm md:text-base font-bold">Target</th>
                <th className="p-3 md:p-4 text-left text-sm md:text-base font-bold">Type</th>
                <th className="p-3 md:p-4 text-left text-sm md:text-base font-bold">Date</th>
                <th className="p-3 md:p-4 text-left text-sm md:text-base font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.map((announcement) => (
                <tr key={announcement._id} className="even:bg-[#f8f9fc]">
                  <td className="p-3 md:p-4">{announcement.title}</td>
                  <td className="p-3 md:p-4">
                    {announcement.description.length > 100
                      ? `${announcement.description.substring(0, 100)}...`
                      : announcement.description}
                  </td>
                  <td className="p-3 md:p-4 capitalize">{announcement.targetAudience.join(", ")}</td>
                  <td className="p-3 md:p-4">{announcement.notificationType}</td>
                  <td className="p-3 md:p-4">{new Date(announcement.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 md:p-4">
                    <div className="flex flex-wrap gap-2">
                      {announcement.notificationType === "link" && announcement.link && (
                        <a
                          href={announcement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#5491CA] text-white px-3 py-1 rounded-md hover:bg-[#4a82b6] text-sm"
                        >
                          <FaEye className="inline mr-1" /> View
                        </a>
                      )}
                      <button
                        className="bg-[#FF6B6B] text-white px-3 py-1 rounded-md hover:shadow-md hover:bg-red-500 text-sm"
                        onClick={() => handleDelete(announcement._id)}
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement._id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-[#5491CA]">{announcement.title}</h3>
                  <span className="text-sm bg-[#5491CA] text-white px-2 py-1 rounded-full">
                    {announcement.notificationType}
                  </span>
                </div>
                <p className="my-2 text-gray-600">
                  {announcement.description.length > 100
                    ? `${announcement.description.substring(0, 100)}...`
                    : announcement.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {announcement.targetAudience.map((audience) => (
                    <span key={audience} className="text-xs bg-gray-200 px-2 py-1 rounded-full capitalize">
                      {audience}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    {announcement.notificationType === "link" && announcement.link && (
                      <a
                        href={announcement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#5491CA] text-white px-3 py-1 rounded-md hover:bg-[#4a82b6] text-sm"
                      >
                        <FaEye className="inline mr-1" />
                      </a>
                    )}
                    <button
                      className="bg-[#FF6B6B] text-white px-3 py-1 rounded-md hover:shadow-md hover:bg-red-500 text-sm"
                      onClick={() => handleDelete(announcement._id)}
                    >
                      <FaTrash className="inline" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementView;