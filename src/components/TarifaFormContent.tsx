import TarifaAdicionalesSection from "@/src/components/TarifaAdicionalesSection";
import TarifaBasicDataSection from "@/src/components/TarifaBasicDataSection";
import TarifaResumenSection from "@/src/components/TarifaResumenSection";
import { TarifaFormContentProps } from "@/src/types";
import React from "react";

const TarifaFormContent: React.FC<TarifaFormContentProps> = ({
  mode,
  formData,
  shouldValidate,
  adicionales,
  costoAdicionales,
  costoTotal,
  dataVehiculos,
  dataZonas,
  dataCargas,
  dataTransportistas,
  onValorChange,
  onVehiculoChange,
  onZonaChange,
  onCargaChange,
  onTransportistaChange,
  onAgregarAdicional,
  onDeleteAdicional,
}) => {
  return (
    <form className="flex flex-col gap-4 w-full max-w-full">
      <TarifaBasicDataSection
        mode={mode}
        valor={formData.valor}
        vehiculo={formData.idVehiculo}
        zona={formData.idZona}
        carga={formData.idCarga}
        transportista={formData.idTransportista}
        vehiculoNombre={formData.vehiculo}
        zonaNombre={formData.zona}
        cargaNombre={formData.carga}
        transportistaNombre={formData.transportista}
        shouldValidate={shouldValidate}
        dataVehiculos={dataVehiculos}
        dataZonas={dataZonas}
        dataCargas={dataCargas}
        dataTransportistas={dataTransportistas}
        onValorChange={onValorChange}
        onVehiculoChange={onVehiculoChange}
        onZonaChange={onZonaChange}
        onCargaChange={onCargaChange}
        onTransportistaChange={onTransportistaChange}
      />
      <TarifaAdicionalesSection
        adicionales={adicionales}
        mode={mode}
        onAgregarAdicional={onAgregarAdicional}
        onDeleteAdicional={onDeleteAdicional}
      />
      <TarifaResumenSection
        costoAdicionales={costoAdicionales}
        costoTotal={costoTotal}
      />
    </form>
  );
};

export default TarifaFormContent;
