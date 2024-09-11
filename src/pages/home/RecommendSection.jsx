import React, { useEffect } from "react";
import CarCard from "../../components/Cards/car-card/CarCard";
import MainBtn from "../../components/Buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from "../../store/slices/carsSlice";
import SkeletonCarCard from "../../components/Cards/car-card/SkeletonCarCard";

const RecommendSection = () => {
  const navigate = useNavigate();
  const navigateToSearchResults = () => {
    navigate("/all-cars");
  };
  const { cars, loading } = useSelector((state) => state.carsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  return (
    <section className="py-28 center flex-col space-y-7">
      <h1 className="text-4xl text-center font-bold">Recommended for you</h1>
      <p className="text-center font-semibold text-base max-w-6xl">
        Discover a curated selection of luxury cars handpicked just for you. 
        Whether you're looking for elegance, performance, or both, these vehicles are sure to impress.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-5/6 my-10">
        {loading && (
          <>
            <SkeletonCarCard />
            <SkeletonCarCard />
            <SkeletonCarCard />
          </>
        )}
        {!loading &&
          cars.slice(0, 6).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
      </div>
      <MainBtn title={"All Cars"} onClick={navigateToSearchResults} />
    </section>
  );
};

export default RecommendSection;
