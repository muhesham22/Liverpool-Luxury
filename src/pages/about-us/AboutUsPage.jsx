import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckArrow from "../../assets/icons/check-arrow.svg";
import CarImg from "../../assets/images/about-car (1).png";
import MissionImg from "../../assets/images/about-car (3).png";
import VisionImg from "../../assets/images/about-car (4).png";
import Brands from "../home/Brands";

const MissionVisionSection = ({ isMission }) => {
  return (
    <div className="space-y-8 py-10">
      <h2 className="text-3xl text-center font-bold">
        {isMission ? "Our Mission" : "Our Vision"}
      </h2>

      <p className="text-center font-semibold text-base">
        {isMission
          ? "To provide an exceptional luxury car rental experience in Dubai, offering an exclusive fleet and superior service that exceeds our clients' expectations."
          : "To be recognized as Dubai's leading luxury car rental service, synonymous with elegance, reliability, and world-class customer care."}
      </p>
      <div className="grid grid-cols-2 gap-5">
        <div
          className={`space-y-3 col-span-full ${
            isMission
              ? "lg:col-start-2 lg:col-end-3 lg:row-start-1"
              : "lg:col-start-1 lg:col-end-2"
          }`}
        >
          <ul className="flex flex-col justify-around items-start h-full ">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <li key={index} className="flex justify-start gap-3">
                  <img src={CheckArrow} alt="CheckArrow" />
                  <p>
                    {isMission
                      ? index === 0
                        ? "Delivering an unrivaled selection of the finest luxury cars available in Dubai."
                        : index === 1
                        ? "Ensuring a seamless rental experience from booking to return."
                        : index === 2
                        ? "Maintaining our vehicles to the highest standards for safety and comfort."
                        : index === 3
                        ? "Offering personalized services tailored to meet the unique needs of each client."
                        : index === 4
                        ? "Striving for excellence in every interaction and service."
                        : "Building lasting relationships through trust and transparency."
                      : index === 0
                      ? "Expanding our fleet to include the most prestigious and desired vehicles."
                      : index === 1
                      ? "Setting new standards for luxury car rentals in the UAE."
                      : index === 2
                      ? "Continuously improving our services through innovation and client feedback."
                      : index === 3
                      ? "Partnering with leading brands to enhance our service offerings."
                      : index === 4
                      ? "Creating unforgettable driving experiences for our clients."
                      : "Leading the industry with our commitment to luxury and excellence."}
                  </p>
                </li>
              ))}
          </ul>
        </div>
        <div
          className={`col-span-full center ${
            isMission
              ? "lg:col-start-1 lg:col-end-2"
              : "lg:col-start-2 lg:col-end-3"
          }`}
        >
          <img
            src={isMission ? MissionImg : VisionImg}
            alt={isMission ? "Mission Image" : "Vision Image"}
            className="rounded-md object-cover w-full h-72 lg:h-auto lg:max-h-96"
          />
        </div>
      </div>
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <div className="py-10 px-3 md:px-20 space-y-5">
      <h1 className="text-4xl text-center font-bold">About Liverpool Car Rental</h1>
    <div className="center">
      <p className="text-center font-semibold text-base max-w-6xl ">
        Welcome to Liverpool Car Rental, your gateway to luxury car rentals in Dubai. We
        pride ourselves on providing an unmatched selection of premium vehicles
        coupled with top-notch customer service to ensure your driving experience
        in Dubai is nothing short of extraordinary.
      </p>
    </div>
      
      <div className="grid grid-cols-3 gap-5">
        <div className="space-y-3 col-span-full lg:col-span-1">
          <h2 className="text-2xl">Experience Luxury Like Never Before</h2>
          <div className="flex gap-3">
            <div className="p-2 rounded-full bg-main max-w-11 text-center">
              <PhoneIcon className="text-white" />
            </div>
            <p className="pt-1 text-lg font-semibold">+971 4 567 8900</p>
          </div>
          <ul className="space-y-5">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <li key={index} className="flex justify-start gap-3">
                  <img src={CheckArrow} alt="CheckArrow" />
                  <p>
                    {index === 0
                      ? "Choose from a wide range of the latest luxury cars, including SUVs, sedans, and sports cars."
                      : index === 1
                      ? "Enjoy 24/7 customer support to assist with all your rental needs."
                      : index === 2
                      ? "Benefit from competitive rates without compromising on quality."
                      : "Experience hassle-free booking with our user-friendly platform."}
                  </p>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-span-full lg:col-span-2">
          <img
            src={CarImg}
            alt="CarImg"
            className="rounded-md object-cover w-full h-52 lg:h-auto lg:max-h-96"
          />
        </div>
      </div>
      <Brands />
      <MissionVisionSection isMission />
      <MissionVisionSection />
    </div>
  );
};

export default AboutUsPage;
