import React, { useState } from "react";
import CarIcon from "../../assets/icons/CarIcon";
import { useNavigate } from "react-router-dom";
import { vehicleTypes } from "../../Data/carsData";
import DateRangePicker from "../../components/date-range-picker/DateRangePicker";
import { useDispatch } from "react-redux";
import {
  fetchAvailableCars,
  setFilter,
  setShowFilteredCars,
} from "../../store/slices/carsSlice";

const HomeSearch = () => {
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToSearchResults = () => {
    if (vehicleType) {
      dispatch(setFilter({ filter: "vehicleTypes", value: [vehicleType] }));
    }
    dispatch(fetchAvailableCars());
    dispatch(setShowFilteredCars(true));
    navigate("/all-cars");
  };

  return (
    <div className="bg-white rounded-xl p-10 grid grid-cols-8 gap-5 w-11/12 md:w-auto mb-5 relative">
      <div className="flex flex-col gap-3 col-span-full md:col-span-3 ">
        <label htmlFor="vehicle-type" className="text-base font-semibold">
          Vehicle Type
        </label>
        <div className="border-2 border-gray-300/75 rounded-md h-11 relative">
          <span className="absolute mt-[7px] ms-4">
            <CarIcon />
          </span>
          <select
            className="w-4/5 h-full px-4 ms-10 cursor-pointer"
            value={vehicleType}
            id="vehicle-type"
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes?.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 col-span-full md:col-span-4 relative pt-1">
        <DateRangePicker top={-150} />
      </div>

      <button
        className="bg-headlines text-white hover:bg-headlines/80 transition-all duration-300 py-2 px-4 rounded-lg col-span-full md:col-span-1 h-11 mt-9"
        onClick={navigateToSearchResults}
      >
        Search
      </button>
    </div>
  );
};

export default HomeSearch;
