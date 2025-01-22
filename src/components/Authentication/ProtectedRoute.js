import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("loginData"))  // Check if token exists in local storage

  const token = isLoggedIn?.token // Assuming you have a way to get the token

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return element;
};

export default ProtectedRoute;