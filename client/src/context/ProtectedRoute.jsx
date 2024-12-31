import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

//   if (role && !hasRole(role)) {
//     return <Navigate to="/" />; // Redirect to home or unauthorized page
//   }

  return children;
};

export default ProtectedRoute;