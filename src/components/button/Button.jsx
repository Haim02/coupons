import React from "react";
import "./button.css";

const Button = ({ text, onClick, type }) => {
  return (
    <button onClick={onClick} className="btn" type={type}>
      {text}
    </button>
  );
};

export default Button;
