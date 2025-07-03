"use client";
import React, { useEffect } from "react";
import { TarifaFormProps } from "@/src/types";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";
import ModalTipoAdicional from "../ModalTipoAdicional";
import TarifaFormContent from "@/src/components/TarifaFormContent";
import { useTarifaForm } from "@/src/hooks/useTarifaForm";
import { useTarifaAdicionales } from "@/src/hooks/useTarifaAdicionales";
import { useTarifaCostCalculation } from "@/src/hooks/useTarifaCostCalculation";
import { useTarifaFormHandlers } from "@/src/hooks/useTarifaFormHandlers";
import { useTarifaFormActions } from "@/src/hooks/useTarifaFormActions";

function TarifaForm({
  id,
  title,
  mode,
  data,
  dataAdicionales,
  dataCargas,
  dataTransportistas,
  dataVehiculos,
  dataZonas,
  onSave,
}: TarifaFormProps) {
  // Hook para manejar el formulario principal
  const {
    formData,
    shouldValidate,
    setShouldValidate,
    resetForm,
    fillFormFromData,
    handleSelectChange,
    updateField,
    isFormValid,
  } = useTarifaForm({
    mode,
    data,
    dataZonas,
    dataVehiculos,
    dataCargas,
    dataTransportistas,
  });

  // Hook para manejar adicionales
  const {
    adicionales,
    adicionalSeleccionado,
    costoAdicionalSeleccionado,
    customCostoAdicional,
    shouldValidateTipoAdicional,
    errorMessageTipoAdicional,
    resetAdicionales,
    resetFormTipoAdicional,
    handleChangeAdicionales,
    handleChangeCustomCostoAdicional,
    addAdicional,
    removeAdicional,
    loadAdicionales,
  } = useTarifaAdicionales({ dataAdicionales });

  // Hook para cálculos de costo
  const { costoAdicionales, costoTotal, loadCosts } = useTarifaCostCalculation({
    adicionales,
    valor: formData.valor,
  });

  // Hook para handlers del formulario
  const {
    handleValorChange,
    handleZonaChange,
    handleVehiculoChange,
    handleCargaChange,
    handleTransportistaChange,
  } = useTarifaFormHandlers({
    formData,
    updateField,
    handleSelectChange,
    dataZonas,
    dataVehiculos,
    dataCargas,
    dataTransportistas,
  });

  // Hook para acciones del formulario
  const { handleSave, onCancel } = useTarifaFormActions({
    id,
    mode,
    formData,
    adicionales,
    data,
    isFormValid,
    setShouldValidate,
    resetForm,
    fillFormFromData,
    onSave,
    resetAdicionales,
  });

  // Cargar datos adicionales cuando el modo o datos cambien
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      loadAdicionales(data.adicionales);
      loadCosts(data);
    } else {
      resetAdicionales();
    }
  }, [mode, data]);

  const handleSaveTipoAdicional = () => {
    const success = addAdicional();
    if (success) {
      toggleModalVisibility("tipoAdicional - " + mode);
    }
  };

  const handleCancelTipoAdicional = () => {
    resetFormTipoAdicional();
    toggleModalVisibility("tipoAdicional - " + mode);
  };

  const handleAgregarAdicional = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleModalVisibility("tipoAdicional - " + mode);
  };
  return (
    <>
      <Modal
        id={id}
        title={title}
        lineButton={mode === "view" ? false : true}
        fillButton
        lineButtonText="Cancelar"
        fillButtonText={mode === "view" ? "Cerrar" : "Guardar"}
        fillButtonAction={handleSave}
        lineButtonAction={onCancel}
      >
        <TarifaFormContent
          mode={mode}
          formData={formData}
          shouldValidate={shouldValidate}
          adicionales={adicionales}
          costoAdicionales={costoAdicionales}
          costoTotal={costoTotal}
          dataVehiculos={dataVehiculos ?? []}
          dataZonas={dataZonas ?? []}
          dataCargas={dataCargas ?? []}
          dataTransportistas={dataTransportistas ?? []}
          onValorChange={handleValorChange}
          onVehiculoChange={handleVehiculoChange}
          onZonaChange={handleZonaChange}
          onCargaChange={handleCargaChange}
          onTransportistaChange={handleTransportistaChange}
          onAgregarAdicional={handleAgregarAdicional}
          onDeleteAdicional={removeAdicional}
        />
      </Modal>
      <ModalTipoAdicional
        id={"tipoAdicional - " + mode}
        dataAdicionales={dataAdicionales ?? []}
        adicionalSeleccionado={adicionalSeleccionado}
        costoAdicionalSeleccionado={costoAdicionalSeleccionado}
        customCostoAdicional={customCostoAdicional}
        shouldValidate={shouldValidateTipoAdicional}
        errorMessage={errorMessageTipoAdicional}
        handleChangeCustomCostoAdicional={handleChangeCustomCostoAdicional}
        handleChangeAdicionales={handleChangeAdicionales}
        handleSaveTipoAdicional={handleSaveTipoAdicional}
        handleCancelTipoAdicional={handleCancelTipoAdicional}
      />
    </>
  );
}

export default TarifaForm;
