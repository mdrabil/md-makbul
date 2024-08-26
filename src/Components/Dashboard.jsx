import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import host from './host';

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' }); // Dummy user data
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${host}/deleteblog/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleAddPost = () => {
    navigate('/post'); // Navigate to add post page
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
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
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded"
            >
              <i class="ri-arrow-left-line"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
 
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddPost}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm"
            >
              Add Post
            </button>
            {/* <button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto mt-24 px-4">
        {/* Display Total Number of Posts */}
        <div className="mb-6">
          <h2 className="text-xl font-medium">Total Posts: {posts.length}</h2>
        </div>

        {/* Table of Posts */}
        <div className="overflow-x-auto">
          <table className={`min-w-full bg-white border border-gray-300 text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <thead>
              <tr>
                <th className="py-2 px-3 border-b-2 border-gray-300">#</th>
                <th className="py-2 px-3 border-b-2 border-gray-300">Post Name</th>
                <th className="py-2 px-3 border-b-2 border-gray-300">Written by</th>
                <th className="py-2 px-3 border-b-2 border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item, index) => (
                <tr key={item._id} className={`hover:bg-gray-100 transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <td className="py-2 px-3 border-b">{index + 1}</td>
                  <td className="py-2 px-3 border-b">{item.post}</td>
                  <td className="py-2 px-3 border-b">{item.username}</td>
                  <td className="py-2 px-3 border-b flex space-x-2">
                    <button
                      onClick={() => handleEditPost(item._id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(item._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
