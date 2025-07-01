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
   * @param telefono Teléfono del transportista
   * @param email Email del transportista
   */
  const handleCreateTransportista = useCallback(
    async (nombre: string, telefono: string, email?: string) => {
      try {
        const newTransportista = await createTransportista({
          nombre,
          telefono,
          email: email?.trim() === "" ? "" : email?.trim(),
        });
        setData((current) => [...current, newTransportista]);
        return { success: true, nombre, telefono, email };
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
   * @param telefono Nuevo teléfono del transportista
   * @param email Nuevo email del transportista
   */
  const handleEditTransportista = useCallback(
    async (nombre: string, telefono: string, email?: string) => {
      if (!selectedRow) return { success: false, nombre, telefono, email };

      const payload: any = {
        nombre,
        telefono,
        email: email && email.trim() !== "" ? email.trim() : "",
      };

      if (email !== undefined) {
        const trimmedEmail = email.trim();
        if (trimmedEmail === "") {
          payload.email = "";
        } else {
          payload.email = trimmedEmail;
        }
      }

      try {
        const updated = await updateTransportista(selectedRow.id, payload);
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        return { success: true, nombre, telefono, email };
      } catch (error) {
        if (onError)
          onError(
            "No se pudo editar el transportista: " +
              nombre +
              ", Error: " +
              error
          );
        return { success: false, nombre, telefono, email };
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
