import React from "react";
import { capitalizeFirstLetter } from "../app/utils/utils";

interface TableColumsProps {
  columns: string[];
  hasActions?: boolean;
}

function TableColumn({ columns, hasActions }: TableColumsProps) {
  columns =
    columns.map((column: string) => {
      if (column === "id") {
        return "Código";
      } else {
        return column;
      }
    }) || columns;

  return (
    <tr>
      {columns.map((header: string, index: number) => (
        <th
          key={index}
          className="text-left px-2 py-2 text-sm font-semibold break-words truncate"
        >
          {capitalizeFirstLetter(header)}
        </th>
      ))}
      {hasActions && (
        <th className="text-right px-2 py-2 text-sm font-semibold break-words truncate w-24 sm:w-32 md:w-40">
          Acciones
        </th>
      )}
    </tr>
  );
}

export default TableColumn;
