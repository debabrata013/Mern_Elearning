import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatPage = () => {
  const { doubtId } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchDoubtDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4400/api/doubts/${doubtId}`);
        setDoubt(res.data);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Error fetching doubt:", err);
      }
    };

    fetchDoubtDetails();
  }, [doubtId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`http://localhost:4400/api/doubts/${doubtId}/message`, {
        text: newMessage,
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {doubt ? (
        <>
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">{doubt.title}</h1>
            <p className="text-gray-600 mt-1">{doubt.description}</p>
            <div className="text-sm text-gray-500 mt-2">
              Asked by: <span className="font-medium">{doubt.askedBy?.userName || "Unknown"}</span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow mb-4 h-80 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-2 rounded-lg max-w-sm ${
                    msg.sender === "student" ? "bg-white self-start" : "bg-green-100 self-end"
                  }`}
                >
                  <p className="text-sm text-gray-800">{msg.text}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages yet.</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading doubt details...</p>
      )}
    </div>
  );
};

export default ChatPage;
