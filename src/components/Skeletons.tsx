import React from "react";

interface SkeletonsProps {
  columns: number;
  rows?: number;
}

function getRandomWidth() {
  // Devuelve un porcentaje entre 40% y 90%
  return `${Math.floor(Math.random() * 50) + 40}%`;
}

const Skeletons = ({ columns, rows = 5 }: SkeletonsProps) => {
  return (
    <table className="overflow-hidden w-full bg-wild-sand-100 shadow-md rounded-2xl border-gray-300">
      <thead className="bg-gray-300 rounded-2xl">
        <tr>
          {Array.from({ length: columns }).map((_, idx) => (
            <th key={idx} className="px-3 py-3">
              <div
                className="h-4 bg-gray-400/60 animate-pulse rounded"
                style={{ width: getRandomWidth() }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="p-4 border-b border-gray-300">
                <div
                  className="h-4 bg-gray-400/60 animate-pulse rounded"
                  style={{ width: getRandomWidth() }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Skeletons;
