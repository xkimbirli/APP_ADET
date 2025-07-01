import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="logo">PDFy</div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Home</Link> 
        <Link to="/about2" className="nav-button">About</Link>
        
      </div>
    </header>
  );
};

export default NavBar;
