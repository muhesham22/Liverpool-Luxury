import React from "react";

const InputComp = ({ label, id, type, value = "", handleChange, isRequired, error }) => {
  return (
    <div>
      <label htmlFor={id} className="text-subtitles text-lg">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        className={`w-full p-3 border rounded-lg ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required={isRequired}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputComp;
