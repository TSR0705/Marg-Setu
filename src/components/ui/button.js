// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, onClick, style, ...props }) => {
  const baseStyle = {
    backgroundColor: "#0077cc", // Entrepreneur blue
    color: "#ffffff",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    ...style,
  };

  return (
    <button onClick={onClick} style={baseStyle} {...props}>
      {children}
    </button>
  );
};
