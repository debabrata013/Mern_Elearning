import React, { useState, useEffect, useRef } from "react";
import axiosInstance from '@/api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const DiscussionPage = () => {
  const { doubtId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [doubt, setDoubt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch messages and doubt details when component mounts or doubtId changes
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchMessages(), fetchDoubtDetails()])
      .finally(() => setIsLoading(false));
  }, [doubtId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // GET all messages for the doubt
  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/api/messages/${doubtId}`);
      setMessages(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  // GET doubt details
  const fetchDoubtDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/doubts/${doubtId}`);
      setDoubt(response.data);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching doubt details:", error);
      return null;
    }
  };

  // Handle doubt resolution
  const handleResolveDoubt = async () => {
    try {
      await axiosInstance.put(`/api/doubts/${doubtId}/resolve`);
      fetchDoubtDetails();
    } catch (error) {
      console.error("Error resolving doubt:", error);
    }
  };

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle key press for enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // Send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;
    
    setIsSending(true);
    try {
      const payload = {
        doubtId,
        sender: user._id,
        message: newMessage,
      };
      await axiosInstance.post(`/api/messages`, payload);
      setNewMessage('');
      await fetchMessages();
      // Focus back on input after sending
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if message is from current user
  const isCurrentUser = (senderId) => {
    return senderId === user._id;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 flex flex-col h-screen bg-gray-50">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white shadow-sm py-4 px-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={handleGoBack} 
            className="mr-3 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Discussion</h1>
            {doubt && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                {doubt.title || "Loading discussion..."}
              </p>
            )}
          </div>
        </div>
        {doubt && doubt.askedBy && doubt.askedBy._id === user._id && !doubt.isResolved && (
          <button
            onClick={handleResolveDoubt}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 text-sm sm:px-4 sm:py-2 rounded-lg shadow transition-all duration-200 flex items-center"
          >
            <span className="hidden sm:inline mr-1">Mark as</span> Resolved
          </button>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto py-4 px-2 sm:px-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`flex ${isCurrentUser(msg.sender._id) ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg px-4 py-2 shadow ${
                  isCurrentUser(msg.sender._id) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-800 border'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-medium text-sm ${isCurrentUser(msg.sender._id) ? 'text-blue-100' : 'text-gray-700'}`}>
                    {msg.sender.userName}
                  </span>
                  <span className={`text-xs ml-2 ${isCurrentUser(msg.sender._id) ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTimestamp(msg.createdAt)}
                  </span>
                </div>
                <p className="text-sm sm:text-base break-words">{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Improved Chat Input */}
      {doubt && !doubt.isResolved && (
        <div className="sticky bottom-0 border-t bg-white p-4 shadow-lg">
          <form onSubmit={sendMessage} className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base min-w-64 max-w-2xl"
              required
              disabled={isSending}
            />
            <button
              type="submit"
              className={ `bg-blue-500 max-w-32 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow transition-all duration-200 font-medium ${
                isSending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isSending}
            >
              {isSending ? (
                <span className="">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Send
                </span>
              ) : (
                <span className="flex items-center">
                  Send
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiscussionPage;