import React from 'react';
import '../../styles/ui.css';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;