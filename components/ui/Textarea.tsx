import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = (props) => {
  const baseStyles: React.CSSProperties = {
    width: "100%",
    minHeight: "100px",
    padding: "0.75rem",
    backgroundColor: "#1e1e1e",
    border: "1px solid #555",
    borderRadius: "4px",
    color: "white",
    boxSizing: "border-box",
    fontFamily: "inherit",
    resize: "vertical",
    fontSize: '1em'
  };

  return (
    <textarea
      {...props}
      style={{...baseStyles, ...props.style}}
    />
  );
};

export default Textarea;