import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import BlogCreate from './components/Blog/BlogCreate';
import BlogDetail from './components/Blog/BlogDetail';
import BlogEdit from './components/Blog/BlogEdit';
import './styles/layout.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create" element={<BlogCreate />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog/:id/edit" element={<BlogEdit />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;