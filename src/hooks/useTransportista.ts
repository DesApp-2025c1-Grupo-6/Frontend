// Hook personalizado para manejar la lógica de transportistas
import { useState, useEffect, useCallback } from "react";
import { Transportista } from "@/src/types";
import {
  getTransportistas,
  createTransportista,
  updateTransportista,
  deleteTransportista,
} from "@/src/services/fetchDataTransportistas";

/**
 * Hook para gestionar transportistas: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useTransportista(onError?: (msg: string) => void) {
  // Estado para almacenar los transportistas
  const [data, setData] = useState<Transportista[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Transportista | undefined>();

  // Efecto para cargar los transportistas al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getTransportistas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  /**
   * Crea un nuevo transportista
   * @param nombre Nombre del transportista
   */
  const handleCreateTransportista = useCallback(
    async (nombre: string) => {
      try {
        const newTransportista = await createTransportista({ nombre });
        setData((current) => [...current, newTransportista]);
        return { success: true, nombre };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear el transportista: " + nombre + ", Error: " + error
          );
        return { success: false, nombre };
      }
    },
    [onError]
  );

  /**
   * Edita un transportista existente (usa la seleccionada)
   * @param nombre Nuevo nombre del transportista
   */
  const handleEditTransportista = useCallback(
    async (nombre: string) => {
      if (!selectedRow) return { success: false, nombre };
      try {
        const updated = await updateTransportista(selectedRow.id, { nombre });
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, nombre };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar el transportista: " +
              nombre +
              ", Error: " +
              error
          );
        return { success: false, nombre };
      }
    },
    [selectedRow, onError]
  );

  /**
   * Elimina un transportista por id
   * @param id ID del transportista a eliminar
   */
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteTransportista(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo eliminar el transportista: " + id + ", Error: " + error
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
    handleCreateTransportista,
    handleEditTransportista,
    handleDelete,
  };
}
