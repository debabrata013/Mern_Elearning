import React, { useState } from 'react';
import { Bell, Link as LinkIcon, Check, X, ChevronRight, Info } from 'lucide-react';

// Card Components
const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = '', children }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className = '', children }) => (
  <h2 className={`text-3xl font-bold tracking-tight text-gray-900 ${className}`}>
    {children}
  </h2>
);

const CardDescription = ({ className = '', children }) => (
  <p className={`text-lg text-gray-600 mt-2 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ className = '', children }) => (
  <div className={`p-8 pt-0 ${className}`}>
    {children}
  </div>
);

// Button Component with enhanced hover effects
const Button = ({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105',
    outline: 'border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-300 text-gray-900',
    ghost: 'hover:bg-gray-100 text-gray-900 hover:scale-105',
  };
  
  const sizes = {
    default: 'h-11 py-2 px-4',
    sm: 'h-9 px-3 text-sm',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Badge Component
const Badge = ({ variant = 'default', className = '', children }) => {
  const variants = {
    default: 'bg-gray-900 text-white',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors duration-200',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ScrollArea Component
const ScrollArea = ({ className = '', children }) => (
  <div className={`overflow-auto custom-scrollbar ${className}`}>
    <style jsx global>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #666;
      }
    `}</style>
    {children}
  </div>
);

const NotificationContent = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Parent-Teacher Conference Schedule",
      description: "The annual parent-teacher conferences are scheduled for next week. Please review the assigned time slots and prepare accordingly. Click the link below to access the schedule.",
      notificationType: "link",
      link: "https://example.com/schedule",
      targetAudience: ["teacher"],
      createdAt: "2025-01-22T09:00:00",
      read: false,
    },
    {
      id: 2,
      title: "Professional Development Day",
      description: "Reminder: This Friday is our professional development day. We will be focusing on new teaching methodologies and classroom management techniques.",
      notificationType: "text",
      targetAudience: ["teacher"],
      createdAt: "2025-01-21T14:30:00",
      read: true,
    }
  ]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-bn w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Announcements</CardTitle>
        </div>
        <CardDescription>
          View the latest announcements from the admin below.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Info className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No new announcements</p>
              <p className="text-sm text-gray-400">Check back later for updates</p>
            </div>
          ) : (
            <div className="space-y-6 mt-6">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`relative transition-all duration-200 hover:transform hover:translate-x-1  mt-2${
                    notification.read ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {notification.notificationType === 'link' ? (
                          <LinkIcon className="h-6 w-6 mt-1 text-blue-500" />
                        ) : (
                          <Info className="h-6 w-6 mt-1 text-gray-500" />
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Posted on {formatDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkRead(notification.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-5 w-5" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDismiss(notification.id)}
                          className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 text-lg mt-3 line-clamp-3 leading-relaxed">
                      {notification.description}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <Badge variant="secondary" className="text-blue-600 bg-blue-50 hover:bg-blue-100">
                        Teacher
                      </Badge>
                      
                      {notification.notificationType === 'link' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:border-blue-300"
                          onClick={() => window.open(notification.link, '_blank')}
                        >
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationContent;