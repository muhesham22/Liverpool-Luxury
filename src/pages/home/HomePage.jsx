import React from "react";
import Section1 from "./Section1";
import OffersSection from "./OffersSection";
import VehicleTypeSection from "./VehicleTypeSection";
import HowItWorkSection from "./HowItWorkSection";
import RecommendSection from "./RecommendSection";
import Brands from "./Brands";
import ReviewsSection from "./ReviewsSection";
import FAQsection from "./FAQsection";

const HomePage = () => {
  return (
    <div>
      <Section1 />
      {/* <OffersSection /> */}
      <VehicleTypeSection />
      <HowItWorkSection />
      <RecommendSection />
      {/* <ReviewsSection /> */}
      <FAQsection />
      <Brands />
    </div>
  );
};

export default HomePage;
