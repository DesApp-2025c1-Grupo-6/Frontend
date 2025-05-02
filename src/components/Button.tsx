import React from "react";

function Button({
  text,
  onClick,
  Icon,
}: {
  text: string;
  onClick?: () => void;
  Icon?: React.ElementType;
}) {
  return (
    <button
      onClick={onClick}
      className="justify-center items-center cursor-pointer flex gap-1.5 text-white py-2 px-4 rounded-xl bg-[#566173] hover:bg-[#47505c] active:bg-[#373e47] transition duration-200 ease-in-out"
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
