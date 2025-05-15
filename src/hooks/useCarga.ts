// Hook personalizado para manejar la lógica de carga
import { useState, useEffect, useCallback } from "react";
import { Carga, tipoCarga } from "@/src/types";
import {
  getCargas,
  createCarga,
  updateCarga,
  deleteCarga,
} from "@/src/services/fetchDataCargas";

/**
 * Hook para gestionar carga: creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useCarga(onError?: (msg: string) => void) {
  // Estado para almacenar las cargas
  const [data, setData] = useState<Carga[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Carga | undefined>();

  // Efecto para cargar las zonas al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getCargas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  /**
   * Crea una nueva carga
   * @param peso peso de la carga
   * @param volumen Volumen de la carga
   * @param tipoCarga tipo de la carga
   */
  const handleCreateCarga = useCallback(
    async (peso: string, volumen: string, tipoCarga: tipoCarga) => {
      try {
        const newCarga = await createCarga({ peso, volumen, tipoCarga });
        setData((current) => [...current, newCarga]);
        return { success: true, peso, volumen, tipoCarga };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear la carga: " +
              peso +
              volumen +
              tipoCarga +
              ", Error: " +
              error
          );
        return { success: false, peso, volumen, tipoCarga };
      }
    },
    [onError]
  );

  /**
   * Edita una carga existente (usa la seleccionada)
   * @param peso nuevo peso de la carga
   * @param volumen nuevo Volumen de la carga
   * @param tipoCarga nuevo tipo de la carga
   */
  const handleEditCarga = useCallback(
    async (peso: string, volumen: string, tipoCarga: tipoCarga) => {
      if (!selectedRow) return { success: false, peso, volumen, tipoCarga };
      try {
        const updated = await updateCarga(selectedRow.id, {
          peso,
          volumen,
          tipoCarga,
        });
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, peso, volumen, tipoCarga };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar la zona: " +
              peso +
              volumen +
              tipoCarga +
              +", Error: " +
              error
          );
        return { success: false, peso, volumen, tipoCarga };
      }
    },
    [selectedRow, onError]
  );

  /**
   * Elimina una carga por id
   * @param id ID de la carga a eliminar
   */
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteCarga(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError("No se pudo eliminar la carga: " + id + ", Error: " + error);
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
    handleCreateCarga,
    handleEditCarga,
    handleDelete,
  };
}
