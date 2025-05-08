import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaSignInAlt, FaHome } from "react-icons/fa";
import "../styles/pages/LogoutSuccess.css";

const LogoutSuccess = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="logout-success-container">
      <div className="logout-success-card">
        <div className="logout-success-icon">
          <FaCheckCircle />
        </div>
        <h1>Logout Successful</h1>
        <p>You have been successfully logged out of your account.</p>
        <p className="logout-success-note">
          Thank you for shopping with FusionBuy!
        </p>

        <div className="logout-success-actions">
          <Link to="/login" className="logout-login-btn">
            <FaSignInAlt /> Log In Again
          </Link>
          <Link to="/" className="logout-home-btn">
            <FaHome /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutSuccess;
