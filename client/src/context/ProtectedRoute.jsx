import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    // Redirect to their respective dashboard if they try to access another dashboard
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin-dashboard" />;
      case "teacher":
        return <Navigate to="/teacher-dashboard" />;
      case "student":
        return <Navigate to="/user-dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;
