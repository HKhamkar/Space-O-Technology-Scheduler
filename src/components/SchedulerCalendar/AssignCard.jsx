import React from "react";

const AssignCard = () => {
  return (
    <>
      <div className="inline-block w-full py-4 border-b border-[#EEEFF1] last:border-0">
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="col-span-2">
            <p className="text-[#232529] text-sm">Cameron Williamson</p>
          </div>

          <div className="flex justify-end">
            <p className="text-[#667085] text-sm">JOB106731</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <span className="text-[#667085] text-sm">4140 Parker Rd.</span>
            <p className="text-[#667085] text-sm">Allentown,New Mexico 31134</p>
          </div>

          <div className="flex justify-end items-end">
            <div
              className={`flex items-center w-fit text-sm justify-center h-[22px] px-6 py-3 border-2 rounded-lg bg-[#FAFAFA] border-[#EEEFF1] `}
            >
              Assign
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignCard;
