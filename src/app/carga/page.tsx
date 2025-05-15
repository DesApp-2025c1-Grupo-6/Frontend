"use client";

import Table from "@/src/components/Table";
import CargaForm from "../UI/forms/CargaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { Carga, tipoCarga } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useCarga } from "@/src/hooks/useCarga";
import { useToast } from "@/src/hooks/useToast";
import { useCallback } from "react";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useCarga
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de Carga
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateCarga,
    handleEditCarga,
    handleDelete,
  } = useCarga(handleError);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: Carga) => {
    setSelectedRow(row);
    toggleModalVisibility("editCarga");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteCarga");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar carga */}
      <SectionTable
        titulo="Cargas"
        textButton="Agregar Carga"
        onClickButton={() => toggleModalVisibility("createCarga")}
      >
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de Cargas
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
      {/* Modal de confirmación de eliminación de carga */}
      <Modal
        id="deleteCarga"
        title={"Eliminar carga " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta carga?"
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
                "Carga eliminada",
                "Se ha eliminado la carga: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deletecarga");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteCarga")}
      />
      {/* Modal de formulario para crear una nueva carga */}
      <CargaForm
        id="createCarga"
        mode="create"
        title="Registro de Carga"
        onSave={async (peso: string, volumen: string, tipoCarga: tipoCarga) => {
          const res = await handleCreateCarga(peso, volumen, tipoCarga);
          if (res?.success) {
            showToast(
              "carga creada",
              "Se ha creado la carga: " +
                peso +
                " " +
                volumen +
                " " +
                tipoCarga,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar una carga existente */}
      <CargaForm
        id="editCarga"
        mode="edit"
        title={"Editar Carga " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (peso: string, volumen: string, tipoCarga: tipoCarga) => {
          const res = await handleEditCarga(peso, volumen, tipoCarga);
          if (res?.success) {
            showToast("Carga editada", "Carga editada con éxito", "success");
          }
        }}
      />
    </>
  );
}

export default Index;
