import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
import { deleteBlog } from '../../services/blogService';
import '../../styles/blog.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog');
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id, token);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!blog) return <div className="error-message">{error || 'Blog not found'}</div>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <div className="blog-meta">
        <span>By {blog.author?.email}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="blog-content">
        {blog.content}
      </div>

      {user?.id === blog.author?._id && (
        <div className="blog-actions">
          <button 
            onClick={() => navigate(`/blog/${id}/edit`)}
            className="edit-button"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
