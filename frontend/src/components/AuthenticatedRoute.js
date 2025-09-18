import React from 'react';
import { Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

/**
 * A component that restricts access to routes based on authentication only,
 * not based on specific user roles.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @returns {React.ReactNode} - The protected route
 */
const AuthenticatedRoute = ({ children }) => {
  const token = localStorage.getItem('Token');
  
  // If no token exists, show 404 page
  if (!token) {
    return <ErrorPage />;
  }

  // If user is authenticated, render the route
  return children;
};

export default AuthenticatedRoute;