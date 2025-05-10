import Calendar from "../icons/Calendar";

function DateInput({
  onChange,
}: {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex gap-4 relative border-2 border-wild-sand-600 rounded-lg p-2 justify-between">
      <input
        className="form-date__input text-wild-sand-600 "
        type="date"
        id="input-date"
        onChange={onChange}
      />
      <Calendar />
    </div>
  );
}

export default DateInput;
