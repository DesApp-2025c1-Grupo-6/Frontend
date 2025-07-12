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
    console.log("Data before filtering:", data);

    if (filtrosAplicados) {
      if (valoresAplicados.carga) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.carga == valoresAplicados.carga
        );
      }
      if (valoresAplicados.vehiculo) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.vehiculo == valoresAplicados.vehiculo
        );
      }
      if (valoresAplicados.zona) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.zona == valoresAplicados.zona
        );
      }
      if (valoresAplicados.transportista) {
        filteredData = filteredData.filter(
          (tarifa) => tarifa.transportista == valoresAplicados.transportista
        );
      }
      if (valoresAplicados.adicional) {
        filteredData = filteredData.filter((tarifa) =>
          tarifa.adicionales?.some(
            (adicional) => adicional.tipo == valoresAplicados.adicional
          )
        );
      }
    }

    return filteredData.map((tarifa) => {
      const costoTotal =
        Number(tarifa.valor_base || 0) +
        Number(
          tarifa.adicionales?.reduce((acc, adicional) => {
            let costo = 0;
            if (
              adicional.costo_personalizado !== undefined &&
              adicional.costo_personalizado !== null &&
              adicional.costo_personalizado !== ""
            ) {
              costo = Number(adicional.costo_personalizado);
            } else {
              costo = Number(adicional.costo ?? 0);
            }
            return acc + (isNaN(costo) ? 0 : costo);
          }, 0) || 0
        );
      return {
        id: tarifa.id,
        zona: tarifa.zona || "",
        vehiculo: tarifa.vehiculo || "",
        carga: tarifa.carga || "",
        transportista: tarifa.transportista || "",
        costo: `$${costoTotal}`,
      };
    });
  }, [data, filtrosAplicados, valoresAplicados]);

  return {
    tableData,
  };
};
