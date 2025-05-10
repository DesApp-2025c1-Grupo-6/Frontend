import React from "react";
import TableColumn from "./TableColumn";
import TableRow from "./TableRow";
import { log } from "console";

interface TableProps {
  data: any[];
  viewButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (id: string | number) => void;
}

function Table({
  data,
  viewButton,
  editButton,
  deleteButton,
  onView,
  onEdit,
  onDelete,
}: TableProps) {
  const baseColumns = Object.keys(data[0]);
  const hasActions = viewButton || editButton || deleteButton;
  const columns = hasActions ? [...baseColumns, "Acciones"] : baseColumns;

  return (
    <table className="overflow-hidden w-full bg-wild-sand-100 shadow-md rounded-2xl border-gray-300">
      {/* columns */}
      <thead className="bg-gray-300 rounded-2xl">
        <TableColumn columns={columns} />
      </thead>

      {/* Rows */}
      <tbody className="p-3">
        {data.map((row, index) => (
          <TableRow
            key={index}
            row={row}
            viewButton={viewButton}
            editButton={editButton}
            deleteButton={deleteButton}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
