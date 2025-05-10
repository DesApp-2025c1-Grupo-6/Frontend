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
    <tr className="hover:bg-gray-200 transition-all border-b border-gray-300">
      {values.map((value, idx) => (
        <td key={idx} className="text-left px-5 py-3 truncate max-w-xs">
          {String(value)}
        </td>
      ))}

      {(viewButton || editButton || deleteButton) && (
        <td className="px-5 py-2 flex gap-5 justify-end">
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
