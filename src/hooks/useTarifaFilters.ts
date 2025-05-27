import { useState } from "react";
import { useFiltros } from "@/src/context/FiltrosContext";
import { FilterValues } from "@/src/types";

export const useTarifaFilters = () => {
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
  const [valoresAplicados, setValoresAplicados] = useState<FilterValues>({
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

  return {
    // Estados
    filtrosAplicados,
    valoresAplicados,
    filtroCarga,
    filtroVehiculo,
    filtroZona,
    filtroAdicional,
    filtroTransportista,

    // Handlers
    handleFiltroCarga,
    handleFiltroVehiculo,
    handleFiltroZona,
    handleFiltroAdicional,
    handleFiltroTransportista,
    onApplyFilters,
    onClearFilters,
  };
};
