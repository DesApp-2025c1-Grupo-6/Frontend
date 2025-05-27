import React from "react";
import { SelectInputProps } from "../types";

function SelectInput({
  id,
  label = "Seleccione una opción",
  options,
  shouldValidate,
  errorMessage = "Este campo es obligatorio",
  onChange,
  ...props
}: SelectInputProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full flex flex-col justify-center items-center rounded-lg p-2 border-2 border-wild-sand-600 focus-within:border-wild-sand-600">
        <select
          id={id}
          className="w-full py-0.5 cursor-pointer text-wild-sand-600 focus:outline-none focus:border-wild-sand-600 rounded-lg"
          onChange={onChange}
          value={props.value}
        >
          <option value="" disabled>
            {label}
          </option>
          {options
            .filter(
              (option) =>
                option.value !== undefined &&
                option.value !== null &&
                option.value !== ""
            )
            .map((option, idx) => (
              <option
                key={String(option.value) + "-" + idx}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>
      </div>
      {shouldValidate && (
        <p className="font-semibold text-roman-500 text-xs ml-1 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default SelectInput;
