import { useCargas } from "./useCargas";
import { useVehiculos } from "./useVehiculos";
import { useZonas } from "./useZonas";
import { useAdicional } from "./useAdicional";
import { useTransportista } from "./useTransportista";
import { useTipoCargas } from "./useTipoCargas";

export const useTarifaFormData = () => {
  const { data: cargas } = useCargas();
  const { data: vehiculos } = useVehiculos();
  const { data: zonas } = useZonas();
  const { data: adicionales } = useAdicional();
  const { data: transportistas } = useTransportista();
  const { data: tipoDeCarga } = useTipoCargas();
  return {
    cargas,
    vehiculos,
    zonas,
    adicionales,
    transportistas,
    tipoDeCarga,
  };
};
