import React, { useRef } from "react";
import Calendar from "../icons/Calendar";
import { DateInputProps } from "../types";

function DateInput({
  onChange,
  required,
  shouldValidate,
  errorMessage = "Este campo es obligatorio",
  value,
}: DateInputProps & { value?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Al hacer click en el contenedor, enfoca el input (abre el calendario)
  const handleContainerClick = () => {
    if (inputRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      inputRef.current.showPicker
        ? inputRef.current.showPicker()
        : inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full flex gap-4 relative border-2 border-wild-sand-600 rounded-lg p-2 justify-between cursor-pointer"
        onClick={handleContainerClick}
      >
        <input
          ref={inputRef}
          className="form-date__input text-wild-sand-600 w-full bg-transparent focus:outline-none appearance-none"
          type="date"
          required={required}
          id="input-date"
          onChange={onChange}
          value={value}
          style={{ colorScheme: "light" }}
        />
        {/* Ícono custom, puedes cambiar el color aquí */}
        <Calendar />
        {/* Oculta el ícono nativo en Chrome/Webkit */}
        <style>{`
          input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0;
            display: none;
          }
        `}</style>
      </div>
      {shouldValidate && (
        <p className="font-semibold text-roman-500 text-xs ml-1 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default DateInput;
