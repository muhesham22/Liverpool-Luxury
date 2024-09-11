import React from "react";
import HomeBackGround from "../../assets/images/home-bg.png";
import HomeLogo from "../../assets/images/home-logo.svg";
import HomeSearch from "./HomeSearch";

const Section1 = () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-10 p-1 pt-20 xl:pt-0 pb-20"
      style={{
        backgroundImage: `url(${HomeBackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "120vh",
        width: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={HomeLogo}  />
      <h1 className="text-4xl text-white font-bold text-center">
        Looking for a vehicle? You’re at the right place
      </h1>
      <HomeSearch />
    </section>
  );
};

export default Section1;
