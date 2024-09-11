import React, { useState } from "react";

const RequirementModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("Residents");

  if (!isOpen) return null;
  return (
    <div>
      <div
        className="bg-black bg-opacity-55 fixed top-0 left-0 size-full z-40 "
        onClick={onClose}
      ></div>
      <div className="fixed top-0 h-screen md:h-auto md:top-16 right-0 md:right-1/3  z-50  bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 space-y-7 ">
        <div className="between">
          <h2 className="text-xl font-bold ">Requirement Modal</h2>
          <button onClick={onClose} className="text-gray-700">
            &#x2715;
          </button>
        </div>
        <div className="space-y-2">
          <div className="between">
            <p>Minimum Driver’s Age</p>
            <p className="text-main">18 Years</p>
          </div>
          <div className="between">
            <p>Security Deposite</p>
            <p className="text-main">AED 500</p>
          </div>
          <div className="between">
            <p>Refunded In</p>
            <p className="text-main">30 Days</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold ">Documents Required</h3>
          <p className="text-subtitles text-sm">
            We are eligible to rent a car across the emirates provided you have
            the below mentioned documents valid with you
          </p>
        </div>
        <div className="border border-gray-300 rounded-md py-3 px-5 grid grid-cols-2 gap-5">
          <button
            onClick={() => setSelectedTab("Residents")}
            className={`${
              selectedTab === "Residents"
                ? "border border-main bg-main/20 text-main"
                : "text-subtitles hover:bg-main/20"
            } transition-all duration-300  rounded-md text-center  py-2 text-sm font-bold px-5`}
          >
            For UAE Residents
          </button>
          <button
            onClick={() => setSelectedTab("Tourists")}
            className={`${
              selectedTab === "Tourists"
                ? "border border-main bg-main/20 text-main"
                : "text-subtitles hover:bg-main/20"
            } transition-all duration-300  rounded-md text-center text-sm py-2 px-5 font-bold`}
          >
            For Tourists
          </button>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <svg
                width="18"
                height="14"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.74919 17.6626C7.06793 17.6629 6.41457 17.3921 5.93325 16.91L0.443061 11.4219C-0.147687 10.8309 -0.147687 9.87302 0.443061 9.28208C1.034 8.69134 1.99191 8.69134 2.58284 9.28208L7.74919 14.4484L21.4172 0.780463C22.0081 0.189715 22.966 0.189715 23.5569 0.780463C24.1477 1.3714 24.1477 2.32931 23.5569 2.92024L9.56513 16.91C9.08381 17.3921 8.43045 17.6629 7.74919 17.6626Z"
                  fill="#848484"
                />
              </svg>

              <p className="col-span-full text-sm text-subtitles">
                For UAE Residents
              </p>
            </li>
            <li className="flex gap-3">
              <svg
                width="18"
                height="14"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.74919 17.6626C7.06793 17.6629 6.41457 17.3921 5.93325 16.91L0.443061 11.4219C-0.147687 10.8309 -0.147687 9.87302 0.443061 9.28208C1.034 8.69134 1.99191 8.69134 2.58284 9.28208L7.74919 14.4484L21.4172 0.780463C22.0081 0.189715 22.966 0.189715 23.5569 0.780463C24.1477 1.3714 24.1477 2.32931 23.5569 2.92024L9.56513 16.91C9.08381 17.3921 8.43045 17.6629 7.74919 17.6626Z"
                  fill="#848484"
                />
              </svg>

              <p className="col-span-full text-sm text-subtitles">
                For UAE Residents
              </p>
            </li>
          </ul>
        </div>
        <p className="text-subtitles text-xs">
          Visitors from the GCC, US, UK, Canada, Europe and certain other
          countries can drive with their home country driving license, without
          the need of an IDP.
        </p>
      </div>
    </div>
  );
};

export default RequirementModal;
