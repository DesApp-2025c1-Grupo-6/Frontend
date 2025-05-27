import React from "react";
import SelectInput from "./SelectInput";

function Filtro({
  title,
  placeholder,
  data,
  onChange,
  value,
}: {
  title: string;
  placeholder: string;
  data: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}) {
  return (
    <section className="flex flex-col justify-center items-center w-full">
      <h3 className="text-md w-full text-left font-semibold text-wild-sand-600">
        {title}
      </h3>
      <SelectInput
        id={"filtro-select-" + title}
        label={title}
        options={[
          { value: "", label: "Ninguno" },
          ...data.map((item) => ({
            value: item.id,
            label: item.nombre || item.tipo || item.descripcion || item,
          })),
        ]}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full"
        shouldValidate={false}
      />
    </section>
  );
}

export default Filtro;
