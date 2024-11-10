// ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Function to check if the auth cookie is still present
    const checkAuthCookie = () => {
      const hasAuthCookie = document.cookie.includes("token"); // Replace with your actual cookie name
      if (!hasAuthCookie) {
        // Clear local storage and redirect to login if cookie is missing
        localStorage.removeItem("user");
        navigate("/");
      }
    };

    checkAuthCookie(); // Run check on component mount
  }, [navigate]);

  return children; // Render the child components (e.g., dashboard) if the cookie exists
};

export default ProtectedRoute;
