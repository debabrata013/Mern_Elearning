import React, { useState, useEffect } from "react";
import axiosInstance from '@/api/axiosInstance';
import { useParams } from 'react-router-dom';

const DiscussionPage = () => {
  const { doubtId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [doubt, setDoubt] = useState(null);

  // Fetch messages and doubt details when component mounts or doubtId changes
  useEffect(() => {
    fetchMessages();
    fetchDoubtDetails();
  }, [doubtId]);

  // GET all messages for the doubt
  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/api/messages/${doubtId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // GET doubt details (for example, to check if current user is the one who asked it)
  const fetchDoubtDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/doubts/${doubtId}`);
      setDoubt(response.data);
    } catch (error) {
      console.error("Error fetching doubt details:", error);
    }
  };

  // Send a new message. The payload structure is as required:
  // {
  //    "doubtId": "67f64a8edcc2257e57fffe26",
  //    "sender": "67e03eb3e43463d77d212662",
  //    "message": "hello Dosto kese hget "
  // }
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        doubtId,
        sender: user._id, // this should match the backend expected sender field
        message: newMessage,
      };
      await axiosInstance.post(`/api/messages`, payload);
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Discussion</h1>
        {/* If the logged-in user is the one who asked the doubt and it’s not resolved,
            you can render a "Resolve" button here (optional as per your requirements) */}
        {doubt && doubt.askedBy._id === user._id && !doubt.isResolved && (
          <button
            onClick={async () => {
              try {
                await axiosInstance.put(`/api/doubts/${doubtId}/resolve`);
                fetchDoubtDetails();
              } catch (error) {
                console.error("Error resolving doubt:", error);
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          >
            Resolve
          </button>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto mb-4 border p-4 rounded space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <div className="flex items-center">
              <span className="font-semibold mr-2">{msg.sender.userName}</span>
              <span className="text-gray-500 text-xs">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <p className="ml-4">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={sendMessage} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 p-2 rounded mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default DiscussionPage;
