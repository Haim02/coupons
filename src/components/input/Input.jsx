import React from "react";
import "./input.css";

const Input = ({ lable, placeholder, name, onChange, type }) => {
  return (
    <div>
      <div className="inputCountainer">
        <label>{lable}</label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
