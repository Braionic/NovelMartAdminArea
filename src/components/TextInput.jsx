import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function TextInput({
  type = "text",
  className,
  placeholder,
  label,
  icon,
  name,
}) {
  const [value, setValue] = useState("");
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="mb-3">
      <label
        for={`exampleInput${name}`}
        className={`form-label ${icon && "c-text"}`}
      >
        {label}
      </label>
      <div className={icon && `box-text-field`}>
        <input
          type={type}
          className={`form-control ${className}`}
          value={value}
          placeholder={placeholder}
          id={`exampleInput${name}`}
          aria-describedby="emailHelp"
          onChange={(evt) => setValue(evt.target.value)}
        />
        {icon}
      </div>
    </div>
  );
}
