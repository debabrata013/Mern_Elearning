import React, { useState, useEffect } from "react";
import axiosInstance from '@/api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const DoubtsPage = () => {
  const [doubts, setDoubts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { courseId } = useParams();

  // Fetch all doubts when the component mounts
  useEffect(() => {
    fetchDoubts();
  }, [courseId]);

  const fetchDoubts = async () => {
    try {
      const response = await axiosInstance.get(`/api/doubts/course/${courseId}`);
      setDoubts(response.data);
    } catch (error) {
      console.error('Error fetching doubts:', error);
    }
  };

  const createDoubt = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/doubts", {
        courseId,
        askedBy: user._id,
        title,
        description,
      });
      // Refresh the list after creating a new doubt
      fetchDoubts();
      // Clear form inputs and close modal
      setTitle('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating doubt:', error);
    }
  };

  // Redirect to doubt detail page on card click
  const handleCardClick = (doubtId) => {
    navigate(`/doubt/${doubtId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with the create button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doubts</h1>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Doubt
        </button>
      </div>

      {/* Modal for creating a new doubt */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Doubt</h2>
            <form onSubmit={createDoubt}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 rounded bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Displaying fetched doubts in cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doubts.map((doubt) => (
          <div
            key={doubt._id}
            className="cursor-pointer p-4 border rounded shadow hover:shadow-lg transition duration-200"
            onClick={() => handleCardClick(doubt._id)}
          >
            <div className="flex items-center mb-2">
              <img
                src={doubt.askedBy.profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="font-bold">{doubt.askedBy.userName}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(doubt.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{doubt.title}</h3>
            <p className="text-gray-600">
              {doubt.description.length > 100
                ? doubt.description.substring(0, 100) + '...'
                : doubt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoubtsPage;
