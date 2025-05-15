import React from "react";

function SelectInput({
  id,
  label,
  options,
  onChange,
  ...props
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
}) {
  return (
    <select
      id={id}
      className="w-full flex gap-4 relative border-2 border-wild-sand-600 focus:border-wild-sand-600 active:border-wild-sand-600  text-wild-sand-600 rounded-lg p-2 justify-between"
      onChange={onChange}
      {...props}
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
