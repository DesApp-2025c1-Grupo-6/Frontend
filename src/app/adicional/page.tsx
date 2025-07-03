"use client";

import FiltroInput from "@/src/components/FiltroInput";
import TableSkeleton from "@/src/components/Skeletons";
import Table from "@/src/components/Table";
import Toast from "@/src/components/Toast";
import { useAdicional } from "@/src/hooks/useAdicional";
import { useToast } from "@/src/hooks/useToast";
import { Adicional } from "@/src/types";
import { useCallback, useEffect, useState } from "react";
import AdicionalForm from "../UI/forms/AdicionalForm";
import Modal from "../UI/Modal";
import SectionFiltros from "../UI/SectionFiltros";
import SectionTable from "../UI/SectionTable";
import { generateReporte, toggleModalVisibility } from "../utils/utils";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useAdicional
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de adicionales
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateAdicional,
    handleEditAdicional,
    handleDelete,
  } = useAdicional(handleError);

  //filtro
  const [filteredData, setFilteredData] = useState<Adicional[]>(data);
  const [filterSelected, setFilterSelected] = useState<string>("");

  const handleFilterChange = (value: string) => {
    setFilterSelected(value);
  };

  useEffect(() => {
    if (filterSelected) {
      const filtered = data.filter((adicional) =>
        adicional.tipo.toLowerCase().includes(filterSelected.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [filterSelected, data]);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: Adicional) => {
    setSelectedRow(row);
    toggleModalVisibility("editAdicional");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteAdicional");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar adicional */}
      <SectionTable
        titulo="Adicionales"
        textButton="Agregar Adicional"
        onClickReporte={() =>
          generateReporte("/adicionales/reporte", "reporte_adicionales.pdf")
        }
        onClickButton={() => toggleModalVisibility("createAdicional")}
      >
        <SectionFiltros onClear={() => setFilterSelected("")}>
          <FiltroInput
            label="Adicionales"
            onChange={handleFilterChange}
            data={[...data.map((adicional) => adicional.tipo)]}
            value={filterSelected}
          />
        </SectionFiltros>
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de adicionales
          <Table
            data={filteredData}
            rowsPerPage={4}
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
      {/* Modal de confirmación de eliminación de adicional */}
      <Modal
        id="deleteAdicional"
        title={"Eliminar Adicional " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar este adicional?"
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
                "adicional eliminado",
                "Se ha eliminado el adicional: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteAdicional");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteAdicional")}
      />
      {/* Modal de formulario para crear un nuevo adicional */}
      <AdicionalForm
        id="createAdicional"
        mode="create"
        title="Registro de Adicional"
        onSave={async (tipo: string, costo_default: string) => {
          const res = await handleCreateAdicional(tipo, costo_default);
          if (res?.success) {
            showToast(
              "Adicional creado",
              "Se ha creado el adicional: " +
                tipo +
                " con costo " +
                costo_default,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar un adicional existente */}
      <AdicionalForm
        id="editAdicional"
        mode="edit"
        title={"Editar Adicional " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (tipo: string, costo_default: string) => {
          const res = await handleEditAdicional(tipo, costo_default);
          if (res?.success) {
            showToast(
              "Adicional editado",
              "Adicional editado con éxito",
              "success"
            );
          }
        }}
      />
    </>
  );
}

export default Index;
