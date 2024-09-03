import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // Importing the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Related Section */}
          <div className="footer-section">
            <h2 className="footer-heading">Related</h2>
            <ul className="footer-list">
              <li className="footer-item">
                <Link to="/imosnal" className="footer-link">Imosnal</Link>
              </li>
              <li className="footer-item">
                <Link to="/sad" className="footer-link">Sad</Link>
              </li>
              <li className="footer-item">
                <Link to="/attitude" className="footer-link">Attitude</Link>
              </li>
            </ul>
          </div>

          {/* Member Section */}
          <div className="footer-section">
            <h2 className="footer-heading">Member</h2>
            <ul className="footer-list">
              <li className="footer-item">
                <Link to="/md-rebel" className="footer-link">MD Rebel</Link>
              </li>
              <li className="footer-item">
                <Link to="/sayer-no-2" className="footer-link">Sayer No 2</Link>
              </li>
              <li className="footer-item">
                <Link to="/sayer-no-3" className="footer-link">Sayer No 3</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="footer-section">
            <h2 className="footer-heading">Contact Us</h2>
            <p className="footer-contact">India</p>
            <div className="footer-socials">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="footer-icon youtube">
                <i className="ri-youtube-fill"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon instagram">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon twitter">
                <i className="ri-twitter-fill"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 DEEN KI BAATEIN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
