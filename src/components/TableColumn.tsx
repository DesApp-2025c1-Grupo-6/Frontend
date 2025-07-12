import React from "react";
import { capitalizeFirstLetter } from "../app/utils/utils";

interface TableColumsProps {
  columns: string[];
  hasActions?: boolean;
  defaultColumnName?: string;
}

function TableColumn({
  columns,
  hasActions,
  defaultColumnName,
}: TableColumsProps) {
  const updatedColumns =
    columns.map((column: string) => {
      if (column === "id") {
        return "Codigo";
      } else if (column === "costo_default") {
        return "Costo";
      } else {
        return column;
      }
    }) || columns;

  return (
    <tr className="rounded-t-2xl overflow-hidden w-full">
      {updatedColumns.map((header: string, index: number) => (
        <th
          key={index}
          className={`text-left px-5 py-3 w-full ${
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
        <th className="text-right px-5 py-3 max-w-3 break-words truncate w-full rounded-tr-2xl">
          {defaultColumnName}
        </th>
      )}
    </tr>
  );
}

export default TableColumn;
