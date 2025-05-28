import { useCargas } from "./useCargas";
import { useVehiculos } from "./useVehiculos";
import { useZonas } from "./useZonas";
import { useAdicional } from "./useAdicional";
import { useTransportista } from "./useTransportista";

export const useTarifaFormData = () => {
  const { data: cargas } = useCargas();
  const { data: vehiculos } = useVehiculos();
  const { data: zonas } = useZonas();
  const { data: adicionales } = useAdicional();
  const { data: transportistas } = useTransportista();
  return {
    cargas,
    vehiculos,
    zonas,
    adicionales,
    transportistas,
  };
};
