"use client";

import Table from "@/src/components/Table";
import TipoCargaForm from "../UI/forms/TipoCargaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { tipoCarga } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useTipoCarga } from "@/src/hooks/useTipoCarga";
import { useToast } from "@/src/hooks/useToast";
import { useCallback } from "react";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useTipoCarga
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de tipoCarga
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateTipoCarga,
    handleEditTipoCarga,
    handleDelete,
  } = useTipoCarga(handleError);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: tipoCarga) => {
    setSelectedRow(row);
    toggleModalVisibility("editTipoCarga");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteteTipoCarga");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar tipoCarga */}
      <SectionTable
        titulo="Tipos de Carga"
        textButton="Agregar Tipo de Carga"
        onClickButton={() => toggleModalVisibility("createTipoCarga")}
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
      {/* Modal de confirmación de eliminación de tipoCarga */}
      <Modal
        id="deleteTipoCarga"
        title={"Eliminar tipoCarga " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar este tipoCarga?"
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
                "tipoCarga eliminado",
                "Se ha eliminado el tipoCarga: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deletetipoCarga");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteTipoCarga")}
      />
      {/* Modal de formulario para crear un nuevo tipoCarga */}
      <TipoCargaForm
        id="createTipoCarga"
        mode="create"
        title="Registro de Tipo de Carga"
        onSave={async (descricion: string) => {
          const res = await handleCreateTipoCarga(descricion);
          if (res?.success) {
            showToast(
              "tipoCarga creado",
              "Se ha creado el tipoCarga: " + descricion,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar un tipo de carga existente*/}
      <TipoCargaForm
        id="editTipoCarga"
        mode="edit"
        title={"Editar Tipo de carga " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (descripcion: string) => {
          const res = await handleEditTipoCarga(descripcion);
          if (res?.success) {
            showToast(
              "Tipo de carga editado",
              "Tipo de carga editado con éxito",
              "success"
            );
          }
        }}
      />
    </>
  );
}

export default Index;
