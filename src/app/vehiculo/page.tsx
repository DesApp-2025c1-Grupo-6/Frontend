"use client";

import Table from "@/src/components/Table";
import VehiculoForm from "../UI/forms/VehiculoForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { Vehiculo } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";
import { useVehiculos } from "@/src/hooks/useVehiculos";
import { useToast } from "@/src/hooks/useToast";
import { useCallback, useEffect, useState } from "react";
import FiltroInput from "@/src/components/FiltroInput";
import SectionFiltros from "../UI/SectionFiltros";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useVehiculos
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de Vehiculos
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateVehiculo,
    handleEditVehiculo,
    handleDelete,
  } = useVehiculos(handleError);

  //filtro
  const [filteredData, setFilteredData] = useState<Vehiculo[]>(data);
  const [filterSelected, setFilterSelected] = useState<string>("");

  const handleFilterChange = (value: string) => {
    setFilterSelected(value);
  };

  useEffect(() => {
    if (filterSelected) {
      const filtered = data.filter((vehiculo) =>
        vehiculo.tipo.toLowerCase().includes(filterSelected.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [filterSelected, data]);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: Vehiculo) => {
    setSelectedRow(row);
    toggleModalVisibility("editVehiculo");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteVehiculo");
  };

  return (
    <>
      {/* Sección principal con tabla y botón para agregar Vehiculo */}
      <SectionTable
        titulo="Vehiculos"
        textButton="Agregar Vehiculo"
        onClickButton={() => toggleModalVisibility("createVehiculo")}
      >
        <SectionFiltros onClear={() => setFilterSelected("")}>
          <FiltroInput
            label="Vehiculos"
            onChange={handleFilterChange}
            data={[...data.map((vehiculo) => vehiculo.tipo)]}
            value={filterSelected}
          />
        </SectionFiltros>
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de Vehiculos
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
      {/* Modal de confirmación de eliminación de Vehiculo */}
      <Modal
        id="deleteVehiculo"
        title={"Eliminar Vehiculo " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta Vehiculo?"
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
                "Vehiculo eliminada",
                "Se ha eliminado la Vehiculo: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteVehiculo");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteVehiculo")}
      />
      {/* Modal de formulario para crear una nueva Vehiculo */}
      <VehiculoForm
        id="createVehiculo"
        mode="create"
        title="Registro de Vehiculo"
        onSave={async (vehiculo) => {
          const res = await handleCreateVehiculo(vehiculo);
          if (res?.success) {
            showToast(
              "Vehiculo creada",
              `Se ha creado el Vehiculo: ${vehiculo.tipo} (${vehiculo.toneladas} toneladas)`,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar una Vehiculo existente */}
      <VehiculoForm
        id="editVehiculo"
        mode="edit"
        title={"Editar Vehiculo " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={async (vehiculo) => {
          const res = await handleEditVehiculo(vehiculo);
          if (res?.success) {
            showToast(
              "Vehiculo editada",
              `Vehiculo editada: ${vehiculo.tipo} (${vehiculo.toneladas} toneladas)`,
              "success"
            );
          }
        }}
      />
    </>
  );
}

export default Index;
