import React from "react";
import { SelectInputProps } from "../types";

function SelectInput({
  id,
  label,
  options,
  shouldValidate,
  onChange,
  ...props
}: SelectInputProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full flex flex-col justify-center items-center rounded-lg p-2 border-2 border-wild-sand-600 focus-within:border-wild-sand-600">
        <select
          id={id}
          className="w-full py-0.5 text-wild-sand-600 focus:outline-none focus:border-wild-sand-600 rounded-lg"
          onChange={onChange}
          value={props.value}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {shouldValidate && (
        <p className="font-semibold text-roman-500 text-xs ml-1 mt-1">
          Este campo no puede estar vacío
        </p>
      )}
    </div>
  );
}

export default SelectInput;
