import React from "react";
import { TextInputProps } from "../types";

function TextInput({
  label,
  placeholder,
  Icon,
  id,
  name,
  onChange,
  className,
  value,
  type,
  shouldValidate,
  errorMessage = "Este campo es obligatorio",
  ...props
}: TextInputProps) {
  return (
    <div>
      <div
        className={`relative w-full flex justify-center items-center rounded-lg p-2 border-2 border-wild-sand-600 focus:border-wild-sand-600 active:border-wild-sand-600 py-0 ${className}`}
      >
        <p className="text-gray-400 text-xs z-10 px-1 left-3 -top-2 absolute bg-gradient-to-t from-gray-chateau-50 from-70% to-transparent ">
          {label}
        </p>
        <input
          type={type}
          className="w-full flex gap-4 relative outline-0 text-wild-sand-600 p-2 justify-between [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
          placeholder={placeholder}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          {...props}
        />
      </div>
      {shouldValidate && !value && (
        <p className="font-semibold text-roman-500 text-xs ml-1 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default TextInput;
