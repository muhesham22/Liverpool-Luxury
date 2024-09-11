import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import CarCard from "../../components/Cards/car-card/CarCard";
import AddNewCar from "../admin/AddNewCar";
import SkeletonCarCard from "../../components/Cards/car-card/SkeletonCarCard";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, fetchAllCars, selectFilteredCars } from "../../store/slices/carsSlice";
import FilterIcon from "../../assets/icons/filterIcon.svg";
import { getAvailableCars } from "../../services/cars.service";
import { clearDateRange } from "../../store/slices/dateRangeSlice";

const AllCarsPage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  const { cars, loading, showFilteredCars } = useSelector(
    (state) => state.carsData
  );
  const { startDate, endDate } = useSelector((state) => state.dateRangeData);
  const filteredCars = useSelector(selectFilteredCars);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const closeCarModal = () => {
    setShowAddCarModal(false);
    dispatch(fetchAllCars());
  };

  const role = localStorage.getItem("role");

  const displayedCars = showFilteredCars ? filteredCars : cars;

  return showFilterModal ? (
    <Filters isOpen={showFilterModal} setIsOpen={setShowFilterModal} />
  ) : (
    <div className="grid grid-cols-9 gap-3 py-5 px-4">
      <div className="col-span-2 md:col-span-3 lg:col-span-2 hidden md:block">
        <Filters />
      </div>
      <div className="col-span-9 md:col-span-6 lg:col-span-7 p-4 flex flex-col items-center relative">
        {role === "admin" && (
          <button
            className="absolute top-20 md:top-1 right-0 bg-main text-white p-3 rounded-lg font-bold text-lg"
            onClick={() => setShowAddCarModal(true)}
          >
            Add Car
          </button>
        )}
        <AddNewCar isOpen={showAddCarModal} onClose={closeCarModal} />
        <button
          onClick={() => setShowFilterModal(true)}
          className="bg-headlines rounded-lg text-white text-xl w-full py-3 px-5 mb-5 flex md:hidden justify-center items-center gap-2"
        >
          <img src={FilterIcon} alt="Filter Icon" className="w-5 h-5" />
          Filter
        </button>
        <h1 className="text-3xl font-bold text-center">Cars</h1>
        <p className="text-base text-subtitles text-center font-semibold">
          Based on your search
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-8 w-full">
          {loading && (
            <>
              <SkeletonCarCard />
              <SkeletonCarCard />
              <SkeletonCarCard />
            </>
          )}
          {!loading && displayedCars.length === 0 && (
            <p className="text-2xl font-bold text-center col-span-full">
              No cars found For this filters..
            </p>
          )}
          {displayedCars?.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCarsPage;
