import React from "react";
import ImageSlider from "../../components/slider/ImageSlider";

const ImageSliderModal = ({ images, isOpen, onClose,openedImage }) => {
  return (
    isOpen && (
      <div className="p-0 m-0">
        <div className="fixed top-0 p-3 bg-black  h-screen  right-0 md:left-0  z-50   shadow-lg  w-full  space-y-7 max-h-screen overflow-scroll hide-scrollbar">
          <div className="between items-start">
            <h2 className="text-xl font-bold text-white"></h2>
            <ImageSlider images={images}openedImage={openedImage} />
            <button onClick={onClose} className="text-white bg-main hover:bg-mainHover py-2 px-3 rounded-full">
              &#x2715;
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageSliderModal;
