import NavbarMenuItem from "./NavbarMenuItem";
import { menuItems } from "../app/utils/utils";
import { NavbarMenuItemsProps } from "../types";

const NavbarMenuItems = ({ open }: NavbarMenuItemsProps) => (
  <div className="flex flex-col items-center justify-between h-1/2 w-full gap-4">
    {menuItems.map((item) => (
      <NavbarMenuItem key={item.name} item={item} open={open} />
    ))}
  </div>
);

export default NavbarMenuItems;
