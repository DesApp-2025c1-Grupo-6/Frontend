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
        return "Codigo";
      } else {
        return column;
      }
    }) || columns;
  return (
    <tr>
      {columns.map((header: string, index: number) => (
        <th key={index} className="text-left px-5 py-3 ">
          {capitalizeFirstLetter(header)}
        </th>
      ))}
      {hasActions && <th className="text-right px-5 py-3 max-w-3">Acciones</th>}
    </tr>
  );
}

export default TableColumn;
