import React from 'react';
import '../../styles/layout.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} BlogApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;