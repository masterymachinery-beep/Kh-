import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  const baseStyles: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#1e1e1e",
    border: "1px solid #555",
    borderRadius: "4px",
    color: "white",
    boxSizing: "border-box",
    fontSize: "1em",
    marginBottom: '1rem',
  };
  return (
    <input
      {...props}
      style={{...baseStyles, ...props.style}}
    />
  );
};

export default Input;