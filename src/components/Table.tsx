import { useMemo, useState } from "react";
import { TableProps } from "../types";
import TableColumn from "./TableColumn";
import TableRow from "./TableRow";

function Table({
  data,
  viewButton,
  editButton,
  deleteButton,
  onView,
  onEdit,
  onDelete,
  rowsPerPage = 10,
}: TableProps) {
  const columns = useMemo(
    () => (data.length ? Object.keys(data[0]) : []),
    [data]
  );
  const hasActions = viewButton || editButton || deleteButton;
  const isEmpty = data.length === 0;

  const [page, setPage] = useState(1);
  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalRows);
  const paginatedData = useMemo(
    () => data.slice(startIdx, endIdx),
    [data, startIdx, endIdx]
  );
  console.log("paginatedData", paginatedData);

  return (
    <div>
      <table className="overflow-hidden w-full bg-wild-sand-100 shadow-md rounded-2xl border-gray-300">
        <thead className="bg-gray-300 rounded-2xl">
          {isEmpty ? (
            <tr>
              <th className="px-3 py-4"></th>
            </tr>
          ) : (
            <TableColumn columns={columns} hasActions={hasActions} />
          )}
        </thead>
        <tbody className="p-3">
          {isEmpty ? (
            <tr>
              <td
                className="text-center p-2 text-sm font-semibold text-gray-500"
                colSpan={columns.length}
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow
                key={row.id ?? index}
                row={row}
                viewButton={viewButton}
                editButton={editButton}
                deleteButton={deleteButton}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Controles de paginación */}
      {!isEmpty && (
        <div className="flex flex-col items-center mt-4 gap-2">
          <span className="text-gray-600 text-base">
            Mostrando <b>{totalRows === 0 ? 0 : startIdx + 1}</b>-
            <b>{endIdx}</b> de <b>{totalRows}</b> resultados
          </span>
          <div className="flex shadow-md rounded-full">
            <button
              className="rounded-l-full px-6 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className="rounded-r-full px-6 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
