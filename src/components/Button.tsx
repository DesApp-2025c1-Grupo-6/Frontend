import React from "react";

function Button({
  text,
  onClick,
  Icon,
  line,
  color = "#566173",
}: {
  text: string;
  onClick?: () => void;
  Icon?: React.ElementType;
  line?: boolean;
  color?: string;
}) {
  const baseStyles =
    "justify-center items-center cursor-pointer flex gap-1.5 py-2 px-4 rounded-xl transition duration-200 ease-in-out";
  const filledStyles = `text-white `;
  const lineStyles = `text-wild-sand-600 border border-2`;

  const className = `${baseStyles} ${line ? lineStyles : filledStyles}`;

  return (
    <button
      onClick={onClick}
      className={"min-w-24 " + className}
      style={{
        backgroundColor: line ? "transparent" : color,
        color: line ? color : "white",
        borderColor: line ? color : "transparent",
      }}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
