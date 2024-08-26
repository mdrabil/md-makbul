import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap-mx-4">
          {/* Related Section */}
          <div className="w-full md:w-1/3 px-4 mb-6">
            <h2 className="text-xl font-bold mb-4">Related</h2>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/imosnal" className="text-gray-400 hover:text-white">
                  Imosnal
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sad" className="text-gray-400 hover:text-white">
                  Sad
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/attitude" className="text-gray-400 hover:text-white">
                  Attitude
                </Link>
              </li>
            </ul>
          </div>
          {/* Member Section */}
          <div className="w-full md:w-1/3 px-4 mb-">
            <h2 className="text-xl font-bold mb-4">Member</h2>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/md-rebel" className="text-gray-400 hover:text-white">
                  MD Rebel
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sayer-no-2" className="text-gray-400 hover:text-white">
                  Sayer No 2
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sayer-no-3" className="text-gray-400 hover:text-white">
                  Sayer No 3
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Us Section */}
          <div className="w-full md:w-1/3 px-4 mb-6">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">India</p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-youtube-fill text-2xl"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-instagram-fill text-2xl"></i>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-twitter-fill text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 py-4">
          <p className="text-sm">© 2024 DEEN KI BAATEIN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
