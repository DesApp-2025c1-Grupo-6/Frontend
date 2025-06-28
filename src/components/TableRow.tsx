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
    <tr className="hover:bg-gray-100 transition-all border-b border-gray-300">
      {values.map((value, idx) => (
        <td
          key={idx}
          className="text-left px-2 py-2 text-sm break-words truncate max-w-[180px] sm:max-w-[240px]"
        >
          {String(value)}
        </td>
      ))}

      {(viewButton || editButton || deleteButton) && (
        <td className="px-2 py-2 flex justify-end items-center gap-3 w-24 sm:w-32 md:w-40">
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
