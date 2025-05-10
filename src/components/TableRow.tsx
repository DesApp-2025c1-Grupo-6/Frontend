import React from "react";
import Eye from "../icons/Eye";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";

interface TableRowProps {
  row: any;
  viewButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (id: string | number) => void;
}

const TableRow = ({
  row,
  viewButton,
  editButton,
  deleteButton,
  onView,
  onEdit,
  onDelete,
}: TableRowProps) => {
  const values = Object.values(row);

  return (
    <tr className="hover:bg-gray-200 transition-all">
      {values.map((value, idx) => (
        <td key={idx} className="p-4 border-b border-gray-300">
          {String(value)}
        </td>
      ))}

      {(viewButton || editButton || deleteButton) && (
        <td className="p-4 border-b border-gray-300 space-x-2">
          {viewButton && (
            <button className="cursor-pointer" onClick={() => onView?.(row)}>
              <Eye />
            </button>
          )}
          {editButton && (
            <button className="cursor-pointer" onClick={() => onEdit?.(row)}>
              <Edit />
            </button>
          )}
          {deleteButton && (
            <button
              className="cursor-pointer"
              onClick={() => onDelete?.(row.id)}
            >
              <Trash />
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
