import React from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const userDetails = cookie.get("userDetails");
  let userName = "";
  if (userDetails) {
    try {
      userName = JSON.parse(userDetails).username || "";
    } catch {
      userName = "";
    }
  }

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("userDetails");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>OralVis-HealthCare</h1>
      </div>
      <div className="header-right">
        {userName && <span className="username">Hi, {userName}</span>}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
