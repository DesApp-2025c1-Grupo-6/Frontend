import React from "react";
interface TextInputProps {
  label?: string;
  placeholder?: string;
  Icon?: React.ReactNode;
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

function TextInput({
  label,
  placeholder,
  Icon,
  id,
  name,
  onChange,
  className,
  value,
  ...props
}: TextInputProps) {
  return (
    <div
      className={`relative w-full flex justify-center items-center rounded-lg p-2 border-2 border-wild-sand-600 focus:border-wild-sand-600 active:border-wild-sand-600 ${
        label ? "py-2" : "py-0"
      } ${className}`}
    >
      <p className=" text-wild-sand-600 z-10 px-1 left-7 -top-1 absolute bg-gradient-to-t from-gray-chateau-50 from-70% to-transparent ">
        {label}
      </p>
      {Icon && <span className=" text-wild-sand-600 z-10">{Icon}</span>}
      <input
        type="text"
        className="w-full flex gap-4 relative outline-0 text-wild-sand-600 p-2 justify-between"
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
}

export default TextInput;
