import { NavbarMenuButtonProps } from "../types";

const closedPath = "M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7";
const openPath = "M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7";

const NavbarMenuButton = ({ open, toggleMenu }: NavbarMenuButtonProps) => (
  <button
    onClick={toggleMenu}
    aria-label={open ? "Cerrar menú lateral" : "Abrir menú lateral"}
    aria-expanded={open}
    className={`flex items-center justify-center size-10 p-1 right-0 top-0 rounded-xl cursor-pointer hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus:ring-0 focus-visible:ring-blue-500 transition-all duration-300`}
  >
    <span className="transition-all duration-300 size-10 flex items-center justify-center">
      <svg
        className="hb w-10 block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        stroke="#566173"
        strokeWidth=".6"
        fill="none"
        strokeLinecap="round"
        style={{ cursor: "pointer" }}
        onClick={() => toggleMenu()}
      >
        <path
          d={open ? openPath : closedPath}
          style={{
            transition: "d 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
    </span>
  </button>
);

export default NavbarMenuButton;
