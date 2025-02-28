import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DownIcon from "@/assets/svgs/DownIcon";

const CustomDropdown = ({ label, options, onChange, selectedValue }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900">
          {label}
          <DownIcon />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden"
      >
        <div className="py-1">
          {options.map((option) => (
            <MenuItem key={option.value}>
              {({ active }) => (
                <button
                  onClick={() => onChange(option.value)}
                  className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                    active ? "bg-gray-100 text-gray-900" : ""
                  } ${
                    selectedValue === option.value
                      ? "bg-gray-100 text-gray-900"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default CustomDropdown;
