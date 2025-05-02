import React from "react";

function Plus({
  height = "16",
  width = "16",
}: {
  height?: string;
  width?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_134_603)">
        <path
          d="M20 11.4286H11.4286V20H8.57143V11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286Z"
          fill="#F3F4F6"
        />
      </g>
      <defs>
        <clipPath id="clip0_134_603">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Plus;
