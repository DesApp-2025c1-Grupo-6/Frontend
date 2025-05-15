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

  // Efecto para cargar las Cargas al montar el componente o cambiar onError
  useEffect(() => {
    setLoading(true);
    getCargas()
      .then((data) => {
        data = data.map((item: any) => {
          const { id_tipo_carga, tipoCarga, requisitos_especiales, ...rest } =
            item;
          const { descripcion } = tipoCarga;

          return {
            ...rest,
            tipo: descripcion,
            requisitos: requisitos_especiales,
          };
        });

        setData(data);
      })
      .catch((error) => {
        if (onError) onError("No se pudieron cargar los datos: " + error);
      })
      .finally(() => setLoading(false));
  }, [onError]);

  const handleCreateCarga = useCallback(
    async (data: Carga) => {
      try {
        const newCarga = await createCarga(data);
        setData((current) => [...current, newCarga]);
        console.log("Carga creada:", newCarga);

        return { success: true, carga: newCarga };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo crear la Carga: " +
              JSON.stringify(data) +
              ", Error: " +
              error
          );
        return { success: false, carga: data };
      }
    },
    [onError]
  );

  const handleEditCarga = useCallback(
    async (data: Carga) => {
      if (!selectedRow || selectedRow.id === undefined)
        return { success: false, carga: data };
      try {
        const updated = await updateCarga(selectedRow.id, data);
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, carga: updated };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar la Carga: " +
              JSON.stringify(data) +
              ", Error: " +
              error
          );
        return { success: false, carga: data };
      }
    },
    [selectedRow, onError]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteCarga(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        return { success: true, id };
      } catch (error) {
        if (onError)
          onError("No se pudo eliminar la Carga: " + id + ", Error: " + error);
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
