"use client";

import Table from "@/src/components/Table";
import TipoCargaForm from "../UI/forms/TipoCargaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useToast } from "@/src/hooks/useToast";
import { useCallback } from "react";
import { useTipoCargas } from "@/src/hooks/useTipoCargas";
import { TipoCarga } from "@/src/types";

function Index() {
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateTipoCarga,
    handleEditTipoCarga,
    handleDelete,
  } = useTipoCargas(handleError);

  const handleEdit = (row: TipoCarga) => {
    setSelectedRow(row);
    toggleModalVisibility("editTipoCarga");
  };

  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id !== undefined && row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteTipoCarga");
  };

  return (
    <>
      <SectionTable
        titulo="Tipos de Carga"
        textButton="Agregar Tipo de Carga"
        onClickButton={() => toggleModalVisibility("createTipoCarga")}
      >
        {loading ? (
          <TableSkeleton columns={2} />
        ) : (
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
      <Toast
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        open={toastVisible}
      />
      <Modal
        id="deleteTipoCarga"
        title={"Eliminar Tipo de Carga " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar este Tipo de Carga?"
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
                "Tipo de carga eliminado",
                "Se ha eliminado el Tipo de Carga: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteTipoCarga");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteTipoCarga")}
      />
      <TipoCargaForm
        id="createTipoCarga"
        mode="create"
        title="Registrar tipo de carga"
        onSave={async (descripcion) => {
          const res = await handleCreateTipoCarga(descripcion);
          if (res?.success) {
            showToast(
              "Tipo de carga creado",
              "Se ha creado el tipo de carga",
              "success"
            );
          }
        }}
      />
      <TipoCargaForm
        id="editTipoCarga"
        mode="edit"
        title={"Editar tipo de carga " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (descripcion) => {
          if (!selectedRow) return;
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
