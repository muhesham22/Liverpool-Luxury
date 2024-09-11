import React from "react";
import OfferImg from "../../assets/images/offer.png";

const OfferCard = ({ img, title, discount, description }) => {
  return (
    <div
      className="relative bg-cover cursor-pointer bg-center bg-no-repeat p-5 rounded-xl flex flex-col h-64 justify-between col-span-1 transform transition-transform duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="flex flex-row-reverse">
        <span className="bg-main text-white p-3 rounded-xl">
          {discount}% off
        </span>
      </div>

      {/* Description */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl p-5 flex flex-col justify-end">
        <h2 className="text-white font-medium text-xl mb-2">{title}</h2>
        <p className="text-white text-center">{description}</p>
      </div>
    </div>
  );
};

const OffersSection = () => {
  return (
    <section className="bg-white py-28 center flex-col space-y-7">
      <h1 className="text-4xl text-center font-bold">
        Best of The Best / Our Offers
      </h1>
      <p className="text-center font-semibold text-base  max-w-6xl">
        Explore our exclusive offers on the most sought-after luxury vehicles.
        Experience the pinnacle of comfort and style at unbeatable rates,
        tailored just for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 w-5/6">
        <OfferCard
          img={OfferImg}
          title={"Offer Title"}
          discount={50}
          description={
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          }
        />
        <OfferCard
          img={OfferImg}
          title={"Offer Title"}
          discount={50}
          description={
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          }
        />
        <OfferCard
          img={OfferImg}
          title={"Offer Title"}
          discount={50}
          description={
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          }
        />
      </div>
    </section>
  );
};

export default OffersSection;
