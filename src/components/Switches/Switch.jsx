import React from "react";

const Switch = ({isOn,toggle}) => {
  return (
    <div
      className={`flex py-1  ${
        isOn ? " bg-green-500" : "bg-gray-300"
      } rounded-full max-h-7 min-w-12 transition-all duration-300`}
      onClick={toggle}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Switch;
