import React from "react";
import SuccessImg from "../../assets/images/success-img.svg";
import { Close } from "@mui/icons-material";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-5 pb-10 rounded-xl space-y-5 h-4/5 w-11/12 md:w-1/2 lg:w-2/5 center flex-col ">
        <span className="absolute top-7 right-7 cursor-pointer">
          <Close />
        </span>
        <img src={SuccessImg} alt="SuccessImg" className="s" />
        <h2 className="text-3xl font-bold text-green-600">
          Submitted Successfully!
        </h2>
        <p className="max-w-md text-lg text-center">
          thank you for taking the time . we will talk to you as soon as
          possible !
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
