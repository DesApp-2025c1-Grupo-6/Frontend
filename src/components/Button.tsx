import React from "react";

function Button({
  text,
  onClick,
  Icon,
  line,
  color = "#566173",
  className = "",
}: {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Icon?: React.ElementType;
  line?: boolean;
  color?: string;
  className?: string;
}) {
  const baseStyles =
    " justify-center items-center cursor-pointer flex gap-1.5 py-2 px-2 lg:px-4 rounded-xl transition duration-200 ease-in-out ";
  const filledStyles = ` text-white `;
  const lineStyles = ` text-wild-sand-600 border border-2 `;

  const styles = `${baseStyles} ${line ? lineStyles : filledStyles}`;

  return (
    <button
      onClick={onClick}
      className={styles + " " + className}
      style={{
        backgroundColor: line ? "transparent" : color,
        color: line ? color : "white",
        borderColor: line ? color : "transparent",
      }}
    >
      {Icon && <Icon />}
      {text && text}
    </button>
  );
}

export default Button;
