"use client";

import Table from "@/src/components/Table";
import ZonaForm from "../UI/forms/ZonaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { useState, useCallback, useRef, useEffect } from "react";
import { Zona } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import {
  createZona,
  deleteZona,
  getZonas,
  updateZona,
} from "@/src/services/fetchDataZonas";

function Index() {
  // Estado para almacenar los datos de la tabla
  const [data, setData] = useState([] as Zona[]);
  // Estado para mostrar el loader mientras se cargan los datos
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Zona>();
  // Estados para el Toast de notificación
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  // Referencia para controlar el timeout del Toast
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para cargar los datos iniciales al montar el componente
  useEffect(() => {
    setLoading(true);
    getZonas()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        showToast(
          "Error",
          "No se pudieron cargar los datos: " + error,
          "error"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Función para mostrar el Toast de notificación
  const showToast = useCallback(
    (title: string, message: string, type: "success" | "error" = "success") => {
      setToastVisible(true);
      setToastTitle(title);
      setToastMessage(message);
      setToastType(type);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    },
    []
  );

  // Handler para crear una nueva zona
  const handleCreateZone = useCallback(
    async (nombre: string) => {
      try {
        const newZona = await createZona({ nombre });
        setData((current) => [...current, newZona]);
        showToast("Zona creada", "Se ha creado la zona: " + nombre, "success");
      } catch (error) {
        showToast(
          "Error",
          "No se pudo crear la zona: " + nombre + ", Error: " + error,
          "error"
        );
      }
    },
    [showToast]
  );

  // Handler para editar una zona existente
  const handleEditZone = useCallback(
    async (nombre: string) => {
      if (!selectedRow) return;
      try {
        const updated = await updateZona(selectedRow.id, { nombre });
        setData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
        showToast("Zona editada", "Zona editada con éxito", "success");
      } catch (error) {
        showToast(
          "Error",
          "No se pudo editar la zona: " + nombre + ", Error: " + error,
          "error"
        );
      }
    },
    [selectedRow, showToast]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        await deleteZona(id);
        setData((prev) => prev.filter((row) => row.id !== id));
        showToast(
          "Zona eliminada",
          "Se ha eliminado la zona: " + id,
          "success"
        );
      } catch (error) {
        showToast(
          "Error",
          "No se pudo eliminar la zona: " + id + ", Error: " + error,
          "error"
        );
      }
    },
    [showToast]
  );

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = useCallback((row: Zona) => {
    setSelectedRow(row);
    toggleModalVisibility("editZona");
  }, []);

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = useCallback(
    (id: string | number) => {
      const row = data.find((row) => row.id === id);
      setSelectedRow(row);
      toggleModalVisibility("deleteZona");
    },
    [data]
  );

  return (
    <>
      <SectionTable
        titulo="Zonas"
        textButton="Agregar Zona"
        onClickButton={() => toggleModalVisibility("createZona")}
      >
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de zonas
          <Table
            data={data}
            rowsPerPage={5}
            editButton
            deleteButton
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        )}
      </SectionTable>

      {/* Toast de notificación */}
      <Toast
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        open={toastVisible}
      />

      {/* Modal de confirmación de eliminación de zona */}
      <Modal
        id="deleteZona"
        title={"Eliminar Zona " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta zona?"
        fillButton
        lineButton
        fillButtonText="Eliminar"
        lineButtonText="Cancelar"
        fillButtonColor="#eb5757"
        lineButtonColor="#eb5757"
        fillButtonAction={() => {
          if (selectedRow?.id !== undefined) {
            handleDelete(selectedRow.id);
          }
          toggleModalVisibility("deleteZona");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteZona")}
      />

      {/* Modal de formulario para crear una nueva zona */}
      <ZonaForm
        id="createZona"
        mode="create"
        title="Registro de Zona"
        onSave={handleCreateZone}
      />

      {/* Modal de formulario para editar una zona existente */}
      <ZonaForm
        id="editZona"
        mode="edit"
        title={"Editar Zona " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={handleEditZone}
      />
    </>
  );
}

export default Index;
