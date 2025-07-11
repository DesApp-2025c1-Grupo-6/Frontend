// Hook personalizado para manejar la lógica de tarifas
import { useState, useEffect, useCallback } from "react";
import { Adicional, Tarifa } from "@/src/types";
import {
  getTarifas,
  createTarifa,
  updateTarifa,
  deleteTarifa,
} from "@/src/services/fetchDataTarifas";

/**
 * Hook para gestionar tarifas: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useTarifas(onError?: (msg: string) => void) {
  // Estado para almacenar las tarifas
  const [data, setData] = useState<Tarifa[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Tarifa | undefined>();

  // Efecto para cargar las tarifas al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getTarifas()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);
  /**
   * Crea una nueva tarifa
   * @param valores Datos de la tarifa
   */
  const handleCreateTarifa = useCallback(
    async (
      valor_base: string,
      zona: string,
      vehiculo: string,
      carga: string,
      transportista: string,
      adicionales: Adicional[]
    ) => {
      try {
        // Transformar los datos al formato esperado por el backend
        const payload = {
          valor_base: Number(valor_base),
          fecha: new Date().toISOString().split("T")[0],
          id_zona: Number(zona),
          id_vehiculo: Number(vehiculo),
          id_carga: Number(carga),
          id_transportista: Number(transportista),
          adicionales: adicionales.map((a) => {
            const obj: any = { id_adicional: Number(a.id) };
            if (a.costo_personalizado && a.costo_personalizado !== "") {
              obj.costo_personalizado = Number(a.costo_personalizado);
            }
            return obj;
          }),
        };
        const newTarifa = await createTarifa(payload);
        setData((current) => [...current, newTarifa]);
        return { success: true, valor_base };
      } catch (error) {
        if (onError) onError("No se pudo crear la tarifa. " + error);
        return { success: false, valor_base };
      }
    },
    [onError]
  );
  /**
   * Edita una tarifa existente (usa la seleccionada)
   * @param valores Nuevos datos de la tarifa
   */
  const handleEditTarifa = useCallback(
    async (
      valor_base: string,
      zona: string,
      vehiculo: string,
      carga: string,
      transportista: string,
      adicionales: Adicional[]
    ) => {
      if (!selectedRow) return { success: false, valor_base };
      try {
        const payload = {
          valor_base: Number(valor_base),
          fecha: new Date().toISOString().split("T")[0],
          id_zona: Number(zona),
          id_vehiculo: Number(vehiculo),
          id_carga: Number(carga),
          id_transportista: Number(transportista),
          adicionales: adicionales.map((a) => {
            const obj: any = { id_adicional: Number(a.id) };
            if (a.costo_personalizado && a.costo_personalizado !== "") {
              obj.costo_personalizado = Number(a.costo_personalizado);
            }
            return obj;
          }),
        };
        const updated = await updateTarifa(selectedRow.id, payload);
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, valor_base };
      } catch (error) {
        if (onError) onError("No se pudo editar la tarifa. " + error);
        return { success: false, valor_base };
      }
    },
    [selectedRow, onError]
  );

  /**
   * Elimina una tarifa por id
   * @param id ID de la tarifa a eliminar
   */
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteTarifa(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError("No se pudo eliminar la tarifa: " + id + ", Error: " + error);
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
    handleCreateTarifa,
    handleEditTarifa,
    handleDelete,
  };
}
