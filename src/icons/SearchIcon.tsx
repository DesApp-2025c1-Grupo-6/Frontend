import React from "react";

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99742 10.8458C8.96319 11.6919 7.64125 12.1996 6.20073 12.1996C2.88713 12.1996 0.200928 9.51341 0.200928 6.19981C0.200928 2.88621 2.88713 0.200012 6.20073 0.200012C9.51432 0.200012 12.2005 2.88621 12.2005 6.19981C12.2005 7.6407 11.6926 8.96297 10.846 9.99731L14.8475 13.9987L13.9989 14.8473L9.99742 10.8458ZM1.40093 6.19981C1.40093 8.85067 3.54987 10.9996 6.20073 10.9996C8.85158 10.9996 11.0005 8.85067 11.0005 6.19981C11.0005 3.54896 8.85158 1.40001 6.20073 1.40001C3.54987 1.40001 1.40093 3.54896 1.40093 6.19981Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default SearchIcon;
