// Hook personalizado para manejar la lógica de zonas
import { useState, useEffect, useCallback } from "react";
import { Zona } from "@/src/types";
import {
  getZonas,
  createZona,
  updateZona,
  deleteZona,
} from "@/src/services/fetchDataZonas";

/**
 * Hook para gestionar zonas: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useZonas(onError?: (msg: string) => void) {
  // Estado para almacenar las zonas
  const [data, setData] = useState<Zona[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Zona | undefined>();

  // Efecto para cargar las zonas al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getZonas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  /**
   * Crea una nueva zona
   * @param nombre Nombre de la zona
   */
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

  /**
   * Edita una zona existente (usa la seleccionada)
   * @param nombre Nuevo nombre de la zona
   */
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

  /**
   * Elimina una zona por id
   * @param id ID de la zona a eliminar
   */
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

  // Retorna los estados y handlers principales para usar en el componente
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
