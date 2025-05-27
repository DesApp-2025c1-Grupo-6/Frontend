import React from "react";
import Button from "@/src/components/Button";
import Plus from "@/src/icons/Plus";
import TableAdicional from "./TableAdicional";
import { TarifaAdicionalesSectionProps } from "@/src/types";

function TarifaAdicionalesSection({
  adicionales,
  mode,
  onAgregarAdicional,
  onDeleteAdicional,
}: TarifaAdicionalesSectionProps & { onDeleteAdicional: (id: any) => void }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-wild-sand-600">Adicionales</h3>
      <section className="flex flex-col gap-2">
        {mode !== "view" && (
          <Button
            line
            Icon={Plus}
            text="Agregar adicional"
            onClick={onAgregarAdicional}
          />
        )}
        {adicionales && adicionales.length > 0 ? (
          <TableAdicional
            mode={mode}
            data={adicionales}
            onDelete={onDeleteAdicional}
          />
        ) : (
          <p className="text-sm text-wild-sand-600 text-center text-wild-sand-500">
            No hay adicionales registrados.
          </p>
        )}
      </section>
    </section>
  );
}

export default TarifaAdicionalesSection;
