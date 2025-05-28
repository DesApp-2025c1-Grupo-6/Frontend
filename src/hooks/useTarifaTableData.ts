import { UseTableDataProps } from "@/src/types";
import { useMemo } from "react";

export const useTarifaTableData = ({
  data,
  filtrosAplicados,
  valoresAplicados,
}: UseTableDataProps) => {
  // Transformar los datos para la tabla para mostrar solo los textos
  const tableData = useMemo(() => {
    let filteredData = data;

    if (filtrosAplicados) {
      if (valoresAplicados.carga) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_carga == valoresAplicados.carga
        );
      }
      if (valoresAplicados.vehiculo) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_vehiculo == valoresAplicados.vehiculo
        );
      }
      if (valoresAplicados.zona) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_zona == valoresAplicados.zona
        );
      }
      if (valoresAplicados.transportista) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.id_transportista == valoresAplicados.transportista
        );
      }
      if (valoresAplicados.adicional) {
        filteredData = filteredData.filter((tarifa) =>
          tarifa.adicionales?.some(
            (adicional) => adicional.id == valoresAplicados.adicional
          )
        );
      }
    }

    return filteredData.map((tarifa) => ({
      id: tarifa.id,
      zona: tarifa.zona || "",
      vehiculo: tarifa.vehiculo || "",
      carga: tarifa.carga || "",
      transportista: tarifa.transportista || "",
    }));
  }, [data, filtrosAplicados, valoresAplicados]);

  return {
    tableData,
  };
};
