import React from "react";
import LeftIcon from "../../assets/svgs/LeftIcon";
import RightIcon from "@/assets/svgs/RightIcon";

const DateNavigator = ({ onPrev, onNext, onToday }) => {
  return (
    <div className="flex items-center gap-0.5">
      <div
        onClick={onPrev}
        className="bg-[#f4f4f5] h-[32px] w-[32px] rounded-l-lg flex items-center justify-center cursor-pointer"
      >
        <LeftIcon />
      </div>
      <span className="text-[14px] h-[32px] px-3 bg-[#f4f4f5] flex items-center justify-center">
        Today
      </span>
      <div
        onClick={onNext}
        className="bg-[#f4f4f5] h-[32px] w-[32px] rounded-r-lg flex items-center justify-center cursor-pointer"
      >
        <RightIcon />
      </div>
    </div>
  );
};

export default DateNavigator;
