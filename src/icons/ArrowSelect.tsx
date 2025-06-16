import React from "react";

export default function ArrowSelect({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M5.2018 6.75609L9.99743 11.5517L14.7981 6.7511L15.6466 7.59963L9.99743 13.2488L4.35327 7.60462L5.2018 6.75609Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
