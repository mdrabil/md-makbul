import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { host } from './host';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/readblog`);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditPost = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${host}/deleteblog/${postToDelete}`);
      setPosts(posts.filter((post) => post._id !== postToDelete));
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const handleAddPost = () => {
    navigate('/post');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={`text-center text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center text-lg ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} pb-16`}>
      {/* Fixed Header */}
      <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleAddPost}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Add Post
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto mt-24 px-4">
        {/* Display Total Number of Posts */}
        <div className="mb-4">
          <h2 className="text-xl font-medium">Total Posts: {posts.length}</h2>
        </div>

        {/* List of Posts */}
        <div className="space-y-6">
          {posts.map((item, index) => (
            <div
              key={item._id}
              className={`p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="mb-2">
                <h3 className="text-lg font-semibold">#{index + 1}: {item.post}</h3>
                <p className="text-sm text-gray-500">Written by: {item.username}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleEditPost(item._id)}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
