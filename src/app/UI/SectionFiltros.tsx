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
    <section className="flex flex-col gap-4 px-5 py-3 bg-gray-100 shadow-md rounded-2xl border-gray-300">
      <h3 className="text-lg w-full text-left font-semibold text-wild-sand-600">
        Filtros
      </h3>
      <section className="flex gap-2 w-full justify-around items-center">
        {children}
      </section>
      <div className="w-full flex gap-2 justify-end items-center">
        {onClear && <Button onClick={onClear} text="Limpiar filtros" line />}
        {onApply && <Button onClick={onApply} text="Aplicar filtros" />}
      </div>
    </section>
  );
}

export default SectionFiltros;
