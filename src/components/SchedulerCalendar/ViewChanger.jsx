import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ViewTypes } from "react-big-scheduler";
import DownIcon from "@/assets/svgs/DownIcon";

const ViewChanger = ({ onChangeView }) => {
  const [selectedView, setSelectedView] = useState(ViewTypes.Week);

  const views = [
    { type: ViewTypes.Day, label: "Day" },
    { type: ViewTypes.Week, label: "Week" },
    { type: ViewTypes.Month, label: "Month" },
    { type: ViewTypes.Year, label: "Year" },
  ];

  const handleViewChange = (viewType) => {
    setSelectedView(viewType);
    onChangeView(viewType);
  };

  const selectedViewLabel = views.find(
    (view) => view.type === selectedView
  )?.label;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ">
          {selectedViewLabel}
          <DownIcon />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden"
      >
        <div className="py-1">
          {views.map((view) => (
            <MenuItem key={view.type}>
              {({ active }) => (
                <button
                  onClick={() => handleViewChange(view.type)}
                  className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                    active ? "bg-gray-100 text-gray-900" : ""
                  } ${
                    selectedView === view.type
                      ? "bg-gray-100 text-gray-900"
                      : ""
                  }`}
                >
                  {view.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ViewChanger;
