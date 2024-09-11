import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonCarCard = () => {
  return (
    <div className="rounded-xl overflow-hidden space-y-2 bg-white">
      <Skeleton variant="rectangular" height={233} />
      <div className="px-3">
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </div>
      <div className="flex justify-between items-center p-5 ">
        <div className="flex flex-col ">
          <h3 className="text-lg font-bold text-headlines">
            AED 80
            <span className="text-sm text-subtitles font-normal ">/Day</span>
          </h3>
          <p className="text-sm text-subtitles font-normal line-through">
            AED 100
          </p>
        </div>
        <button className="bg-headlines hover:bg-headlines/80 transition-all duration-300 text-white  rounded-md py-3 px-6 font-semibold text-base">
          Rent
        </button>
      </div>
    </div>
  );
};

export default SkeletonCarCard;
