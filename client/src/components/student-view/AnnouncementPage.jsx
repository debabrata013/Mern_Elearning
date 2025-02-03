import React, { useState, useEffect } from 'react';
import { Bell, BookOpen, Trash2, X, Filter, Search, AlertCircle, Clock, Undo } from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    title: "Welcome to the Course!",
    message: "We are excited to have you on board. Let's start learning!",
    date: "2023-10-01"
  },
  {
    id: 2,
    title: "Assignment Due",
    message: "Don't forget to submit your assignment by the end of this week.",
    date: "2023-10-05"
  },
  {
    id: 3,
    title: "Live Session",
    message: "Join us for a live session on advanced topics this Friday.",
    date: "2023-10-07"
  }
];

const AnnouncementPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [deletedNotifications, setDeletedNotifications] = useState([]);
  const [showUndo, setShowUndo] = useState(false);

  // Filter notifications based on search and type
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Delete notification with undo capability
  const handleDelete = (id) => {
    const deleted = notifications.find(n => n.id === id);
    setDeletedNotifications([...deletedNotifications, deleted]);
    setNotifications(prev => prev.filter(n => n.id !== id));
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 5000);
  };

  // Undo last deletion
  const handleUndo = () => {
    const lastDeleted = deletedNotifications.pop();
    if (lastDeleted) {
      setNotifications(prev => [...prev, lastDeleted]);
      setDeletedNotifications(deletedNotifications);
      setShowUndo(false);
    }
  };

  // Clear all with confirmation
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  // Notification type filter
  const TypeFilter = () => (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setSelectedType('all')}
        className={`px-4 py-2 rounded-full ${selectedType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
      >
        All ({notifications.length})
      </button>
      <button
        onClick={() => setSelectedType('course')}
        className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
          selectedType === 'course' ? 'bg-green-500 text-white' : 'bg-gray-100'
        }`}
      >
        <BookOpen size={16} />
        <span>Courses ({notifications.filter(n => n.type === 'course').length})</span>
      </button>
      <button
        onClick={() => setSelectedType('notification')}
        className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
          selectedType === 'notification' ? 'bg-purple-500 text-white' : 'bg-gray-100'
        }`}
      >
        <Bell size={16} />
        <span>General ({notifications.filter(n => n.type === 'notification').length})</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Announcements Center</h1>
          </div>
          
          <div className="flex space-x-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <TypeFilter />
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-2 bg-red-500/10 text-red-600 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
          >
            <Trash2 size={18} />
            <span>Clear All</span>
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto" />
            <p className="text-gray-600 text-lg">No notifications match your filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="text-blue-500 hover:text-blue-600 flex items-center justify-center space-x-2"
            >
              <Undo size={16} />
              <span>Reset filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start justify-between border border-transparent hover:border-blue-100"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 pt-1">
                    <div className={`p-3 rounded-lg ${
                      notification.type === 'course' 
                        ? 'bg-green-500/10 text-green-600' 
                        : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {notification.type === 'course' ? (
                        <BookOpen className="h-6 w-6" />
                      ) : (
                        <Bell className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <span>{notification.title}</span>
                      <span className="text-sm text-gray-400 font-normal flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {notification.time}
                      </span>
                    </h3>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 ml-4"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Undo Toast */}
        {showUndo && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-fade-in-up">
            <button
              onClick={handleUndo}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Undo Delete
            </button>
            <button onClick={() => setShowUndo(false)}>
              <X className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnouncementPage;