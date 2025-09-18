import React from "react";
import { Navigate } from "react-router-dom";

/**
 * A component that restricts access to routes based on user role.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render if authorized
 * @param {string[]} props.allowedRoles - Array of user roles allowed to access this route
 * @returns {React.ReactNode} - The protected route
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("Token");
  const userType = localStorage.getItem("userType");

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user's role is not in the allowed roles, redirect to appropriate page
  if (!allowedRoles.includes(userType)) {
    // Redirect Sellers to SellerDashboard, Buyers to Home
    return userType === "Seller" ? (
      <Navigate to="/sellerdashboard" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  // If user is authenticated and authorized, render the route
  return children;
};

export default ProtectedRoute;
