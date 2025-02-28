"use client";

import { MdChevronLeft } from "react-icons/md";
import React, { useState } from "react";

const tabOptions = [
  { id: 1, label: "Events" },
  { id: 2, label: "Team View" },
  { id: 3, label: "Team Tracking" },
];

const SchedulerHeader = () => {
  const [selectedTab, setSelectedTab] = useState(2);

  return (
    <div className="inline-block w-full px-5 py-3 border-b-2 border-[#EEEFF1]">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-start-1 col-end-4">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdChevronLeft />
            <p className="text-[#232529]">November 2024</p>
          </div>
        </div>
        <div className="col-start-4 col-end-9">
          <div>
            <div className="flex justify-center items-center">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-0.5 px-4 text-sm h-fit border-2 rounded-lg ${
                    selectedTab === tab.id
                      ? "bg-[#FAFAFA] border-[#EEEFF1]"
                      : "text-[#667085] border-transparent"
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-start-10 col-end-13" />
      </div>
    </div>
  );
};

export default SchedulerHeader;
