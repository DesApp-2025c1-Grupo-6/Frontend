import { useCargas } from "./useCargas";
import { useVehiculos } from "./useVehiculos";
import { useZonas } from "./useZonas";

export const useTarifaFormData = () => {
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

  return {
    cargas,
    vehiculos,
    zonas,
    adicionales,
    transportistas,
  };
};
