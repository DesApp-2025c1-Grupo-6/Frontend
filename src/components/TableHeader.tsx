import React from "react";

function TableHeader({ data }: { data: any }) {
  return (
    <thead className="bg-gray-100 rounded-2xl">
      <tr>
        {data.map((header: string, index: number) => (
          <th key={index} className="text-left px-3 py-3 ">
            {header}
          </th>
        ))}
        <th>Acciones</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
