import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, signup as authSignup } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate(); // <-- updated from useHistory

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { token, userId } = await authLogin(email, password);
      setToken(token);
      setUser({ id: userId, email });
      navigate('/dashboard'); // <-- updated from history.push
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const { token, userId } = await authSignup(email, password);
      setToken(token);
      setUser({ id: userId, email });
      navigate('/dashboard'); // <-- updated from history.push
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/'); // <-- updated from history.push
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
