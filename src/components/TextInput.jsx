import React, { useState } from "react";

export default function TextInput({
  type = "text",
  className,
  placeholder,
  label,
}) {
  const [value, setValue] = useState("");
  return (
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${className}`}
        value={value}
        placeholder={placeholder}
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        onChange={(evt) => setValue(evt.target.value)}
      />
    </div>
  );
}
