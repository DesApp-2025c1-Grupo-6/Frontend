"use client";

import Table from "@/src/components/Table";
import TransportistaForm from "../UI/forms/TransportistaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { Transportista } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useTransportista } from "@/src/hooks/useTransportista";
import { useToast } from "@/src/hooks/useToast";
import { useCallback, useEffect, useState } from "react";
import FiltroInput from "@/src/components/FiltroInput";
import SectionFiltros from "../UI/SectionFiltros";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useTransportista
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de transportistas
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateTransportista,
    handleEditTransportista,
    handleDelete,
  } = useTransportista(handleError);

  //filtro
  const [filteredData, setFilteredData] = useState<Transportista[]>(data);
  const [filterSelected, setFilterSelected] = useState<string>("");

  const handleFilterChange = (value: string) => {
    setFilterSelected(value);
  };

  useEffect(() => {
    if (filterSelected) {
      const filtered = data.filter((transportista) =>
        transportista.nombre
          .toLowerCase()
          .includes(filterSelected.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [filterSelected, data]);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: Transportista) => {
    setSelectedRow(row);
    toggleModalVisibility("editTransportista");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteTransportista");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar zona */}
      <SectionTable
        titulo="Transportistas"
        textButton="Agregar Transportista"
        onClickButton={() => toggleModalVisibility("createTransportista")}
      >
        <SectionFiltros onClear={() => setFilterSelected("")}>
          <FiltroInput
            label="Transportistas"
            onChange={handleFilterChange}
            data={[...data.map((transportista) => transportista.nombre)]}
            value={filterSelected}
          />
        </SectionFiltros>
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de transportistas
          <Table
            data={filteredData}
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
      {/* Modal de confirmación de eliminación de transportista */}
      <Modal
        id="deleteTransportista"
        title={"Eliminar Transportista " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar este transportista?"
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
                "Transportista eliminado",
                "Se ha eliminado el transportista: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteTransportista");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteTransportista")}
      />
      {/* Modal de formulario para crear un nuevo transportista  */}
      <TransportistaForm
        id="createTransportista"
        mode="create"
        title="Registro de Transportista"
        onSave={async (nombre: string) => {
          const res = await handleCreateTransportista(nombre);
          if (res?.success) {
            showToast(
              "Transportista creada",
              "Se ha creado el transportista: " + nombre,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar un transportista existente */}
      <TransportistaForm
        id="editTransportista"
        mode="edit"
        title={"Editar Transportista " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (nombre: string) => {
          const res = await handleEditTransportista(nombre);
          if (res?.success) {
            showToast(
              "Transportista editado",
              "Transportista editado con éxito",
              "success"
            );
          }
        }}
      />
    </>
  );
}

export default Index;
