// Hook personalizado para manejar la lógica de vehiculos
import { useState, useEffect, useCallback } from "react";
import { Vehiculo } from "@/src/types";
import {
  getVehiculos,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "@/services/fetchDataVehiculos";

/**
 * Hook para gestionar vehiculos: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useVehiculos(onError?: (msg: string) => void) {
  // Estado para almacenar los vehiculos
  const [data, setData] = useState<Vehiculo[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Vehiculo | undefined>();

  // Efecto para cargar los vehiculos al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getVehiculos()
      .then(setData)
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  /**
   * Crea un nuevo vehiculo
   * @param vehiculo Objeto con tipo y toneladas
   */
  const handleCreateVehiculo = useCallback(
    async ({
      tipo,
      toneladas,
    }: {
      tipo: string;
      toneladas: string | number;
    }) => {
      try {
        const newVehiculo = await createVehiculo({
          tipo,
          toneladas: Number(toneladas),
        });
        setData((current) => [...current, newVehiculo]);
        return { success: true, vehiculo: newVehiculo };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear el vehiculo: " + tipo + ", Error: " + error
          );
        return { success: false, vehiculo: { tipo, toneladas } };
      }
    },
    [onError]
  );

  /**
   * Edita un vehiculo existente (usa el seleccionado)
   * @param vehiculo Objeto con tipo y toneladas
   */
  const handleEditVehiculo = useCallback(
    async ({
      tipo,
      toneladas,
    }: {
      tipo: string;
      toneladas: string | number;
    }) => {
      if (!selectedRow)
        return { success: false, vehiculo: { tipo, toneladas } };
      try {
        const updated = await updateVehiculo(selectedRow.id, {
          tipo,
          toneladas: Number(toneladas),
        });
        setData((prev) =>
          prev.map((row) =>
            row.id === selectedRow.id && updated ? updated : row
          )
        );
        return { success: true, vehiculo: updated };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar el vehiculo: " + tipo + ", Error: " + error
          );
        return { success: false, vehiculo: { tipo, toneladas } };
      }
    },
    [selectedRow, onError]
  );

  /**
   * Elimina un vehiculo por id
   * @param id ID del vehiculo a eliminar
   */
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteVehiculo(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo eliminar el vehiculo: " + id + ", Error: " + error
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
    handleCreateVehiculo,
    handleEditVehiculo,
    handleDelete,
  };
}
