import React from "react";
import { capitalizeFirstLetter } from "../app/utils/utils";

interface TableColumnsProps {
  columns: string[];
  hasActions?: boolean;
}

function TableColumn({ columns, hasActions }: TableColumnsProps) {
  // Reemplaza "id" por "Código" para mejor legibilidad en encabezados
  const headers =
    columns.map((column: string) => (column === "id" ? "Código" : column)) ||
    columns;

  return (
    <tr>
      {headers.map((header: string, index: number) => (
        <th key={index} className="text-left px-5 py-3 ">
          {capitalizeFirstLetter(header)}
        </th>
      ))}
      {hasActions && (
        <th className="text-right px-5 py-3 max-w-3 break-words truncate w-24 sm:w-32 md:w-40">
          Acciones
        </th>
      )}
    </tr>
  );
}

export default TableColumn;
