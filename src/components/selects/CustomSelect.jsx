import React from "react";

const CustomSelect = ({ id, label, options, value, handleChange, required = false, error }) => {
  return (
    <div>
      <label htmlFor={id} className="text-subtitles text-lg">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={`w-full p-3 border rounded-lg py-4 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
