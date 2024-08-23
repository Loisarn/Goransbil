import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li>
            <Link to="/about">Om Oss</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
          <li>
            <a
              href="https://www.facebook.com/search/top?q=görans%20bil%20o%20gräv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
          </li>
        </ul>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Göransbilar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
