import { useEffect, useState } from "react";
import {
  getTarifasHistorial,
  getTarifaHistorial,
} from "@/src/services/fetchDataHistorial";
import { HistorialTarifa } from "@/src/types";
/**
 * Hook para manejar el historial de tarifas.
 * Permite obtener el historial de tarifas, ya sea para un ID específico o para todas las tarifas.
 * También maneja el estado de carga, error y la fila seleccionada.
 *
 * @param {string} id - ID de la tarifa específica para obtener su historial. Si no se proporciona, se obtienen todas las tarifas.
 * @returns {Object} Objeto con los datos del historial, estado de carga, error y fila seleccionada.
 */
export const useHistorial = (id?: string) => {
  const [data, setData] = useState<HistorialTarifa[] | HistorialTarifa | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        if (id !== undefined) {
          const result = await getTarifaHistorial(String(id));
          setData(result);
        } else {
          const result = await getTarifasHistorial();
          setData(result);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al obtener historial";
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Procesar datos para la tabla
  const tableData = data
    ? (() => {
        const historialArray = Array.isArray(data) ? data : [data];

        return historialArray.map(({ id, data, fecha, accion }) => {
          accion =
            '<span class="badge badge-' + accion + '">' + accion + "</span>";
          return {
            id: id,
            tarifa: data.id,
            zona: data.zona,
            carga: data.carga,
            vehiculo: data.vehiculo,
            transportista: data.transportista,
            fecha: fecha,
            "ultima accion": accion,
          };
        });
      })()
    : [];

  return {
    data,
    tableData,
    loading,
    error,
  };
};

export default useHistorial;
