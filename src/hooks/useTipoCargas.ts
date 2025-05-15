import { useState, useEffect, useCallback } from "react";
import { TipoCarga } from "@/src/types";
import {
  getTipoCargas,
  createTipoCarga,
  updateTipoCarga,
  deleteTipoCarga,
} from "@/src/services/fetchDataTipoCargas";

/**
 * Hook para gestionar TipoCargas: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useTipoCargas(onError?: (msg: string) => void) {
  const [data, setData] = useState<TipoCarga[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TipoCarga | undefined>();

  useEffect(() => {
    setLoading(true);
    getTipoCargas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  const handleCreateTipoCarga = useCallback(
    async (descripcion: string) => {
      try {
        const newTipoCarga = await createTipoCarga({ descripcion });
        setData((current) => [...current, newTipoCarga]);
        return { success: true, descripcion };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear el Tipo de Carga: " +
              descripcion +
              ", Error: " +
              error
          );
        return { success: false, descripcion };
      }
    },
    [onError]
  );

  const handleEditTipoCarga = useCallback(
    async (descripcion: string) => {
      if (!selectedRow) return { success: false, descripcion };
      try {
        const updated = await updateTipoCarga(selectedRow.id, { descripcion });
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, descripcion };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar el Tipo de Carga: " +
              descripcion +
              ", Error: " +
              error
          );
        return { success: false, descripcion };
      }
    },
    [selectedRow, onError]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteTipoCarga(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo eliminar el Tipo de Carga: " + id + ", Error: " + error
          );
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
    handleCreateTipoCarga,
    handleEditTipoCarga,
    handleDelete,
  };
}
