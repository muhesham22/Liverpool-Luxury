import React, { useEffect, useRef } from "react";
import Audi from "../../assets/icons/brands/audi.svg";
import BMW from "../../assets/icons/brands/bmw.svg";
import Hyundai from "../../assets/icons/brands/hyundai.svg";
import Mercedes from "../../assets/icons/brands/mercedes.svg";
import Toyota from "../../assets/icons/brands/toyota.svg";
import Tesla from "../../assets/icons/brands/tesla.svg";
import Ford from "../../assets/icons/brands/ford.svg";
import Kia from "../../assets/icons/brands/kia.svg";

const Brands = () => {
  const carBrands = [BMW, Mercedes, Audi, Toyota, Hyundai, Tesla, Ford, Kia];
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const startScrolling = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          scrollContainerRef.current.scrollLeft += 1;
          if (scrollLeft + clientWidth >= scrollWidth - 1) {
            scrollContainerRef.current.scrollLeft = 0;
          }
        }
      }, 20);
    };

    const stopScrolling = () => {
      clearInterval(scrollIntervalRef.current);
    };

    startScrolling();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("mouseover", stopScrolling);
      scrollContainerRef.current.addEventListener("mouseout", startScrolling);
    }

    return () => {
      if (scrollContainerRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollContainerRef.current.removeEventListener("mouseover", stopScrolling);
        scrollContainerRef.current.removeEventListener("mouseout", startScrolling);
      }
    };
  }, []);

  return (
    <section className="py-16 center flex-col space-y-5">
    <h1 className="text-4xl text-center font-bold">Brands</h1>
    <p className="text-center font-semibold text-base max-w-6xl">
      Discover our exclusive selection of world-renowned automotive brands. From
      luxury sedans to high-performance sports cars, we offer only the finest
      vehicles to enhance your driving experience in Dubai.
    </p>
  
    <div className="overflow-x-auto whitespace-nowrap w-full h-52 relative hide-scrollbar" ref={scrollContainerRef}>
      <div className="flex space-x-8 p-4 w-max" style={{ display: 'inline-flex' }}>
        {carBrands.concat(carBrands).map((item, index) => (
          <div key={index} className="center p-4 rounded">
            <img src={item} alt="Brand" className="h-24 w-auto min-w-24" />
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default Brands;
