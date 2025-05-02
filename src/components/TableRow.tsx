import { tableActions } from "../app/utils/utils";

function TableRow({
  row,
  key,
  viewButton,
  editButton,
  deleteButton,
}: {
  row: any;
  key: number;
  viewButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
}) {
  return (
    <tr
      key={key}
      className="border-b border-gray-200 hover:bg-gray-200 transition duration-200 ease-in-out"
    >
      {row.map((value: string) => (
        <td className="px-3 py-4 text-left">{value}</td>
      ))}
      <td className="flex gap-2 justify-center items-center p-4">
        {viewButton && (
          <button
            className="cursor-pointer"
            onClick={tableActions.view.onClick}
          >
            <tableActions.view.Icon />
          </button>
        )}
        {editButton && (
          <button
            className="cursor-pointer"
            onClick={tableActions.edit.onClick}
          >
            <tableActions.edit.Icon />
          </button>
        )}
        {deleteButton && (
          <button
            className="cursor-pointer"
            onClick={tableActions.delete.onClick}
          >
            <tableActions.delete.Icon />
          </button>
        )}
      </td>
    </tr>
  );
}

export default TableRow;
