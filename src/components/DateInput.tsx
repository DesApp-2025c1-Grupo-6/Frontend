import Calendar from "../icons/Calendar";
import { DateInputProps } from "../types";

function DateInput({ onChange, required }: DateInputProps) {
  return (
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
  );
}

export default DateInput;
