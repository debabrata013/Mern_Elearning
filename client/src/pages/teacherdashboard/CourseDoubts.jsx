import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseDoubts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resolved, setResolved] = useState([]);
  const [unresolved, setUnresolved] = useState([]);

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axios.get(`http://localhost:4400/api/doubts/course/${id}`);
        const allDoubts = res.data;

        const resolvedDoubts = allDoubts.filter(d => d.isResolved);
        const unresolvedDoubts = allDoubts.filter(d => !d.isResolved);

        setResolved(resolvedDoubts);
        setUnresolved(unresolvedDoubts);
      } catch (err) {
        console.error("Error fetching doubts:", err);
      }
    };

    fetchDoubts();
  }, [id]);

  const handleCardClick = (doubtId) => {
    navigate(`/doubts/${doubtId}/chat`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">📚 Doubts for this Course</h1>

      {/* ❌ Unresolved Doubts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">❌ Unresolved Doubts</h2>
        {unresolved.length > 0 ? (
          <div className="space-y-5">
            {unresolved.map((doubt, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(doubt._id)}
                className="bg-white border-l-4 border-red-500 shadow-md rounded-xl p-5 transition-transform hover:scale-[1.01]"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-red-600">
                    ❓ {doubt.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(doubt.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800 mb-3">{doubt.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>👤 {doubt.askedBy?.userName || "Unknown"}</span>
                    <span>👍 {doubt.upvotes}</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-200 text-red-800">
                    Unresolved
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No unresolved doubts.</p>
        )}
      </section>

      {/* ✅ Resolved Doubts */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
          ✅ Resolved Doubts
          <span className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded">
            {resolved.length}
          </span>
        </h2>

        {resolved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolved.map((doubt, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(doubt._id)}
                className="bg-white cursor-pointer border border-green-300 hover:border-green-500 p-5 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.01]"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-green-700">
                    {doubt.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(doubt.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{doubt.description}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>👤 {doubt.askedBy?.userName || "Unknown"}</span>
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Resolved
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No resolved doubts.</p>
        )}
      </section>
    </div>
  );
};

export default CourseDoubts;
