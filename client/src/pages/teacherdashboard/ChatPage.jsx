import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatPage = () => {
  const { doubtId } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const user= localStorage.getItem("user");
  const userData = JSON.parse(user);

  // Fetch doubt details and messages
  useEffect(() => {
    const fetchDoubtDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:4400/api/doubts/${doubtId}`);
        setDoubt(res.data.doubt || res.data);
        setMessages(res.data.doubt?.messages || res.data.messages || []);
      } catch (err) {
        console.error("Error fetching doubt:", err);
        setError("Failed to load the conversation. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoubtDetails();
  }, [doubtId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending a new message
  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    // Optimistically add message to UI
    const tempMessage = {
      id: `temp-${Date.now()}`,
      text: newMessage,
      sender: "student",
      timestamp: new Date().toISOString(),
      pending: true
    };
    
    setMessages(prev => [...prev, tempMessage]);
    setNewMessage("");
    setIsSending(true);

    try {
      const res = await axios.post(`http://localhost:4400/api/messages/${doubtId}`, {
        message: newMessage,
        sender: userData._id,
        doubt: doubtId

      });
      
      // Replace temp message with real one from server
      setMessages(prev => 
        prev.filter(msg => msg.id !== tempMessage.id).concat(res.data)
      );
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      
      // Remove the pending message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for message groups
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = [];
    let currentDate = null;
    
    messages.forEach(message => {
      const messageDate = new Date(message.timestamp || message.createdAt).toDateString();
      
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groups.push({
          date: message.timestamp || message.createdAt,
          messages: [message]
        });
      } else {
        groups[groups.length - 1].messages.push(message);
      }
    });
    
    return groups;
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="mt-8 text-gray-500">Loading conversation...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !doubt) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-96">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Failed to load conversation</p>
          <p className="text-sm mt-1">Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 flex flex-col h-screen max-h-screen">
      {doubt && (
        <>
          {/* Doubt details header */}
          <div className="mb-4 border-b pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{doubt.title}</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">{doubt.description}</p>
              <div className="text-xs md:text-sm text-gray-500 mt-2">
                Asked by: <span className="font-medium">{doubt.askedBy?.userName || "Unknown"}</span>
                {doubt.createdAt && (
                  <span className="ml-2">
                    • {new Date(doubt.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {doubt.subject || "General"}
              </span>
            </div>
          </div>

          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            className="bg-gray-50 p-4 rounded-lg shadow-inner mb-4 flex-grow overflow-y-auto flex flex-col space-y-6"
          >
            {messageGroups.length > 0 ? (
              messageGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                      {formatDate(group.date)}
                    </div>
                  </div>
                  
                  {group.messages.map((msg, msgIndex) => (
                    <div
                      key={`${groupIndex}-${msgIndex}`}
                      className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                          msg.sender === "student" 
                            ? "bg-green-600 text-white rounded-br-none" 
                            : "bg-white border border-gray-200 rounded-bl-none"
                        } ${msg.pending ? "opacity-70" : ""}`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.text || msg.message}</p>
                        <div className="flex justify-end items-center mt-1 gap-1">
                          <span className={`text-xs ${msg.sender === "student" ? "text-green-100" : "text-gray-400"}`}>
                            {formatTime(msg.timestamp || msg.createdAt)}
                          </span>
                          {msg.pending && (
                            <svg className="animate-spin h-3 w-3 text-green-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2 sticky bottom-0 bg-white p-2 rounded-lg shadow-md border border-gray-200">
            <textarea
              ref={inputRef}
              rows="1"
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[44px] max-h-32"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isSending}
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || isSending}
              className={`shrink-0 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center w-16 h-[44px] ${
                !newMessage.trim() || isSending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSending ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          {/* Error toast */}
          {error && (
            <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      onClick={() => setError(null)}
                      className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <span className="sr-only">Dismiss</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatPage;