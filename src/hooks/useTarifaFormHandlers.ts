import { TarifaFormHandlersProps } from "@/src/types";
import React from "react";

export const useTarifaFormHandlers = ({
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
