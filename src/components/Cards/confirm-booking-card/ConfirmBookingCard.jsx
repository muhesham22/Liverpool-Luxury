import React from "react";
import CarImg1 from "../../../assets/images/car-details/car-img (1).png";
import MainBtn from "../../Buttons/MainBtn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

const ConfirmBookingCard = ({ status, car = {}, booking = {} }) => {
  const {
    brand = "Unknown Brand",
    name = "Unknown Model",
    year = "Unknown Year",
    images = [],
  } = car || {};

  const { startDate, endDate, total, confirmation } = booking || {};
  const navigate = useNavigate();

  const handleAdminBookingDetails = () => {
    navigate(`/bookings/${booking._id}`);
  };

  return (
    <div className="relative p-4 flex flex-col justify-center md:flex-row gap-5 border border-gray-300 rounded-xl bg-white">
      {booking?._id && (
        <div
          className="absolute top-1 right-1 md:top-5 md:right-5 cursor-pointer"
          onClick={handleAdminBookingDetails}
        >
          <OpenInNewIcon className="hover:text-main" />
        </div>
      )}
      <img
        src={(images.length > 0 && images[0]) || CarImg1}
        alt="Car"
        className="rounded-md aspect-[1.25] object-cover w-72 md:h-64 cursor-pointer"
        onClick={() => navigate(`/all-cars/${car._id}`)}
      />
      <div className="space-y-3 flex-grow">
        <h3 className="text-2xl font-bold">
          {brand.toUpperCase() + " " + name.toUpperCase() + " " + year}
        </h3>
        <p className="font-semibold">
          Rent and drive this {brand.toUpperCase()} {name.toUpperCase()} {year}
          -model in Dubai
        </p>
        <div className="space-y-2 text-gray-700">
          <p>
            Pickup date:{" "}
            {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            Drop off date:{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
          </p>
          <p>Total price: AED {total || "N/A"}</p>
          {/* <p>{paymentLeft} Left to Pay</p> */}
          <p>
            Status :{" "}
            <span className={getStatusClass(booking?.status)}>
              {booking?.status || "N/A"}
            </span>
          </p>
          <p>
            Confirmation :{" "}
            <span className={getConfirmationClass(booking?.confirmation)}>
              {booking?.confirmation || "N/A"}
            </span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        {status !== "Upcoming" ||
          (status !== "checkout" && (
            <MainBtn
              title={confirmation !== "pending" ? "Complete" : "Rebook"}
            />
          ))}
      </div>
    </div>
  );
};
const getStatusClass = (status) => {
  switch (status) {
    case "Upcoming":
      return "text-blue-600";
    case "Ongoing":
      return "text-orange-600";
    case "Cancelled":
      return "text-red-600";
    case "Completed":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getConfirmationClass = (confirmation) => {
  switch (confirmation) {
    case "pending":
      return "text-yellow-600";
    case "confirmed":
      return "text-green-600";
    case "canceled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default ConfirmBookingCard;
