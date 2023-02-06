import React from "react";

function Input({
  label,
  name,
  value,
  required,
  type,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="w-full">
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
      <div>
        <input
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          autoComplete={name}
          placeholder={placeholder || ""}
          required={required}
          className={`border w-full p-2 block placeholder-gray-600 placeholder-opacity-50   shadow-sm  text-gray-700 text-sm font-semibold rounded-md  ${
            error ? "border-red-400" : "border-gray-400"
          }`}
        />

        {error && (
          <p className="ml-1 mt-1 text-xs tracking-wider font-semibold text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default React.memo(Input);
