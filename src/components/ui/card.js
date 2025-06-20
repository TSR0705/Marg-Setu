// src/components/ui/card.js
import React from 'react';

export const Card = ({ children, style, ...props }) => {
  const baseStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "20px",
    transition: "transform 0.3s",
    ...style,
  };

  return <div style={baseStyle} {...props}>{children}</div>;
};

export const CardContent = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};
