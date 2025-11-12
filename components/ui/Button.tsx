import React from "react";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      style={{
        padding: "0.75rem 1.5rem",
        border: "none",
        borderRadius: "8px",
        fontSize: "1em",
        fontWeight: 500,
        fontFamily: "inherit",
        backgroundColor: "#4CAF50",
        color: "white",
        cursor: "pointer",
        transition: "background-color 0.25s, opacity 0.25s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        opacity: isLoading || props.disabled ? 0.6 : 1,
        ...props.style
      }}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;