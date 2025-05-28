import { UseCostCalculationProps } from "@/src/types";
import { useEffect, useState } from "react";

export const useTarifaCostCalculation = ({
  adicionales,
  valor,
}: UseCostCalculationProps) => {
  const [costoAdicionales, setCostoAdicionales] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);

  useEffect(() => {
    if (!adicionales || adicionales.length === 0) {
      setCostoAdicionales(0);
      setCostoTotal(Number(valor) || 0);
      return;
    }

    const sumaAdicionales = adicionales.reduce((acc, adicional) => {
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
    }, 0);

    setCostoAdicionales(sumaAdicionales);
    const valorBase = Number(valor);
    setCostoTotal((isNaN(valorBase) ? 0 : valorBase) + sumaAdicionales);
  }, [adicionales, valor]);

  const loadCosts = (data: any) => {
    setCostoAdicionales(data.costoAdicionales ?? 0);
    setCostoTotal(data.costoTotal ?? 0);
  };

  return {
    costoAdicionales,
    costoTotal,
    loadCosts,
  };
};
