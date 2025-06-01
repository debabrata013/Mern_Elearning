import React, { useEffect, useState } from "react";
import axios from "axios";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");
  const [activeSection, setActiveSection] = useState("not-replied"); // Default to not-replied section

  const fetchQueries = async () => {
    try {
      const response = await axios.get("http://localhost:4400/contactus");
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setQueries(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setQueries(response.data.data);
      } else {
        setQueries([]);
      }
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError("Failed to fetch queries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleDelete = async (queryId) => {
    try {
      await axios.delete(`http://localhost:4400/contactus/${queryId}`);
      fetchQueries();
    } catch (err) {
      console.error("Error deleting query:", err);
      setError("Failed to delete query. Please try again.");
    }
  };

  const handleReply = async(query) => {
    await axios.put(`http://localhost:4400/contactus/${query._id}`);
    const subject = encodeURIComponent(`Re: ${query.issueRelated}`);
    const body = encodeURIComponent(`
message recived:
Name: ${query.name}
Email: ${query.contactEmail}
Phone: ${query.phoneNumber}
Issue: ${query.issueRelated}

Original Message:
${query.message}
---





`);
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(query.contactEmail)}&su=${subject}&body=${body}`;
    window.open(gmailComposeUrl, '_blank');
  };

  // Split queries by isreplayed
  const replied = queries.filter(q => q.isreplayed && (!searchEmail || q.contactEmail.toLowerCase().includes(searchEmail.toLowerCase())));
  const notReplied = queries.filter(q => !q.isreplayed && (!searchEmail || q.contactEmail.toLowerCase().includes(searchEmail.toLowerCase())));

  const renderTable = (queries) => (
    <table className="w-full border border-[#5491CA] rounded-lg shadow-md">
      <thead className="bg-[#5491CA] text-white">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">Issue</th>
          <th className="px-4 py-2">Message</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {queries.length === 0 ? (
          <tr><td colSpan="6" className="text-center py-4">No queries found.</td></tr>
        ) : queries.map((query, index) => (
          <tr key={index} className="border-b hover:bg-gray-100">
            <td className="px-4 py-2">{query.name}</td>
            <td className="px-4 py-2">{query.contactEmail}</td>
            <td className="px-4 py-2">{query.phoneNumber}</td>
            <td className="px-4 py-2">{query.issueRelated}</td>
            <td className="px-4 py-2">{query.message}</td>
            <td className="px-4 py-2 space-y-2">
              <button 
                onClick={() => handleReply(query)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors block w-full"
              >
                Reply
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="queries-container pt-20 bg-white min-h-screen px-4">
      <h1 className="text-4xl font-extrabold text-[#5491CA] text-center mb-6">User Queries</h1>
      
      {/* Navigation Bar */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            activeSection === 'not-replied'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveSection('not-replied')}
        >
          Not Replied ({notReplied.length})
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            activeSection === 'replied'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveSection('replied')}
        >
          Replied ({replied.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by email..."
          className="border border-[#5491CA] rounded px-4 py-2 w-full max-w-md"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
        />
      </div>

      {/* Conditional Rendering of Sections */}
      <div className="overflow-x-auto">
        {activeSection === 'replied' ? (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Replied Queries</h2>
            {renderTable(replied)}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Pending Queries</h2>
            {renderTable(notReplied)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Queries;
