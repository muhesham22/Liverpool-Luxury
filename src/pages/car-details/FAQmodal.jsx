import React from "react";
import FAQsection from "../home/FAQsection";

const FAQmodal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div>
        <div
          className="bg-black bg-opacity-55 fixed top-0 left-0 size-full z-40 "
          onClick={onClose}
        ></div>
        <div className="fixed top-0 md:top-4  right-0 md:right-[16%]  z-50  shadow-lg  w-full md:w-2/3 space-y-7 md:max-h-[95vh] max-h-screen rounded-xl overflow-auto hide-scrollbar ">
          <FAQsection isModal={true} onClose={onClose} />
        </div>
      </div>
    )
  );
};

export default FAQmodal;
