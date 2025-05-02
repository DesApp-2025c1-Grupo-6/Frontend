import Edit from "@/src/icons/Edit";
import Eye from "@/src/icons/Eye";
import Trash from "@/src/icons/Trash";
import { TableAction } from "@/src/types";

export const tableActions = {
  edit: {
    name: "Editar",
    Icon: Edit,
    onClick: () => {
      console.log("Edit action clicked");
    },
  },
  delete: {
    name: "Eliminar",
    Icon: Trash,
    onClick: () => {
      console.log("Delete action clicked");
    },
  },
  view: {
    name: "Ver",
    Icon: Eye,
    onClick: () => {
      console.log("View action clicked");
    },
  },
};
