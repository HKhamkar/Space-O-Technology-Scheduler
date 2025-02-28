import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DownIcon from "@/assets/svgs/DownIcon";

const StatusChange = () => {
  const [selectedInterval, setSelectedInterval] = useState(60);

  const intervals = [
    { value: 1, label: "Value 1" },
    { value: 2, label: "Value 2" },
    { value: 3, label: "Value 3" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ">
          Status
          <DownIcon />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden"
      >
        <div className="py-1">
          {intervals.map((interval) => (
            <MenuItem key={interval.value}>
              {({ active }) => (
                <button
                  onClick={() => {}}
                  className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                    active ? "bg-gray-100 text-gray-900" : ""
                  } ${
                    selectedInterval === interval.value
                      ? "bg-gray-100 text-gray-900"
                      : ""
                  }`}
                >
                  {interval.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default StatusChange;
