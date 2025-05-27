import React from "react";
import { TarifaResumenSectionProps } from "@/src/types";

function TarifaResumenSection({
  costoAdicionales,
  costoTotal,
}: TarifaResumenSectionProps) {
  return (
    <section className="text-wild-sand-600">
      <div className="p-1 w-full bg-wild-sand-100 border-b border-wild-sand-600 flex justify-between">
        <span className="font-semibold text-sm">Costo adicionales:</span>
        <span>${costoAdicionales}</span>
      </div>
      <div className="p-1 w-full bg-wild-sand-100 flex justify-between">
        <span className="font-semibold text-sm">Costo total:</span>
        <span>${costoTotal}</span>
      </div>
    </section>
  );
}

export default TarifaResumenSection;
