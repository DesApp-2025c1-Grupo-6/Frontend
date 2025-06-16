"use client";

import FiltroInput from "@/src/components/FiltroInput";
import TableSkeleton from "@/src/components/Skeletons";
import Table from "@/src/components/Table";
import TarifaModals from "@/src/components/TarifaModals";
import Toast from "@/src/components/Toast";
import { useTarifaFilters } from "@/src/hooks/useTarifaFilters";
import { useTarifaFormData } from "@/src/hooks/useTarifaFormData";
import { useTarifas } from "@/src/hooks/useTarifas";
import { useTarifaTableActions } from "@/src/hooks/useTarifaTableActions";
import { useTarifaTableData } from "@/src/hooks/useTarifaTableData";
import { useToast } from "@/src/hooks/useToast";
import { useCallback, useEffect } from "react";
import SectionFiltros from "../UI/SectionFiltros";
import SectionTable from "../UI/SectionTable";

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
  const { tipoDeCarga, cargas, vehiculos, zonas, adicionales, transportistas } =
    useTarifaFormData();

  // Hook para procesamiento de datos de la tabla
  const { tableData } = useTarifaTableData({
    data,
    filtrosAplicados,
    valoresAplicados,
  });

  useEffect(() => {
    onApplyFilters();
  }, [
    filtroCarga,
    filtroVehiculo,
    filtroZona,
    filtroAdicional,
    filtroTransportista,
  ]);

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
        <SectionFiltros onClear={() => onClearFilters()}>
          <FiltroInput
            label="Carga"
            onChange={handleFiltroCarga}
            data={[...tipoDeCarga.map((carga) => carga.descripcion)]}
            value={filtroCarga}
          />
          <FiltroInput
            label="Vehiculo"
            onChange={handleFiltroVehiculo}
            data={[...vehiculos.map((vehiculo) => vehiculo.tipo)]}
            value={filtroVehiculo}
          />
          <FiltroInput
            label="Transportista"
            onChange={handleFiltroTransportista}
            data={[
              ...transportistas.map((transportista) => transportista.nombre),
            ]}
            value={filtroTransportista}
          />
          <FiltroInput
            label="Zona"
            onChange={handleFiltroZona}
            data={[...zonas.map((zona) => zona.nombre)]}
            value={filtroZona}
          />
          <FiltroInput
            label="Adicional"
            onChange={handleFiltroAdicional}
            data={[...adicionales.map((adicional) => adicional.tipo)]}
            value={filtroAdicional}
          />
        </SectionFiltros>
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
