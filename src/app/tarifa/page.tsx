"use client";

import TableSkeleton from "@/src/components/Skeletons";
import Table from "@/src/components/Table";
import Toast from "@/src/components/Toast";
import { useFiltros } from "@/src/context/FiltrosContext";
import { useTarifas } from "@/src/hooks/useTarifas";
import { useToast } from "@/src/hooks/useToast";
import { useCallback, useMemo, useState } from "react";
import Filtro from "../../components/Filtro";
import { useCargas } from "../../hooks/useCargas";
import { useVehiculos } from "../../hooks/useVehiculos";
import { useZonas } from "../../hooks/useZonas";
import TarifaForm from "../UI/forms/TarifaForm";
import Modal from "../UI/Modal";
import SectionFiltros from "../UI/SectionFiltros";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";

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

  // Filtros context
  const {
    filtroCarga,
    setFiltroCarga,
    filtroVehiculo,
    setFiltroVehiculo,
    filtroZona,
    setFiltroZona,
    filtroAdicional,
    setFiltroAdicional,
    filtroTransportista,
    setFiltroTransportista,
    limpiarFiltros,
  } = useFiltros();

  // Estado para saber si los filtros están activos
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);
  // Estado para guardar los valores aplicados
  const [valoresAplicados, setValoresAplicados] = useState({
    carga: "",
    vehiculo: "",
    zona: "",
    adicional: "",
    transportista: "",
  });

  // Handlers para filtros (actualizan el context)
  const handleFiltroCarga = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFiltroCarga(e.target.value);
  const handleFiltroVehiculo = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFiltroVehiculo(e.target.value);
  const handleFiltroZona = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFiltroZona(e.target.value);
  const handleFiltroAdicional = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFiltroAdicional(e.target.value);
  const handleFiltroTransportista = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFiltroTransportista(e.target.value);

  // Handler para aplicar filtros
  const onApplyFilters = () => {
    setValoresAplicados({
      carga: filtroCarga,
      vehiculo: filtroVehiculo,
      zona: filtroZona,
      adicional: filtroAdicional,
      transportista: filtroTransportista,
    });
    setFiltrosAplicados(true);
  };

  // Handler para limpiar filtros
  const onClearFilters = () => {
    limpiarFiltros();
    setValoresAplicados({
      carga: "",
      vehiculo: "",
      zona: "",
      adicional: "",
      transportista: "",
    });
    setFiltrosAplicados(false);
  };

  // Transformar los datos para la tabla para mostrar solo los textos
  const tableData = useMemo(() => {
    let filteredData = data;
    if (filtrosAplicados) {
      if (valoresAplicados.carga)
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_carga == valoresAplicados.carga
        );
      if (valoresAplicados.vehiculo)
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_vehiculo == valoresAplicados.vehiculo
        );
      if (valoresAplicados.zona)
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_zona == valoresAplicados.zona
        );
      if (valoresAplicados.transportista)
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_transportista == valoresAplicados.transportista
        );
      if (valoresAplicados.adicional)
        filteredData = filteredData.filter((tarifa) =>
          tarifa.adicionales?.some(
            (adicional) => adicional.id == valoresAplicados.adicional
          )
        );
    }

    return filteredData.map((tarifa) => ({
      id: tarifa.id,
      zona: tarifa.zona,
      vehiculo: tarifa.vehiculo,
      carga: tarifa.carga,
      transportista: tarifa.transportista,
    }));
  }, [data, filtrosAplicados, valoresAplicados]);

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: any) => {
    const dataRow = data.find((t) => t.id === row.id);

    setSelectedRow(dataRow);
    toggleModalVisibility("editTarifa");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteTarifa");
  };

  // Handler para abrir el modal de visualización con la fila seleccionada
  const handleView = (row: any) => {
    const dataRow = data.find((t) => t.id === row.id);
    setSelectedRow(dataRow);
    toggleModalVisibility("viewTarifa");
  };

  const { data: cargas } = useCargas();
  const { data: vehiculos } = useVehiculos();
  const { data: zonas } = useZonas();

  // Mock de adicionales siguiendo el modelo de la base de datos
  const adicionales = [
    {
      id: 1,
      tipo: "Otro",
      costo_default: 2000,
    },
    {
      id: 2,
      tipo: "Peon",
      costo_default: 100,
    },
  ];

  // Mock de transportistas siguiendo el modelo de la base de datos
  const transportistas = [{ id: 1, nombre: "Transporte" }];

  return (
    <>
      {/* Sección principal con tabla y botón para agregar tarifa */}
      <SectionTable
        titulo="Tarifas"
        textButton="Agregar Tarifa"
        onClickButton={() => toggleModalVisibility("createTarifa")}
      >
        <SectionFiltros onApply={onApplyFilters} onClear={onClearFilters}>
          <Filtro
            onChange={handleFiltroCarga}
            data={cargas}
            placeholder="Cargas"
            title="Cargas"
            value={filtroCarga}
          />
          <Filtro
            onChange={handleFiltroVehiculo}
            data={vehiculos}
            placeholder="Vehículos"
            title="Vehículos"
            value={filtroVehiculo}
          />
          <Filtro
            onChange={handleFiltroZona}
            data={zonas}
            placeholder="Zonas"
            title="Zonas"
            value={filtroZona}
          />
          <Filtro
            onChange={handleFiltroAdicional}
            data={adicionales}
            placeholder="Adicionales"
            title="Adicionales"
            value={filtroAdicional}
          />
          <Filtro
            onChange={handleFiltroTransportista}
            data={transportistas}
            placeholder="Transportistas"
            title="Transportistas"
            value={filtroTransportista}
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
      {/* Modal de confirmación de eliminación de tarifa */}
      <Modal
        id="deleteTarifa"
        title={"Eliminar Tarifa " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta tarifa?"
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
                "Tarifa eliminada",
                "Se ha eliminado la tarifa: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteTarifa");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteTarifa")}
      />
      {/* Modal de formulario para crear una nueva tarifa */}
      <TarifaForm
        id="createTarifa"
        mode="create"
        title="Registro de Tarifa"
        dataCargas={cargas}
        dataVehiculos={vehiculos}
        dataZonas={zonas}
        dataAdicionales={adicionales}
        dataTransportistas={transportistas}
        onSave={async (tarifaData) => {
          const res = await handleCreateTarifa(
            tarifaData.valor,
            tarifaData.id_zona,
            tarifaData.id_vehiculo,
            tarifaData.id_carga,
            tarifaData.id_transportista,
            tarifaData.adicionales
          );
          if (res?.success) {
            showToast(
              "Tarifa creada",
              "Se ha creado la tarifa: " + tarifaData.valor,
              "success"
            );
          }
        }}
      />
      {/* Modal de formulario para editar una tarifa existente */}
      <TarifaForm
        id="editTarifa"
        mode="edit"
        title={"Editar Tarifa " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        dataCargas={cargas}
        dataVehiculos={vehiculos}
        dataZonas={zonas}
        dataAdicionales={adicionales}
        dataTransportistas={transportistas}
        onSave={async (tarifaData) => {
          const res = await handleEditTarifa(
            tarifaData.valor,
            tarifaData.id_zona,
            tarifaData.id_vehiculo,
            tarifaData.id_carga,
            tarifaData.id_transportista,
            tarifaData.adicionales
          );
          if (res?.success) {
            showToast("Tarifa editada", "Tarifa editada con éxito", "success");
          }
        }}
      />
      <TarifaForm
        id="viewTarifa"
        mode="view"
        title={"Ver Tarifa " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        dataCargas={cargas}
        dataVehiculos={vehiculos}
        dataZonas={zonas}
        dataAdicionales={adicionales}
        dataTransportistas={transportistas}
      />
    </>
  );
}

export default Index;
