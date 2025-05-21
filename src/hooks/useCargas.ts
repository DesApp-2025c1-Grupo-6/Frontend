// Hook personalizado para manejar la lógica de Cargas
import {
  createCarga,
  deleteCarga,
  getCargas,
  updateCarga,
} from "@/src/services/fetchDataCargas";
import { Carga } from "@/src/types";
import { useCallback, useEffect, useState } from "react";
import { useTipoCargas } from "./useTipoCargas";

/**
 * Hook para gestionar Cargas: carga, creación, edición, eliminación y selección.
 * @param onError Callback opcional para manejar errores (por ejemplo, mostrar un toast)
 */
export function useCargas(onError?: (msg: string) => void) {
  // Estado para almacenar las Cargas
  const [data, setData] = useState<Carga[]>([]);
  // Estado para mostrar el loader
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Carga | undefined>();

  const {} = useTipoCargas(onError);

  // Función para normalizar los datos de cargas
  function normalizeCargas(rawData: any[]): Carga[] {
    return rawData.map((item: any) => {
      const { id_tipo_carga, tipoCarga, requisitos_especiales, ...rest } = item;
      const { descripcion } = tipoCarga;
      return {
        ...rest,
        tipo: descripcion,
        requisitos: requisitos_especiales,
      };
    });
  }

  // Función auxiliar para cargar y normalizar datos de cargas
  async function fetchAndSetCargas() {
    setLoading(true);
    try {
      const rawCargas = await getCargas();
      const cargasNormalizadas = normalizeCargas(rawCargas);
      setData(cargasNormalizadas);
    } catch (error) {
      if (onError) onError("No se pudieron cargar los datos: " + error);
    } finally {
      setLoading(false);
    }
  }

  // Efecto para cargar las Cargas al montar el componente o cambiar onError
  useEffect(() => {
    fetchAndSetCargas();
  }, [onError]);

  // Handler para crear una nueva carga
  const handleCreateCarga = useCallback(
    async (cargaNueva: Carga) => {
      try {
        // Intentar crear la nueva carga
        await createCarga(cargaNueva);
        // Refrescar la lista de cargas
        await fetchAndSetCargas();
        return { success: true };
      } catch (error) {
        // Manejo de error con mensaje claro
        if (onError)
          onError(
            "No se pudo crear la Carga: " +
              JSON.stringify(cargaNueva) +
              ", Error: " +
              error
          );
        return { success: false };
      }
    },
    [onError]
  );

  // Handler para editar una carga existente
  const handleEditCarga = useCallback(
    async (id: string | number, data: Carga) => {
      try {
        await updateCarga(id, data);
        await fetchAndSetCargas();
        return { success: true };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar la Carga: " +
              JSON.stringify(data) +
              ", Error: " +
              error
          );
        return { success: false };
      }
    },
    [onError]
  );

  // Handler para eliminar una carga
  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteCarga(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true };
      } catch (error) {
        if (onError)
          onError("No se pudo eliminar la Carga: " + id + ", Error: " + error);
        return { success: false };
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
