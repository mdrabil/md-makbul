import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google'; // Uncomment if using Google login
import 'bootstrap/dist/css/bootstrap.min.css';
import host from './host';
const Sign = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${host}/signup`, { name, email, password });
      
      if (response.status === 200) { // Check for successful response
        toast.success("User successfully created", { position: "bottom-center" });
        navigate('/post');
      } else {
        toast.error(response.data.msg || "Error occurred", { position: "bottom-center" });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error("Error creating user", { position: "bottom-center" });
    }
  };

  // Uncomment and implement these functions if using Google login
  // const handleGoogleSuccess = (response) => {
  //   console.log('Google login success:', response);
  // };

  // const handleGoogleFailure = (response) => {
  //   console.error('Google login failure:', response);
  // };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card p-4 shadow-sm">
              <h1 className="text-center mb-4">Sign Up</h1>
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Sign Up Now</button>
              </form>
              
              {/* Uncomment the Google Login section if integrating Google login */}
              {/* <div className="d-flex justify-content-center my-3">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onFailure={handleGoogleFailure}
                  logo_style={{ marginRight: '8px' }} // Adjust Google button style if needed
                />
              </div> */}

              <div className="text-center mt-3">
                <Link to="/post" className="text-decoration-none">
                  <h6>Already a user? Sign In</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sign;
