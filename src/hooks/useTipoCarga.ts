// Hook personalizado para manejar la lógica de tipoCarga
import { useState, useEffect, useCallback } from "react";
import { tipoCarga } from "@/src/types";
import {
  getTipoCargas,
  createTipoCarga,
  updateTipoCarga,
  deleteTipoCarga,
} from "@/src/services/fetchDataTipoCarga";
import { describe } from "node:test";

/**
 * Hook para gestionar TipoCarga: creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useTipoCarga(onError?: (msg: string) => void) {
  // Estado para almacenar los tipos de carga
  const [data, setData] = useState<tipoCarga[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<tipoCarga | undefined>();

  // Efecto para cargar los tipos de carga al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getTipoCargas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  /**
   * Crea un nuevo tipo de carga
   * @param Descripcion del tipo de carga
   */
  const handleCreateTipoCarga = useCallback(
    async (Descripcion: string) => {
      try {
        const newTipoCarga = await createTipoCarga({ Descripcion });
        setData((current) => [...current, newTipoCarga]);
        return { success: true, Descripcion };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear el tipo de carga: " +
              Descripcion +
              ", Error: " +
              error
          );
        return { success: false, Descripcion };
      }
    },
    [onError]
  );

  /**
   * Edita un tipo de carga existente (usa la seleccionada)
   * @param Descripcion Nueva descripcion del tipo de carga
   */
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
            "No se pudo editar el tipo de carga: " +
              descripcion +
              ", Error: " +
              error
          );
        return { success: false, descripcion };
      }
    },
    [selectedRow, onError]
  );

  /**
   * Elimina un tipo de carga por id
   * @param id ID del tipo de carga a eliminar
   */
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteTipoCarga(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo eliminar el tipo de carga: " + id + ", Error: " + error
          );
        return { success: false, id };
      }
    },
    [onError]
  );

  // Retorna los estados y handlers principales para usar en el componente
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
