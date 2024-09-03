import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import { host } from './host';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null); // null, 'contact', 'about', 'sign', or 'forgotPassword'
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [forgotEmail, setForgotEmail] = useState(''); // State for forgot password email

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/forget-password`, { email: forgotEmail });
      if (response.status === 200) {
        alert('Password reset link has been sent to your email.');
        setShowPopup(null); // Close the popup after success
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/signup`, formData);
      if (response.status === 200 || response.status === 201) {
        // Assuming the user is successfully created
        setShowPopup(null);
        setError(null); 
        navigate('/dashboard'); // Navigate to the dashboard
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const openPopup = (type) => {
    setShowPopup(type);
    setMenuOpen(false); // Close menu when opening a popup
  };

  const closePopup = () => {
    setShowPopup(null);
    setError(null); // Reset error state when closing popup
  };

  const gotopage = () => {
    navigate('/forgot-password');
    setShowPopup(null); // Close menu when opening a popup
  };

  return (
    <header className="">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>
            DEEN KI <span>baatein</span>
            <hr />
          </h2>
        </Link>
      </div>
      <div className="block">
        <i
          className={`ri-menu-fill text-white ${menuOpen ? 'ri-close-fill' : 'ri-menu-fill'}`}
     
          onClick={toggleMenu}
        ></i>
      </div>
      <nav className={`nav-menu ${menuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500 ease-in-out z-10`}>
        <div className="">
          <button 
            className="absolute  right-1 font-bolder text-black text-2xl"
            onClick={() => {
              setMenuOpen(false);
              closePopup();
            }}
          >
            <i className="ri-close-line"></i>
          </button>
          <div className="">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button onClick={() => handleLinkClick('/')} className="">
                  <h5 className="">HOME</h5>
                  <hr />
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => openPopup('about')} className="">
                  <h5>ABOUT</h5>
                
                  <hr />
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => openPopup('contact')} className="">
                  <h5>CONTACT US</h5>
                  <hr />
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => openPopup('sign')} className="">
                  <h5>MD.MAQBUL</h5>
                  <hr />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Popups */}
      {showPopup === 'about' && (
        <div className="fixed inset-0  flex items-center justify-center z-30" onClick={closePopup}>
          <div className="bg-white m-2 text-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-lg mb-6">DEEN KI BAATEIN is a platform that connects people with inspiring stories and meaningful conversations. We aim to provide a space where voices are heard and ideas flourish.</p>
            <button onClick={closePopup} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">Close</button>
          </div>
        </div>
      )}

      {showPopup === 'contact' && (
        <div className="fixed inset-0  flex items-center justify-center z-30">
          <div className="bg-gray-200 m-2 text-black p-6 rounded-lg shadow-lg max-w-lg w-30">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">We’d love to hear from you! Feel free to reach out to us with any questions or inquiries.</p>
           <div>
            <button className='w-full'>
           <a href="mailto:info@deenkibaatein.com" className="bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors" style={{widows:'100%'}}>Email Us</a>

            </button>
           <button onClick={closePopup} className="bg-red-500 text-white py-2 px-4 w-full rounded-lg hover:bg-red-600 transition-colors mt-4">Close</button>
           </div>
          </div>
        </div>
      )}

      {showPopup === 'sign' && (
        <div className="fixed inset-0 bg-white bg-opacity- flex items-center justify-center z-30" onClick={closePopup}>
          <div className="bg-white m-2 text-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-center">MR.MAQBUL</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors w-full"
              >
                Sign Up
              </button>
            </form>
            <button onClick={closePopup} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors mt-4 w-full">Close</button>
          </div>
        </div>
      )}

      {showPopup === 'forgotPassword' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={closePopup}>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleForgetPassword}>
              <div className="mb-4">
                <label htmlFor="forgotEmail" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="forgotEmail"
                  value={forgotEmail}
                  required
              
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full"
              >
                Send Reset Link
              </button>
            </form>
            <button onClick={closePopup} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors mt-4 w-full">Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
