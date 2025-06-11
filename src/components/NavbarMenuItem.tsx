"use client";

import { usePathname } from "next/navigation";
import { NavbarMenuItemProps } from "../types";

const NavbarMenuItem = ({ item, open }: NavbarMenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  return (
    <a
      href={item.href}
      tabIndex={0}
      aria-label={item.name}
      className={`group relative flex items-center hover:bg-gray-300 gap-2 justify-start size-10 w-full rounded-xl p-1 focus:outline-none focus-visible:ring-2 focus:ring-0 focus-visible:ring-blue-500 active:ring-0 transition-all duration-300 ${
        isActive &&
        " before:content-[''] before:absolute before:-left-1 before:top-2 before:bottom-2 before:w-1 before:rounded before:bg-gray-400"
      }`}
    >
      <span className="transition-all duration-300 size-8 min-w-8 flex items-center justify-center">
        <item.icon className="size-10" />
      </span>
      <span
        className={`text-wild-sand-600 font-semibold text-sm transition-all duration-300 ${
          open
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 pointer-events-none"
        } whitespace-nowrap`}
        style={{
          width: "auto",
          overflow: "hidden",
        }}
      >
        {item.name}
      </span>
      {/* Tooltip solo visible cuando open es false */}
      {!open && (
        <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
          {item.name}
        </span>
      )}
    </a>
  );
};

export default NavbarMenuItem;
