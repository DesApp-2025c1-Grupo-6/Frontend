import React from "react";
import Filtro from "@/src/components/Filtro";
import SectionFiltros from "@/src/app/UI/SectionFiltros";
import { FiltrosSectionProps } from "@/src/types";

const FiltrosSection: React.FC<FiltrosSectionProps> = ({
  onApply,
  onClear,
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
  cargas,
  vehiculos,
  zonas,
  adicionales,
  transportistas,
}) => {
  return (
    <SectionFiltros onApply={onApply} onClear={onClear}>
      {" "}
      <Filtro
        onChange={handleFiltroCarga}
        data={cargas || []}
        placeholder="Cargas"
        title="Cargas"
        value={filtroCarga}
      />
      <Filtro
        onChange={handleFiltroVehiculo}
        data={vehiculos || []}
        placeholder="Vehículos"
        title="Vehículos"
        value={filtroVehiculo}
      />
      <Filtro
        onChange={handleFiltroZona}
        data={zonas || []}
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
  );
};

export default FiltrosSection;
