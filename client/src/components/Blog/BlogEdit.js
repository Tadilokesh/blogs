import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog, updateBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/blog.css';

const BlogEdit = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id);
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog');
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, { title, content }, token);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="blog-form-container">
      <h2>Edit Blog</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Update</button>
          <button 
            type="button" 
            onClick={() => navigate(`/blog/${id}`)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEdit;
