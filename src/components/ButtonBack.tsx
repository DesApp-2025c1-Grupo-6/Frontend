import React from "react";
import ArrowBack from "../icons/ArrowBack";

function ButtonBack({ href }: { href: string }) {
  return (
    <a
      className="rounded-full shadow p-4 absolute bg-gray-chateau-100"
      href={href}
    >
      <ArrowBack />
    </a>
  );
}

export default ButtonBack;
