import React from "react";
import Ferrari from "../../../assets/images/ferrari.png";
import DoorIcon from "../../../assets/icons/car-details/doorIcon.svg";
import PetrolIcon from "../../../assets/icons/car-details/PetrolIcon";
import Seat from "../../../assets/icons/car-details/seat-airline.svg";
import Bolt from "../../../assets/icons/car-details/bolt.svg";
import GearsIcon from "../../../assets/icons/car-details/GearsIcon";
import { useNavigate } from "react-router-dom";

const Path = import.meta.env.VITE_LCR_BACKEND_URL;


const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const navigateToCarDetails = () => {
    navigate(`/all-cars/${car?._id}`);
  };
  return (
    <div
      className="bg-white rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500"
      onClick={navigateToCarDetails}
    >
      <img
        // src={Path+'/'+car?.images[0] || Ferrari}
        src={Ferrari}
        className=" w-full aspect-auto min-h-60 object-cover"
        alt="Ferrari"
      />
      <div className="p-3 space-y-3">
        <h3 className="font-bold text-xl">{car?.brand + " " + car?.name}</h3>
        <div className="grid grid-cols-2  gap-y-5">
          <div className="flex justify-start items-center gap-2">
            <img src={DoorIcon} alt="Door Icon" className="size-5" />
            <span>{car?.doors} Doors</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            {car?.powerSystem !== "Electric" ? (
              <>
                <PetrolIcon />
                <span>Gas</span>
              </>
            ) : (
              <>
                <img src={Bolt} alt="Door Icon" className="size-5" />
                <span>Electric</span>
              </>
            )}
          </div>
          <div className="flex justify-start items-center gap-2 ps-1">
            <img src={Seat} alt="Door Icon" className="size-5" />
            <span>{car?.seats} Seats</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <GearsIcon />
            <span>{car?.transmissionType}</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-5">
          <div className="flex flex-col ">
            <h3 className="text-lg font-bold text-headlines">
              AED {car?.rentalPrice}
              <span className="text-sm text-subtitles font-normal ">/Day</span>
            </h3>
            <p className="text-sm text-subtitles font-normal line-through">
              AED {car?.rentalPrice + car?.rentalPrice * 0.2}
            </p>
          </div>
          <button className="bg-headlines hover:bg-headlines/80 transition-all duration-300 text-white  rounded-md py-3 px-6 font-semibold text-base">
            Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
