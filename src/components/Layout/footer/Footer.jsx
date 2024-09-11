import React from "react";
import LogoSVG from "../../../assets/images/logo-svg.svg";
import Facebook1 from "../../../assets/icons/social-media/facebook1.svg";
import Facebook2 from "../../../assets/icons/social-media/facebook2.svg";
import Instagram1 from "../../../assets/icons/social-media/instagram1.svg";
import Instagram2 from "../../../assets/icons/social-media/instagram2.svg";
import Snapchat1 from "../../../assets/icons/social-media/snapchat1.svg";
import Snapchat2 from "../../../assets/icons/social-media/snapchat2.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-headlines  bottom-0  mt-auto pt-14 pb-24 grid md:grid-cols-12 grid-cols-3  gap-8">
      <div className="col-span-4 flex flex-col justify-start  items-center gap-5">
        <img src={LogoSVG} />
        <ul className="center gap-3 ">
          <li className="center bg-main hover:bg-mainHover transition-all duration-300 flex gap-3 rounded-full p-3 cursor-pointer">
            <img src={Facebook1} />
          </li>
          <li className="center bg-main hover:bg-mainHover transition-all duration-300 flex gap-3 rounded-full p-3 cursor-pointer">
            <img src={Instagram1} />
          </li>
          <li className="center bg-main hover:bg-mainHover transition-all duration-300 flex gap-3 rounded-full p-3 cursor-pointer">
            <img src={Snapchat1} />
          </li>
        </ul>
      </div>
      <div className="col-span-3 flex flex-col justify-start md:items-start  items-center  gap-5">
        <h3 className="text-main text-2xl font-bold">Easy Access</h3>
        <ul className="space-y-3">
          <Link to={'/'} className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            Home
          </Link>
          <Link to={'/all-cars'} className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            All Cars
          </Link>

          <Link to={'/about-us'} className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            About
          </Link>
          <Link to={'/contact-us'} className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            Contact
          </Link>
        </ul>
      </div>
      <div className="col-span-3 flex flex-col justify-start md:items-start  items-center  gap-5">
        <h3 className="text-main text-2xl font-bold">Contact Us</h3>
        <ul className="space-y-3">
          <li className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            <img src={Facebook2} />
            <span>Facebook</span>
          </li>
          <li className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            
            <img src={Instagram2} />
            <span>Instagram</span>
          </li>

          <li className="text-white text-base font-semibold cursor-pointer hover:text-main transition-all duration-300 flex gap-3">
            
            <img src={Snapchat2} />
            <span>Snapchat</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
