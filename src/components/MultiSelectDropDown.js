import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const MultiSelectDropdown = ({
  options,
  selected,
  onChange,
  label,
  name,
  required,
  error,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={name}
          className="capitalize ml-1 flex mb-1 items-center  text-sm  font-semibold text-gray-700"
        >
          {label}
          {required && (
            <span className="text-ai-primary-text-dark ml-1"> * </span>
          )}
        </label>
      )}
      <div
        className={`w-full p-2 border border-gray-500 flex justify-between rounded-md cursor-pointer ${
          error ? "border-red-300" : "border-gray-600"
        }`}
        onClick={() => setOpen(!open)}
      >
        <h1 className="text-sm text-gray-700">{selected.length} selected</h1>
        <RiArrowDropDownLine className="w-6 h-6 " />
      </div>

      <ul
        className={`absolute top-16 bg-white border w-full border-gray-500 shadow-md rounded-sm ${
          open ? "block" : "hidden"
        }`}
      >
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <li
              key={option.id}
              className="px-2 py-1 flex gap-2"
              onClick={(e) => {
                onChange(option);
              }}
            >
              <input type="checkbox" checked={isSelected} className=""></input>
              <span>{option}</span>
            </li>
          );
        })}
      </ul>
      {error && (
        <p className="ml-1 mt-1 text-xs tracking-wider font-semibold text-red-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
