import React, { useState } from "react";
import RightArrow from "../../assets/icons/right-arrow.svg";

const ImageSlider = ({ images,openedImage }) => {
  const [currentIndex, setCurrentIndex] = useState(openedImage||0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-auto rounded-lg transition-all duration-500 aspect-square object-cover"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform rotate-180 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 px-3"
      >
        <img src={RightArrow} alt="RightArrow" />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform  -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 px-3"
      >
        <img src={RightArrow} alt="RightArrow" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={` h-3 rounded-xl cursor-pointer ${
              index === currentIndex ? "bg-gray-500 w-16" : "bg-gray-300 w-5"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
