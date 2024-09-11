import React, { useState } from "react";
import ImgIcon from "../../assets/icons/imgIcon.svg";

const FileInput = ({
  title,
  label,
  id,
  handleChange,
  isRequired = false,
  isMultiple = false,
}) => {
  const [errorMessage, setErrorMessage] = useState("");


  return (
    <div className="space-y-1">
      <h4 className="text-subtitles">{title}</h4>
      <label
        htmlFor={id}
        className="border-dashed border-2 border-gray-200 hover:border-gray-300 cursor-pointer rounded-md p-5 py-3 center gap-5"
      >
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={handleChange}
          multiple={isMultiple}
          aria-required={isRequired}
        />
        <img src={ImgIcon} alt="Upload Icon" />
        <p>{label}</p>
      </label>
      {isRequired && errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FileInput;
