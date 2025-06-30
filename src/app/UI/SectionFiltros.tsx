import Button from "@/src/components/Button";
import React from "react";

function SectionFiltros({
  children,
  onClear,
  onApply,
}: {
  children?: React.ReactNode;
  onClear?: () => void;
  onApply?: () => void;
}) {
  return (
    <section className="flex flex-col gap-4 px-4 sm:px-6 py-4 bg-gray-100 shadow-md rounded-2xl border border-gray-300">
      <h3 className="text-lg w-full text-left font-semibold text-wild-sand-600">
        Filtros
      </h3>

      {/* ⬇️ Filtros responsive */}
      <section className="flex flex-col lg:flex-row gap-3 w-full justify-start items-stretch">
        {children}
      </section>

      {/* Botones */}
      <div className="w-full flex flex-wrap justify-end items-center gap-2">
        {onClear && <Button onClick={onClear} text="Limpiar filtros" line />}
        {onApply && <Button onClick={onApply} text="Aplicar filtros" />}
      </div>
    </section>
  );
}

export default SectionFiltros;
