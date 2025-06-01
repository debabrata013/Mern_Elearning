import React, { useEffect, useState } from "react";
import axios from "axios";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");

  const fetchQueries = async () => {
    try {
      const response = await axios.get("http://localhost:4400/contactus");
      console.log("API Response:", response.data); // Debugging log

      // Ensure the response is an array
      if (Array.isArray(response.data)) {
        setQueries(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setQueries(response.data.data); // If API returns { data: [...] }
      } else {
        setQueries([]); // Fallback to empty array
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
      // Refresh the queries list after successful deletion
      fetchQueries();
    } catch (err) {
      console.error("Error deleting query:", err);
      setError("Failed to delete query. Please try again.");
    }
  };

  const handleReply = async(query) => {
  await axios.put(`http://localhost:4400/contactus/${query._id}`);
  // alert("Reply sent"+query._id)
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

  return (
    <div className="queries-container pt-20 bg-white min-h-screen px-4">
      <h1 className="text-4xl font-extrabold text-[#5491CA] text-center mb-6">User Queries</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by email..."
          className="border border-[#5491CA] rounded px-4 py-2 w-full max-w-md"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
        />
      </div>
      <h2 className="text-2xl font-bold text-green-600 mb-2">Replied</h2>
      <div className="overflow-x-auto mb-8">
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
              {replied.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4">No replied queries found.</td></tr>
              ) : replied.map((query, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{query.name}</td>
                  <td className="px-4 py-2">{query.contactEmail}</td>
                  <td className="px-4 py-2">{query.phoneNumber}</td>
                  <td className="px-4 py-2">{query.issueRelated}</td>
                  <td className="px-4 py-2">{query.message}</td>
                  <td className="px-4 py-2 space-y-2">
                    {/* <button 
                      onClick={() => handleDelete(query._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors block w-full"
                    >
                      Delete
                    </button> */}
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
      </div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Not Replied</h2>
      <div className="overflow-x-auto">
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
              {notReplied.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4">No unreplied queries found.</td></tr>
              ) : notReplied.map((query, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{query.name}</td>
                  <td className="px-4 py-2">{query.contactEmail}</td>
                  <td className="px-4 py-2">{query.phoneNumber}</td>
                  <td className="px-4 py-2">{query.issueRelated}</td>
                  <td className="px-4 py-2">{query.message}</td>
                  <td className="px-4 py-2 space-y-2">
                    {/* <button 
                      onClick={() => handleDelete(query._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors block w-full"
                    >
                      Delete
                    </button> */}
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
      </div>
    </div>
  );
};

export default Queries;
