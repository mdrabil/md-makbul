import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {host} from './host';
const UpdatePost = () => {
  const { id } = useParams(); // Get the post ID from URL params
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [post, setPost] = useState('');

  // Fetch the post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${host}/getone/${id}`);
        if (response.data) {
          setUsername(response.data.username);
          setPost(response.data.post);
        } else {
          toast.error("Post not found", { position: 'bottom-center' });
          navigate('/blog'); // Redirect if post is not found
        }
      } catch (error) {
        toast.error("Error fetching post data", { position: 'bottom-center' });
      }
    };

    fetchPost();
  }, [id, navigate]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${host}/updateblog/${id}`, { post, username });
      if (response.data) {
        toast.success("Post has been updated", { position: 'bottom-center' });
        navigate('/blog');
      } else {
        toast.error(response.data.msg || "Error occurred", { position: 'bottom-center' });
      }
    } catch (error) {
      toast.error("Error updating post", { position: 'bottom-center' });
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4 shadow-sm">
              <h1 className="text-center mb-4">Update Post</h1>
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username or Email <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="written by"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="post" className="form-label">Post Content <span className="text-danger">*</span></label>
                  <textarea
                    id="post"
                    className="form-control"
                    rows="6"
                    placeholder="Write your post here..."
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    minLength="20"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Update Post</button>
              </form>

              <div className="text-center mt-3">
                <Link to="/sign" className="text-decoration-none">
                  <h6>New user? Sign Up</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePost;
