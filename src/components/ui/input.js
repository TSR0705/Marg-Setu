// src/components/ui/input.js
import React from 'react';

export const Input = ({ style, ...props }) => {
  const baseStyle = {
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
    transition: "border 0.3s",
    ...style,
  };

  return <input style={baseStyle} {...props} />;
};
