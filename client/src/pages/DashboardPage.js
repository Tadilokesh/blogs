import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BlogList from '../components/Blog/BlogList';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="page-container">
      <h1>Welcome, {user?.email}</h1>
      <h2>Your Blog Posts</h2>
      <BlogList showOnlyUserPosts={true} />
    </div>
  );
};

export default DashboardPage;