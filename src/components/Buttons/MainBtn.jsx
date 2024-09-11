import React from "react";

const MainBtn = ({title,onClick,children}) => {
  return (
    <button onClick={onClick} className="bg-main hover:bg-mainHover transition-all duration-500  text-white mt-10 rounded py-3 px-10 font-medium text-base">
      {title}
      {children}
    </button>
  );
};

export default MainBtn;
