import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Keshvika-logo1.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img className="logo" src={Logo} alt="Logo" />
        <p className="tagline">Flow with Elegance.</p>
      </div>

      <div className="footer-links">
        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Resources</h4>
          <Link to="/documentation">Documentation</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/support">Support</Link>
        </div>

        <div>
          <h4>Connect</h4>
          <a 
            href="https://www.instagram.com/keshvika57/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a 
            href="https://www.linkedin.com/in/linkedin_profile" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            href="https://www.youtube.com/@Keshvika_57/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Keshvika. All rights reserved.</p>
        <div className="policy-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

