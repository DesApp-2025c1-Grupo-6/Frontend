import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import ArrowSelect from "../icons/ArrowSelect";
import { SelectInputProps } from "../types";

function SelectInput({
  id,
  label = "Seleccione una opción",
  options,
  defaultOption = "Ninguno",
  shouldValidate,
  errorMessage = "Este campo es obligatorio",
  onChange,
  ...props
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredOptions(
      (options || []).filter((option) =>
        String(option.label).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [options, searchValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      setSearchValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    setIsOpen(false);
    const event = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    if (onChange) onChange(event);
  };

  return (
    <div id={id} className="flex flex-col w-full" ref={ref}>
      <div className="relative w-full flex flex-col justify-center items-center rounded-lg p-2 border-2 border-wild-sand-600 focus-within:border-wild-sand-600">
        <p className="text-gray-400 text-xs px-1 left-3 -top-2 absolute bg-gradient-to-t from-gray-chateau-50 from-70% to-transparent ">
          {label}
        </p>
        <button
          type="button"
          className="w-full py-0.5 cursor-pointer text-wild-sand-600 focus:outline-none focus:border-wild-sand-600 rounded-lg flex justify-between items-center"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="truncate block">
            {options.find((o) => o.value === props.value)?.label ||
              defaultOption}
          </span>
          <span className={isOpen ? "rotate-180" : ""}>
            <ArrowSelect></ArrowSelect>
          </span>
        </button>
        {isOpen && (
          <div className="p-2 absolute left-0 top-full mt-1 w-full bg-gray-chateau-50 border border-gray-300 rounded-lg shadow-lg">
            <div className="p-2 flex items-center">
              <SearchIcon className="text-gray-500 mr-2" />
              <input
                autoComplete="off"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Buscar ${label}`}
                className="w-full rounded-lg focus:outline-none"
                ref={inputRef}
              />
            </div>
            <ul className="max-h-60 overflow-y-auto text-wild-sand-600">
              <li>
                <button
                  className="w-full p-2 text-left hover:bg-gray-300/50 cursor-pointer"
                  onClick={(e) => handleSelect(e, "")}
                >
                  {defaultOption}
                </button>
              </li>
              {filteredOptions.map((option, idx) => (
                <li key={String(option.value) + "-" + idx}>
                  <button
                    className="w-full p-2 text-left hover:bg-gray-300/50 cursor-pointer"
                    onClick={(e) => handleSelect(e, option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
