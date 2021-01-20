import React from "react";
import "./input.css";

const TextInput = ({
  label = "",
  required = false,
  value = "",
  placeholder = "Typing here",
  name = "",
  onChange,
  message,
}) => {
  return (
    <div className="input-wrapper flex-1">
      {label && (
        <div className="flex">
          <span className="input-label">{label}</span>
          {required && <span className="required">*</span>}
        </div>
      )}

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange ? onChange : undefined}
        className={`text-input ${message && "error-input "}`}
      />
      {message && <div className="error-message">{message}</div>}
    </div>
  );
};

export default TextInput;
