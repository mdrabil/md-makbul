import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { FaThumbsUp, FaThumbsDown, FaComment } from '';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import DisplayPost from './DisplayPost'; // Import the DisplayPost component
import { host } from './host';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [dislikedPosts, setDislikedPosts] = useState({});
  const [showComments, setShowComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${host}/readblog`);
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (likedPosts[postId]) return;

    try {
      await axios.post(`${host}/${postId}/like`);
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes + 1,
              dislikes: dislikedPosts[postId] ? post.dislikes - 1 : post.dislikes,
            }
          : post
      );
      setPosts(updatedPosts);
      setLikedPosts((prev) => ({ ...prev, [postId]: true }));
      setDislikedPosts((prev) => ({ ...prev, [postId]: false }));
    } catch (err) {
      setError('Failed to like post');
    }
  };

  const handleDislike = async (postId) => {
    if (dislikedPosts[postId]) return;

    try {
      await axios.post(`${host}/${postId}/dislike`);
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              dislikes: post.dislikes + 1,
              likes: likedPosts[postId] ? post.likes - 1 : post.likes,
            }
          : post
      );
      setPosts(updatedPosts);
      setDislikedPosts((prev) => ({ ...prev, [postId]: true }));
      setLikedPosts((prev) => ({ ...prev, [postId]: false }));
    } catch (err) {
      setError('Failed to dislike post');
    }
  };

  const handleCommentsClick = async (postId) => {
    if (showComments[postId]) {
      setShowComments((prev) => ({ ...prev, [postId]: false }));
    } else {
      try {
        const response = await axios.get(`${host}/${postId}/comment`);
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, comments: response.data } : post
        );
        setPosts(updatedPosts);
        setShowComments((prev) => ({ ...prev, [postId]: true }));
      } catch (err) {
        setError('Failed to fetch comments');
      }
    }
  };

  const handleCommentChange = (postId, event) => {
    setCommentInput((prev) => ({
      ...prev,
      [postId]: event.target.value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const content = commentInput[postId] || '';
    if (!content.trim()) return;

    try {
      await axios.post(`${host}/${postId}/comment`, {
        content,
        author: new Date().toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }), // Replace with actual author if available
      });

      setCommentInput((prev) => ({ ...prev, [postId]: '' }));

      const response = await axios.get(`${host}/${postId}/comment`);
      const updatedPosts = posts.map((post) =>
        post._id === postId ? { ...post, comments: response.data } : post
      );
      setPosts(updatedPosts);
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  if (loading) return <div className="text-center text-lg text-blue-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="blog py-12 mt-5">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif text-center mb-10 text-indigo-600">- BLOGS -</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((item) => (
            <div
              className="bg-gray-100 shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-gray-300"
              key={item._id}
            >
              <div className="blog-post mb-4">
                <h2 className="text-2xl font-semibold mb-2 text-indigo-800">
                  <DisplayPost postContent={item.post} /> {/* Use DisplayPost for formatted content */}
                </h2>
                <h4 className="text-gray-600 mb-2 float-right">{item.username}</h4>
              </div>
              <div className="flex justify-around items-center">
                <button
                  onClick={() => handleLike(item._id)}
                  className={`flex items-center space-x-2 ${likedPosts[item._id] ? 'text-blue-600' : 'text-gray-600'}`}
                >
                  {/* <FaThumbsUp /> */}
                  <i class="ri-thumb-up-line"></i>
                  <span>{item.likes}</span>
                </button>
                <button
                  onClick={() => handleDislike(item._id)}
                  className={`flex items-center space-x-2 ${dislikedPosts[item._id] ? 'text-red-600' : 'text-gray-600'}`}
                >
                  {/* <FaThumbsDown /> */}
                  <i class="ri-thumb-down-line"></i>
                  <span>{item.dislikes}</span>
                </button>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleCommentsClick(item._id)}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    {/* <FaComment /> */}
                    <i class="ri-chat-1-fill"></i>
                    <span className="text-gray-500 text-sm">{item.comments ? item.comments.length : item.commentsCount || 0}</span>
                  </button>
                </div>
              </div>
              {showComments[item._id] && (
                <div className="mt-4">
                  <div className={`scrollable-comments ${item.comments?.length > 4 ? 'max-h-40 overflow-y-scroll' : ''}`}>
                    {item.comments?.length > 0 ? (
                      item.comments.map((comment) => (
                        <div key={comment._id} className="border-t pt-2 mt-2">
                          <p className="text-gray-700">{comment.content}</p>
                          <p className="text-gray-500 text-sm">— {comment.author}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No comments yet.</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <textarea
                      value={commentInput[item._id] || ''}
                      onChange={(e) => handleCommentChange(item._id, e)}
                      rows="3"
                      className="w-full border p-2 border-blue-300 rounded"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleCommentSubmit(item._id)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
