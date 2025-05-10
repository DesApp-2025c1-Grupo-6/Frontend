"use client";

import Table from "@/src/components/Table";
import ZonaForm from "../UI/forms/ZonaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { Zona } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useZonas } from "@/src/hooks/useZonas";
import { useToast } from "@/src/hooks/useToast";
import { useCallback } from "react";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useZonas
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de zonas
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateZone,
    handleEditZone,
    handleDelete,
  } = useZonas(handleError);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: Zona) => {
    setSelectedRow(row);
    toggleModalVisibility("editZona");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteZona");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar zona */}
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
      {/* Toast de notificación para feedback al usuario */}
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
        fillButtonAction={async () => {
          if (selectedRow?.id !== undefined) {
            const res = await handleDelete(selectedRow.id);
            if (res?.success) {
              showToast(
                "Zona eliminada",
                "Se ha eliminado la zona: " + selectedRow.id,
                "success"
              );
            }
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
        onSave={async (nombre: string) => {
          const res = await handleCreateZone(nombre);
          if (res?.success) {
            showToast(
              "Zona creada",
              "Se ha creado la zona: " + nombre,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar una zona existente */}
      <ZonaForm
        id="editZona"
        mode="edit"
        title={"Editar Zona " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (nombre: string) => {
          const res = await handleEditZone(nombre);
          if (res?.success) {
            showToast("Zona editada", "Zona editada con éxito", "success");
          }
        }}
      />
    </>
  );
}

export default Index;
