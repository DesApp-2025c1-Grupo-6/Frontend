import React from "react";
import { capitalizeFirstLetter } from "../app/utils/utils";

interface TableColumsProps {
  columns: string[];
  hasActions?: boolean;
}

function TableColumn({ columns, hasActions }: TableColumsProps) {
  const updatedColumns =
    columns.map((column: string) => {
      if (column === "id") {
        return "Codigo";
      } else {
        return column;
      }
    }) || columns;

  return (
    <tr className="rounded-t-2xl overflow-hidden">
      {updatedColumns.map((header: string, index: number) => (
        <th
          key={index}
          className={`text-left px-5 py-3 ${
            index === 0 ? "rounded-tl-2xl" : ""
          } ${
            index === updatedColumns.length - 1 && !hasActions
              ? "rounded-tr-2xl"
              : ""
          }`}
        >
          {capitalizeFirstLetter(header)}
        </th>
      ))}
      {hasActions && (
        <th className="text-right px-5 py-3 max-w-3 break-words truncate w-24 sm:w-32 md:w-40 rounded-tr-2xl">
          Acciones
        </th>
      )}
    </tr>
  );
}

export default TableColumn;
