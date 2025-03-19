import React, { useEffect, useState } from "react";
import axios from "axios";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="queries-container pt-20 bg-white min-h-screen px-4">
      <h1 className="text-4xl font-extrabold text-[#5491CA] text-center mb-6">
        User Queries
      </h1>

      {loading ? (
        <p className="text-center text-gray-700">Loading queries...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : queries.length === 0 ? (
        <p className="text-center text-gray-500">No queries available.</p>
      ) : (
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
              {queries.map((query, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{query.name}</td>
                  <td className="px-4 py-2">{query.contactEmail}</td>
                  <td className="px-4 py-2">{query.phoneNumber}</td>
                  <td className="px-4 py-2">{query.issueRelated}</td>
                  <td className="px-4 py-2">{query.message}</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleDelete(query._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Queries;
