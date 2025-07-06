import { useEffect, useState } from "react";
import { AreaData } from "lightweight-charts";
import { getdataDashboard } from "@/src/services/fetchDataDashboard";

/**
 * Hook para obtener los datos del dashboard (histórico de una tarifa).
 * @param {string} id - ID de la tarifa para obtener su histórico.
 * @returns {Object} Objeto con los datos, estado de carga y error.
 */
export const useDashboard = (id: string) => {
  const [data, setData] = useState<AreaData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idTarifa, setIdTarifa] = useState(id);

  useEffect(() => {
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await getdataDashboard(id);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error al obtener datos del dashboard";
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idTarifa]);

  return {
    setIdTarifa,
    data,
    loading,
    error,
  };
};

export default useDashboard;
