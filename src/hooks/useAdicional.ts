// Hook personalizado para manejar la lógica de adicionales
import { useState, useEffect, useCallback } from "react";
import { Adicional } from "@/src/types";
import {
  getAdicionales,
  createAdicional,
  updateAdicional,
  deleteAdicional,
} from "@/src/services/fetchDataAdicionales";

/**
 * Hook para gestionar adicionales: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useAdicional(onError?: (msg: string) => void) {
  // Estado para almacenar los adicionales
  const [data, setData] = useState<Adicional[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Adicional | undefined>();

  // Efecto para cargar los adicionales al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getAdicionales()
      .then((adicionales) => {
        const adicionalesSinCosto = adicionales.map(
          ({ costo_default, ...rest }) => ({
            ...rest,
            costo: costo_default,
          })
        );
        setData(adicionalesSinCosto);
      })
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  /**
   * Crea un nuevo adicional
   * @param tipo tipo del adicional
   * @param costo_default Costo por defecto del adicional
   */
  const handleCreateAdicional = useCallback(
    async (tipo: string, costo_default: string) => {
      try {
        const newAdicional = await createAdicional({ tipo, costo_default });
        setData((current) => [...current, newAdicional]);
        return { success: true, tipo, costo_default };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear el adicional: " +
              tipo +
              "con el costo  " +
              costo_default +
              ", Error: " +
              error
          );
        return { success: false, tipo, costo_default };
      }
    },
    [onError]
  );

  /**
   * Edita un adicional existente (usa el seleccionado)
   * @param tipo Nuevo tipo del adicional
   * @param costo_default Nuevo costo por defecto del adicional
   */
  const handleEditAdicional = useCallback(
    async (tipo: string, costo_default: string) => {
      if (!selectedRow) return { success: false, tipo, costo_default };
      try {
        const updated = await updateAdicional(selectedRow.id, {
          tipo,
          costo_default,
        });
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, tipo, costo_default };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar el adicional: " +
              tipo +
              "con el costo  " +
              costo_default +
              ", Error: " +
              error
          );
        return { success: false, tipo, costo_default };
      }
    },
    [selectedRow, onError]
  );

  /**
   * Elimina un adicional por id
   * @param id ID del adicional a eliminar
   */
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteAdicional(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo eliminar el adicional : " + id + ", Error: " + error
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
    handleCreateAdicional,
    handleEditAdicional,
    handleDelete,
  };
}
