import React from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'js-cookie';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userDetails = cookie.get('userDetails');
  if (!userDetails) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }
  let role = '';
  try {
    role = JSON.parse(userDetails).role; //converted from string to object to access role.
  } catch {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    // Role not allowed
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
