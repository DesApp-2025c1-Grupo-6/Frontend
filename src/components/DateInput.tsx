import Calendar from "../icons/Calendar";
import { DateInputProps } from "../types";

function DateInput({
  onChange,
  required,
  shouldValidate,
  errorMessage = "Este campo es obligatorio",
}: DateInputProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex gap-4 relative border-2 border-wild-sand-600 rounded-lg p-2 justify-between">
        <input
          className="form-date__input text-wild-sand-600 "
          type="date"
          required={required}
          id="input-date"
          onChange={onChange}
        />
        <Calendar />
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
