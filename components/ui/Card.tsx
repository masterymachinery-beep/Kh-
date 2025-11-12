import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className, style }) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: "#2a2a2a",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "1.5rem",
    color: "white",
  };

  return (
    <div
      className={className}
      style={{ ...baseStyle, ...style }}
    >
      {children}
    </div>
  );
};

export default Card;