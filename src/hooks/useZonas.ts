import { useState, useEffect, useCallback } from "react";
import { Zona } from "@/src/types";
import {
  getZonas,
  createZona,
  updateZona,
  deleteZona,
} from "@/src/services/fetchDataZonas";

export function useZonas(onError?: (msg: string) => void) {
  const [data, setData] = useState<Zona[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Zona | undefined>();

  useEffect(() => {
    setLoading(true);
    getZonas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  const handleCreateZone = useCallback(
    async (nombre: string) => {
      try {
        const newZona = await createZona({ nombre });
        setData((current) => [...current, newZona]);
        return { success: true, nombre };
      } catch (error) {
        if (onError)
          onError("No se pudo crear la zona: " + nombre + ", Error: " + error);
        return { success: false, nombre };
      }
    },
    [onError]
  );

  const handleEditZone = useCallback(
    async (nombre: string) => {
      if (!selectedRow) return { success: false, nombre };
      try {
        const updated = await updateZona(selectedRow.id, { nombre });
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, nombre };
      } catch (error) {
        if (onError)
          onError("No se pudo editar la zona: " + nombre + ", Error: " + error);
        return { success: false, nombre };
      }
    },
    [selectedRow, onError]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteZona(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError("No se pudo eliminar la zona: " + id + ", Error: " + error);
        return { success: false, id };
      }
    },
    [onError]
  );

  return {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateZone,
    handleEditZone,
    handleDelete,
  };
}
