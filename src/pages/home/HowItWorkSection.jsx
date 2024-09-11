import React from "react";
import CalenderFinger from "../../assets/icons/CalenderFinger";
import DrivingWheel from "../../assets/icons/DrivingWheel";
import CarIcon2 from "../../assets/icons/CarIcon2";
import { useNavigate } from "react-router-dom";

const HowItWorkCard = ({ img, title, description }) => {
  return (
    <div className="center flex-col gap-3 border border-headlines hover:border-gray-300/70 transition-all duration-300 ease-linear rounded-xl p-8">
      <div className="rounded-full center bg-main p-5">
        {img}
      </div>
      <h4 className="font-semibold text-lg text-white">{title}</h4>
      <p className="text-sm text-[#848484] font-semibold">{description}</p>
    </div>
  );
};

const HowItWorkSection = () => {
  const navigate =useNavigate();
  const navigateToSearchResults = () => {
    navigate("/all-cars");
  }
  return (
    <section className="bg-headlines rounded-3xl center text-center flex-col gap-10 py-20">
      <h1 className="text-4xl font-bold text-white">How It Works</h1>
      <p className="font-semibold text-lg text-white max-w-6xl">
  Renting a luxury car with us is a seamless and straightforward process. 
  Follow these simple steps to book your dream car and enjoy an exceptional driving experience in Dubai.
</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 w-4/6 mt-5">
        <HowItWorkCard img={< CarIcon2 />} title={"1. Find the Car"} description={"Choose your car from our collection"} />
        <HowItWorkCard img={<CalenderFinger />} title={"2. Book with Form"} description={"Choose your car from our collection"} />
        <HowItWorkCard img={<DrivingWheel />} title={"3. Ride in Style"} description={"Choose your car from our collection"} />
      </div>
      <button onClick={navigateToSearchResults} className="bg-white hover:bg-[#FFD3D3] transition-all duration-300 text-main mt-10 rounded py-3 px-10 font-semibold text-base">
        Rent a Car
      </button>
    </section>
  );
};

export default HowItWorkSection;
 