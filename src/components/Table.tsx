import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({ data }: { data: any }) {
  const headers = Object.keys(data[0]); // ["id", "name", "age", "email"]
  const rows = data.map((item: any) => Object.values(item)); // [[1, "John Doe", 30, ""], [1, "John Doe", 30, ""]]

  return (
    <table className="overflow-hidden w-full bg-wild-sand-100 shadow-md rounded-2xl  border-gray-300">
      <TableHeader data={headers} />
      <tbody className="p-3">
        {rows.map((row: unknown, index: number) => (
          <TableRow key={index} deleteButton editButton row={row} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
