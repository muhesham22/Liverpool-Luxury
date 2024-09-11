import React from "react";
import { useNavigate } from "react-router-dom";
import MainBtn from "../../components/Buttons/MainBtn";

import Sedan from "../../assets/images/vehicle-types/sedan.png";
import Economy from "../../assets/images/vehicle-types/economy.png";
import Sport from "../../assets/images/vehicle-types/sport.png";
import SUV from "../../assets/images/vehicle-types/suv.png";
import Luxury from "../../assets/images/vehicle-types/luxury.png";
import Super from "../../assets/images/vehicle-types/super.png";
import { useDispatch } from "react-redux";
import { setFilter, setShowFilteredCars } from "../../store/slices/carsSlice";

const vehicleTypes = [
  {
    label: "Sedan",
    img: Sedan,
  },
  {
    label: "Economy",
    img: Economy,
  },
  {
    label: "Sport",
    img: Sport,
  },
  {
    label: "SUV",
    img: SUV,
  },
  {
    label: "Luxury",
    img: Luxury,
  },
  {
    label: "Super",
    img: Super,
  },
];

const VehicleTypeCard = ({ img, title, onClick }) => {
  return (
    <div
      onClick={()=>onClick(title)}
      className="center flex-col gap-3 border-2 border-gray-300/70 rounded-xl cursor-pointer bg-white p-3 hover:border-main transition-all duration-300 ease-linear"
    >
      <img
        src={img}
        alt={title}
        className="hover:scale-90 max-h-32 transition-all duration-500 object-cover scale-75"
      />
      <h4 className="font-semibold text-md">{title}</h4>
    </div>
  );
};

const VehicleTypeSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToSearchResults = () => {
    navigate("/all-cars");
  };

  const findCarsByType = (type) => {
    dispatch(setFilter({ filter: "vehicleTypes", value: [type] }));
    dispatch(setShowFilteredCars(true));
    navigateToSearchResults();
  };

  return (
    <section className="bg-background p-20 py-24 text-center center flex-col gap-5">
      <h1 className="text-3xl font-bold">Vehicle Type</h1>
      <p className="font-semibold text-base max-w-6xl">
        Choose from a diverse range of luxury vehicle types to suit your style
        and needs. Whether you're in the mood for a sleek sedan, a powerful SUV,
        or a sporty coupe, we've got you covered.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 w-5/6">
        {vehicleTypes.map((type, index) => (
          <VehicleTypeCard
            key={index}
            img={type.img}
            title={type.label}
            onClick={findCarsByType}
          />
        ))}
      </div>
      <MainBtn title={"All Cars"} onClick={navigateToSearchResults} />
    </section>
  );
};

export default VehicleTypeSection;
