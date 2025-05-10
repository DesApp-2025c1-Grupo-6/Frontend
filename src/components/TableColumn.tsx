import React from "react";

interface TableColumsProps {
  columns: string[];
  hasActions?: boolean;
}

function TableColumn({ columns, hasActions }: TableColumsProps) {
  return (
    <tr>
      {columns.map((header: string, index: number) => (
        <th key={index} className="text-left px-5 py-3 ">
          {header}
        </th>
      ))}
      {hasActions && <th className="text-right px-5 py-3 max-w-3">Acciones</th>}
    </tr>
  );
}

export default TableColumn;
