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
      className={`fixed top-0 left-0 h-screen bg-gray-200 flex flex-col gap-16 items-center justify-start rounded-r-2xl shadow-md px-3 transition-all duration-300 z-50 ${
        open ? "w-52" : "w-16"
      }`}
    >
      <div className="flex items-center justify-center mt-5 w-full">
        <NavbarMenuButton open={open} toggleMenu={toggleMenu} />
      </div>
      <NavbarMenuItems open={open} />
    </nav>
  );
}

export default Navbar;
