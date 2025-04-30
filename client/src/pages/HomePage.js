import BlogList from '../components/Blog/BlogList';

const HomePage = () => {
  return (
    <div className="page-container">
      <h1>Latest Blog Posts</h1>
      <BlogList />
    </div>
  );
};

export default HomePage;