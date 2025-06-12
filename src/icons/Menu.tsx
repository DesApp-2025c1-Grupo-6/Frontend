import React, { useState } from "react";

function Menu({ width = 40, height = 40, className = "" }) {
  const [open, setOpen] = useState(false);

  // Caminos para los dos estados
  const closedPath = "M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7";
  const openPath = "M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7";

  return (
    <svg
      className={`hb w-10 block ${className}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      stroke="#eee"
      strokeWidth=".6"
      fill="none"
      strokeLinecap="round"
      style={{ cursor: "pointer" }}
      onClick={() => setOpen((prev) => !prev)}
    >
      <path
        d={open ? openPath : closedPath}
        style={{
          transition: "d 0.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </svg>
  );
}

export default Menu;
