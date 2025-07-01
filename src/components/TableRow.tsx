import React from "react";
import Eye from "../icons/Eye";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";

interface TableRowProps {
  row: any;
  viewButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (id: string | number) => void;
  isMobile?: boolean; // nuevo prop para detectar modo móvil
  columns?: string[]; // columnas para etiquetas en móvil
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const TableRow = ({
  row,
  viewButton,
  editButton,
  deleteButton,
  onView,
  onEdit,
  onDelete,
  isMobile = false,
  columns = [],
}: TableRowProps) => {
  if (isMobile) {
    return (
      <div className=" bg-gray-chateau-50  border border-gray-300 rounded-lg p-4 mb-4 shadow-lg text-gray-500 mr-2">
        {columns
          .filter((col) => col !== "id")
          .map((col) => (
            <div key={col} className="mb-2">
              <span className="text-xs font-semibold text-gray-500 block">
                {capitalizeFirstLetter(col === "id" ? "Código" : col)}
              </span>
              <span className="text-sm text-gray-800">{row[col]}</span>
            </div>
          ))}

        {(viewButton || editButton || deleteButton) && (
          <div className="flex justify-end gap-3 mt-3">
            {viewButton && (
              <button
                onClick={() => onView?.(row)}
                className="text-blue-600"
                aria-label="Ver"
              >
                <Eye />
              </button>
            )}
            {editButton && (
              <button
                onClick={() => onEdit?.(row)}
                className="text-yellow-600"
                aria-label="Editar"
              >
                <Edit />
              </button>
            )}
            {deleteButton && (
              <button
                onClick={() => onDelete?.(row.id)}
                className="text-red-600"
                aria-label="Eliminar"
              >
                <Trash />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Renderizado en tabla normal (desktop)
  const values = Object.values(row);

  return (
    <tr className="hover:bg-gray-100 transition-all border-b border-gray-300 rounded-2xl">
      {values.map((value, idx) => (
        <td
          key={idx}
          className="text-left px-2 py-2 text-sm break-words truncate max-w-[180px] sm:max-w-[240px]"
        >
          {String(value)}
        </td>
      ))}

      {(viewButton || editButton || deleteButton) && (
        <td className="px-2 py-2 flex justify-end items-center gap-3 w-24 sm:w-32 md:w-40">
          {viewButton && (
            <button
              className="cursor-pointer"
              onClick={() => onView?.(row)}
              aria-label="Ver"
            >
              <Eye />
            </button>
          )}
          {editButton && (
            <button
              className="cursor-pointer"
              onClick={() => onEdit?.(row)}
              aria-label="Editar"
            >
              <Edit />
            </button>
          )}
          {deleteButton && (
            <button
              className="cursor-pointer"
              onClick={() => onDelete?.(row.id)}
              aria-label="Eliminar"
            >
              <Trash />
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
