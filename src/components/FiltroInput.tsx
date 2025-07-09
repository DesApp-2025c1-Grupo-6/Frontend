import React, { useEffect, useRef, useState } from "react";
import ArrowSelect from "../icons/ArrowSelect";
import SearchIcon from "../icons/SearchIcon";

function FiltroInput({
  label,
  onChange,
  value,
  data,
  defaultOption = "Todos",
  shouldValidate,
  errorMessage = "Este campo es obligatorio",
}: {
  label: string;
  onChange: (value: string) => void;
  value?: string;
  data?: any[];
  defaultOption?: string;
  shouldValidate?: boolean;
  errorMessage?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value || "");
  const [filteredData, setFilteredData] = useState(data || []);
  const [selectedValue, setSelectedValue] = useState<string>(value || "");
  const ref = useRef<HTMLDivElement>(null);

  // Usar useRef correctamente para el input
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((item) =>
          String(item).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [data, searchValue]);

  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      setSearchValue("");
    } else {
      setSelectedValue(value);
    }
  }, [value]);

  // Llamar a onChange solo cuando el usuario selecciona un valor
  const handleSelect = (item: string) => {
    setSelectedValue(item);
    setIsOpen(false);
    if (onChange) onChange(item);
  };

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="relative w-full" ref={ref}>
        <div className="flex flex-col w-full">
          <p className="text-gray-400 text-xs z-10 px-1 left-3 -top-2 absolute bg-gradient-to-t from-gray-chateau-100 from-70% to-transparent ">
            {label}
          </p>
          <div className="relative w-full flex flex-col justify-center items-center rounded-lg border-2 border-wild-sand-600 focus-within:border-wild-sand-600">
            <button
              className="text-wild-sand-600 p-2 text-left w-full flex justify-between items-center cursor-pointer focus:outline-none rounded-lg"
              onClick={handleClick}
            >
              <span className="truncate block">
                {!selectedValue ? defaultOption : selectedValue}
              </span>
              <ArrowSelect className={isOpen ? "rotate-180" : ""} />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute text-wild-sand-600 z-10 bg-gray-chateau-100 border border-gray-300 rounded-lg shadow-lg mt-1 w-full">
            <div className="p-2">
              <span className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none flex items-center">
                <SearchIcon className="text-gray-500 mr-2" />
                <input
                  autoComplete="off"
                  id="searchInput"
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={`Buscar ${label}`}
                  className="w-full rounded-lg focus:outline-none"
                  ref={inputRef}
                />
              </span>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              <li>
                <button
                  className="w-full p-2 text-left hover:bg-gray-300/50 cursor-pointer"
                  onClick={() => handleSelect("")}
                >
                  {defaultOption}
                </button>
              </li>
              {filteredData &&
                filteredData.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-300/50 cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </section>
      {shouldValidate && (
        <p className="font-semibold text-roman-500 text-xs ml-1 mt-1">
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default FiltroInput;
