"use client";

import { useState } from "react";
import NavbarMenuButton from "../../components/NavbarMenuButton";
import NavbarMenuItems from "../../components/NavbarMenuItems";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav
      role="navigation"
      aria-label="Barra lateral de navegación"
      style={{}}
      className={`bg-gray-200 relative flex flex-col gap-32 h-full items-center justify-center rounded-r-2xl shadow-md px-3 transition-all duration-300 ${
        open ? "w-52" : "w-16"
      }`}
    >
      <div className="flex absolute top-0 items-center justify-center mt-5 p-2 w-full mr-6">
        <NavbarMenuButton open={open} toggleMenu={toggleMenu} />
      </div>
      <NavbarMenuItems open={open} />
    </nav>
  );
}

export default Navbar;
