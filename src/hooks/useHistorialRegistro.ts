import { getRegistroHistorial } from "@/src/services/fetchDataHistorial";
import { useEffect, useState } from "react";
import { HistorialTarifa } from "../types";
import {
  extraerDiferencias,
  DiferenciaSection,
} from "@/src/utils/historialDiferencias";

export const useHistorialRegistro = (historialId: string) => {
  const [registro, setRegistro] = useState<HistorialTarifa | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diferencias, setDiferencias] = useState<DiferenciaSection[]>([]);

  useEffect(() => {
    const fetchRegistro = async () => {
      setLoading(true);
      try {
        const result = await getRegistroHistorial(historialId);
        setRegistro(result);

        // Extraer diferencias automáticamente
        if (result) {
          const diffs = extraerDiferencias(result);
          setDiferencias(diffs);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
        setRegistro(null);
        setDiferencias([]);
      } finally {
        setLoading(false);
      }
    };

    if (historialId) fetchRegistro();
  }, [historialId]);

  return { registro, loading, error, diferencias };
};
