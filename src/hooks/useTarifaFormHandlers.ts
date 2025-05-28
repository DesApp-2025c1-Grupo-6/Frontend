import React from "react";
import { TarifaFormData, TarifaFormHandlersProps } from "@/src/types";

export const useTarifaFormHandlers = ({
  formData,
  updateField,
  handleSelectChange,
  dataZonas,
  dataVehiculos,
  dataCargas,
  dataTransportistas,
}: TarifaFormHandlersProps) => {
  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("valor", event.target.value);
  };

  const handleZonaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectChange("zona", event.target.value, dataZonas);
  };

  const handleVehiculoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleSelectChange("vehiculo", event.target.value, dataVehiculos);
  };

  const handleCargaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectChange("carga", event.target.value, dataCargas);
  };

  const handleTransportistaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleSelectChange("transportista", event.target.value, dataTransportistas);
  };

  return {
    handleValorChange,
    handleZonaChange,
    handleVehiculoChange,
    handleCargaChange,
    handleTransportistaChange,
  };
};
