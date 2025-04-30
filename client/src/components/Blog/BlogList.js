import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
import Card from '../UI/Card';
import Pagination from '../UI/Pagination';
import '../../styles/blog.css';

const BlogList = ({ showOnlyUserPosts = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const authorId = showOnlyUserPosts ? user?.id || user?._id : null;
        const data = await getBlogs(currentPage, 10, authorId);
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, showOnlyUserPosts, user?.id, user?._id]);

  // Handle delete functionality
  const handleDelete = async (deletedId) => {
    try {
      await deleteBlog(deletedId); // Make API call to delete the blog
      setBlogs(blogs.filter(blog => blog._id !== deletedId)); // Update state to remove the blog
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="blog-list">
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <>
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <Card key={blog._id}>
                <Link to={`/blog/${blog._id}`}>
                  <h3>{blog.title}</h3>
                  <p className="author">By {blog.author?.email}</p>
                  <p className="date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="content-preview">
                    {blog.content.substring(0, 100)}...
                  </p>
                </Link>
                {/* Only show delete button if the logged-in user is the author */}
                {user?._id === blog.author?._id && (
                  <button onClick={() => handleDelete(blog._id)} className="delete-button">
                    Delete
                  </button>
                )}
              </Card>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BlogList;
