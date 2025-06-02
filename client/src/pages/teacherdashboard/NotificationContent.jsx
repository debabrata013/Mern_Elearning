import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Bell, Link as LinkIcon, X, ChevronRight, Info } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';
import { toast } from "react-hot-toast";

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
  <h2 className={`text-3xl font-bold tracking-tight ${className}`}>
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
    default: 'bg-[#5491CA] text-white hover:bg-[#4a82b5] hover:scale-105',
    outline: 'border border-gray-200 bg-white hover:bg-gray-50 hover:border-[#5491CA] text-[#5491CA]',
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
    default: 'bg-[#5491CA] text-white',
    secondary: 'bg-[#5491CA]/10 text-[#5491CA] hover:bg-[#5491CA]/20 transition-colors duration-200',
    purple: 'bg-[#b1a9f1]/10 text-[#b1a9f1] hover:bg-[#b1a9f1]/20 transition-colors duration-200',
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
        background: #b1a9f1;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #5491CA;
      }
    `}</style>
    {children}
  </div>
);

const NotificationContent = () => {
  const location = useLocation();
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      toast.dismiss(); // Dismiss all toasts on unmount/route change
    };
  }, [location]);

  const user = JSON.parse(localStorage.getItem('user'));

  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(`/announcements/${user._id}`);
        setNotifications(response.data.announcements);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [user._id]);

  const handleDismiss = async (id) => {
    try {
      await axiosInstance.delete(`/announcements/${user._id}/${id}`);
      toast.success("Notification deleted successfully");
      setNotifications(notifications.filter(notif => notif._id !== id));
    } catch (error) {
      console.error("Error dismissing notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden ">
      <CardHeader className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-[#5491CA]/20 to-[#b1a9f1]/20 rounded-lg">
            <Bell className="h-6 w-6 text-[#5491CA]" />
          </div>
          <CardTitle className="bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-transparent bg-clip-text">
            Announcements
          </CardTitle>
        </div>
        <CardDescription>
          View the latest announcements from the admin below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[600px]">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-[#5491CA]/10 flex items-center justify-center">
                <Info className="h-10 w-10 text-[#5491CA]" />
              </div>
              <p className="text-lg font-medium text-[#5491CA]">No new announcements</p>
              <p className="text-sm text-gray-400">Check back later for updates</p>
            </div>
          ) : (
            <div className="space-y-6 mt-6">
              {notifications.map((notification) => (
                <Card 
                  key={notification._id}
                  className={`relative transition-all duration-300 hover:transform hover:translate-x-1 border-l-4 ${
                    notification.read 
                      ? 'border-l-gray-200 bg-gray-50' 
                      : 'border-l-[#5491CA] bg-white shadow-md'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {notification.notificationType === 'link' ? (
                          <div className="h-10 w-10 rounded-full bg-[#5491CA]/10 flex items-center justify-center">
                            <LinkIcon className="h-5 w-5 text-[#5491CA]" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[#b1a9f1]/10 flex items-center justify-center">
                            <Info className="h-5 w-5 text-[#b1a9f1]" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-[#5491CA] mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Posted on {formatDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDismiss(notification._id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 p-0"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 text-lg mt-4 leading-relaxed pl-13 ml-0">
                      {notification.description}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <Badge 
                        variant={notification.notificationType === 'link' ? 'secondary' : 'purple'}
                      >
                        Teacher
                      </Badge>

                      {notification.notificationType === 'link' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2 text-[#5491CA] hover:text-[#4a82b5] hover:border-[#5491CA]"
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
