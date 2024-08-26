import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import host from './host';
const CommentsPage = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${host}/${postId}/comment`);
        setComments(response.data);
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`${host}/${postId}/comment`, { text: newComment });
      
      // After successfully adding the comment, fetch comments again to update the list.
      const updatedComments = await axios.get(`${host}/${postId}/comment`);
      setComments(updatedComments.data);

      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="comments py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-gray-600 mb-4"
        >
          <FaArrowLeft />
          <span>Back to Blog</span>
        </button>
        <h1 className="text-4xl font-serif text-center mb-10">- Comments -</h1>
        <div className="mb-6">
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300"
            rows="4"
            placeholder="Add your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Comment
          </button>
        </div>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white shadow-lg rounded-lg p-4"
              >
                <h4 className="text-lg font-semibold">{comment.postId}</h4>
                <p className="text-gray-600">{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No comments yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentsPage;
