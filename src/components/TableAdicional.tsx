import React from "react";

interface TableAdicionalProps {
  mode: "view" | "edit" | "create";
  data: any[];
  onDelete: (id: any) => void;
}

function TableAdicional({ mode, data, onDelete }: TableAdicionalProps) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-300 sticky top-0 z-10">
          <tr className="font-semibold text-sm">
            <th className="w-1/3 text-left px-5 py-3">Adicional</th>
            <th className="w-1/3 text-left px-5 py-3">Costo</th>
            {mode !== "view" && (
              <th className="w-1/3 text-center px-5 py-3 ">Acción</th>
            )}
          </tr>
        </thead>
      </table>
      <div style={{ maxHeight: "80px", overflowY: "auto" }}>
        <table className="w-full">
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id ?? index}
                className="hover:bg-gray-200 bg-gray-100 transition-all text-sm border-b border-gray-300"
              >
                <td className="w-1/3 px-5 py-3">{item.tipo}</td>
                <td className="w-1/3 px-5 py-3">
                  $
                  {item.costo_personalizado
                    ? item.costo_personalizado
                    : item.costo_default ?? item.costo}
                </td>
                {mode !== "view" && (
                  <td className="w-1/3 px-5 py-3 text-center">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-roman-500 cursor-pointer hover:bg-roman-700 font-medium text-gray-chateau-50 rounded-full px-4 py-0.5 text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableAdicional;
