import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/layout.css';

const Header = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">BlogApp</Link>
        <nav>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/create">Create Post</Link>
              <button onClick={() => {
                logout();
                navigate('/');
              }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;