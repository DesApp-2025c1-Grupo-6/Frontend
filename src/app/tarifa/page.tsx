"use client";

import React, { useCallback } from "react";
import TableSkeleton from "@/src/components/Skeletons";
import Table from "@/src/components/Table";
import Toast from "@/src/components/Toast";
import FiltrosSection from "@/src/components/FiltrosSection";
import TarifaModals from "@/src/components/TarifaModals";
import SectionTable from "../UI/SectionTable";
import { useTarifas } from "@/src/hooks/useTarifas";
import { useToast } from "@/src/hooks/useToast";
import { useTarifaFilters } from "@/src/hooks/useTarifaFilters";
import { useTarifaTableData } from "@/src/hooks/useTarifaTableData";
import { useTarifaTableActions } from "@/src/hooks/useTarifaTableActions";
import { useTarifaFormData } from "@/src/hooks/useTarifaFormData";

function Index() {
  // Hook para mostrar toasts de notificación
  const { toastVisible, toastMessage, toastTitle, toastType, showToast } =
    useToast();

  // Callback estable para manejar errores desde useTarifas
  const handleError = useCallback(
    (msg: string) => showToast("Error", msg, "error"),
    [showToast]
  );

  // Hook personalizado para manejar la lógica de tarifas
  const {
    data,
    loading,
    selectedRow,
    setSelectedRow,
    handleCreateTarifa,
    handleEditTarifa,
    handleDelete,
  } = useTarifas(handleError);

  // Hook para filtros
  const {
    filtrosAplicados,
    valoresAplicados,
    filtroCarga,
    filtroVehiculo,
    filtroZona,
    filtroAdicional,
    filtroTransportista,
    handleFiltroCarga,
    handleFiltroVehiculo,
    handleFiltroZona,
    handleFiltroAdicional,
    handleFiltroTransportista,
    onApplyFilters,
    onClearFilters,
  } = useTarifaFilters();

  // Hook para datos del formulario
  const { cargas, vehiculos, zonas, adicionales, transportistas } =
    useTarifaFormData();

  // Hook para procesamiento de datos de la tabla
  const { tableData } = useTarifaTableData({
    data,
    filtrosAplicados,
    valoresAplicados,
  });

  // Hook para acciones de la tabla
  const { handleEdit, handleDeleteRequest, handleView, handleCreate } =
    useTarifaTableActions({ data, setSelectedRow });
  return (
    <>
      {/* Sección principal con tabla y botón para agregar tarifa */}
      <SectionTable
        titulo="Tarifas"
        textButton="Agregar Tarifa"
        onClickButton={handleCreate}
      >
        <FiltrosSection
          onApply={onApplyFilters}
          onClear={onClearFilters}
          filtroCarga={filtroCarga}
          filtroVehiculo={filtroVehiculo}
          filtroZona={filtroZona}
          filtroAdicional={filtroAdicional}
          filtroTransportista={filtroTransportista}
          handleFiltroCarga={handleFiltroCarga}
          handleFiltroVehiculo={handleFiltroVehiculo}
          handleFiltroZona={handleFiltroZona}
          handleFiltroAdicional={handleFiltroAdicional}
          handleFiltroTransportista={handleFiltroTransportista}
          cargas={cargas}
          vehiculos={vehiculos}
          zonas={zonas}
          adicionales={adicionales}
          transportistas={transportistas}
        />
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de tarifas
          <Table
            data={tableData}
            rowsPerPage={5}
            viewButton
            editButton
            deleteButton
            onView={handleView}
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

      {/* Modales de tarifa */}
      <TarifaModals
        selectedRow={selectedRow}
        cargas={cargas}
        vehiculos={vehiculos}
        zonas={zonas}
        adicionales={adicionales}
        transportistas={transportistas}
        handleCreateTarifa={handleCreateTarifa}
        handleEditTarifa={handleEditTarifa}
        handleDelete={handleDelete}
        showToast={showToast}
      />
    </>
  );
}

export default Index;
