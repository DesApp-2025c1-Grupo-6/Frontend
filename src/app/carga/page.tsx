"use client";

import Table from "@/src/components/Table";
import CargaForm from "../UI/forms/CargaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { Carga } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useCargas } from "@/src/hooks/useCargas";
import { useToast } from "@/src/hooks/useToast";
import { useCallback, useEffect, useState } from "react";
import { useTipoCargas } from "@/src/hooks/useTipoCargas";
import FiltroInput from "@/src/components/FiltroInput";
import SectionFiltros from "../UI/SectionFiltros";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useCargas
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de Cargas
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateCarga,
    handleEditCarga,
    handleDelete,
  } = useCargas(handleError);

  const { data: dataTipoDeCargas } = useTipoCargas(handleError);

  //filtro
  const [filteredData, setFilteredData] = useState<Carga[]>(data);
  const [filterSelected, setFilterSelected] = useState<string>("");

  const handleFilterChange = (value: string) => {
    setFilterSelected(value);
  };

  useEffect(() => {
    if (filterSelected) {
      const filtered = data.filter((carga) =>
        carga.tipo.toLowerCase().includes(filterSelected.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [filterSelected, data]);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: Carga) => {
    setSelectedRow(row);
    toggleModalVisibility("editCarga");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find(
      (row: Carga) => row.id !== undefined && row.id === id
    );
    setSelectedRow(row);
    toggleModalVisibility("deleteCarga");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar Carga */}
      <SectionTable
        titulo="Cargas"
        textButton="Agregar Carga"
        onClickButton={() => toggleModalVisibility("createCarga")}
      >
        <SectionFiltros onClear={() => setFilterSelected("")}>
          <FiltroInput
            label="Cargas"
            onChange={handleFilterChange}
            data={[...dataTipoDeCargas.map((carga) => carga.descripcion)]}
            value={filterSelected}
          />
        </SectionFiltros>
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={4} />
        ) : (
          // Tabla con los datos de Cargas
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
      {/* Modal de confirmación de eliminación de Carga */}
      <Modal
        id="deleteCarga"
        title={"Eliminar Carga " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta Carga?"
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
                "Se ha eliminado la Carga: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteCarga");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteCarga")}
      />
      {/* Modal de formulario para crear una nueva Carga */}
      <CargaForm
        id="createCarga"
        mode="create"
        title="Registro de carga"
        dataTipoDeCargas={dataTipoDeCargas}
        onSave={async (peso, volumen, tipo, requisitos) => {
          const res = await handleCreateCarga({
            peso,
            volumen,
            tipo,
            requisitos,
          });
          if (res?.success) {
            showToast("Carga creada", "Se ha creado la Carga", "success");
          }
        }}
      />
      {/* Modal de formulario para editar una Carga existente */}
      <CargaForm
        id="editCarga"
        mode="edit"
        title={"Editar carga " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        dataTipoDeCargas={dataTipoDeCargas}
        onSave={async (peso, volumen, tipo, requisitos) => {
          if (selectedRow?.id === undefined) return;
          const res = await handleEditCarga(selectedRow?.id, {
            peso,
            volumen,
            tipo,
            requisitos,
          });
          if (res?.success) {
            showToast("Carga editada", "Carga editada con éxito", "success");
          }
        }}
      />
    </>
  );
}

export default Index;
