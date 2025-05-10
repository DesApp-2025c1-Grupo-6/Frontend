import React from "react";

interface TableColumsProps {
  columns: string[];
}

function TableColumn({ columns }: TableColumsProps) {
  return (
    <tr>
      {columns.map((header: string, index: number) => (
        <th key={index} className="text-left px-3 py-3 ">
          {header}
        </th>
      ))}
    </tr>
  );
}

export default TableColumn;
