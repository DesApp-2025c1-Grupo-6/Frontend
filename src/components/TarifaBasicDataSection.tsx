import TextInput from "@/src/components/TextInput";
import SelectInput from "@/src/components/SelectInput";
import React from "react";
import { TarifaBasicDataSectionProps } from "@/src/types";

function TarifaBasicDataSection({
  mode,
  valor,
  vehiculo,
  zona,
  carga,
  transportista,
  vehiculoNombre,
  zonaNombre,
  cargaNombre,
  transportistaNombre,
  shouldValidate,
  dataVehiculos,
  dataZonas,
  dataCargas,
  dataTransportistas,
  onValorChange,
  onVehiculoChange,
  onZonaChange,
  onCargaChange,
  onTransportistaChange,
}: TarifaBasicDataSectionProps & {
  vehiculoNombre?: string;
  zonaNombre?: string;
  cargaNombre?: string;
  transportistaNombre?: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-wild-sand-600">
        Datos basicos
      </h3>
      {mode !== "view" ? (
        <>
          <TextInput
            type="number"
            id="valor_base"
            shouldValidate={shouldValidate && (valor || "") === ""}
            value={valor || ""}
            onChange={onValorChange}
            placeholder="Costo base"
          />
          <SelectInput
            id="vehiculo"
            label="Vehículo"
            shouldValidate={shouldValidate && (vehiculo || "") === ""}
            value={vehiculo || ""}
            onChange={onVehiculoChange}
            options={(dataVehiculos ?? []).map((vehiculo) => ({
              value: vehiculo.id,
              label: vehiculo.tipo,
            }))}
          />
          <SelectInput
            id="zona"
            label="Zona"
            shouldValidate={shouldValidate && (zona || "") === ""}
            value={zona || ""}
            onChange={onZonaChange}
            options={(dataZonas ?? []).map((zona) => ({
              value: zona.id,
              label: zona.nombre,
            }))}
          />
          <SelectInput
            id="carga"
            label="Carga"
            shouldValidate={shouldValidate && (carga || "") === ""}
            value={carga || ""}
            onChange={onCargaChange}
            options={(dataCargas ?? []).map((carga) => ({
              value: carga.id,
              label: carga.tipo,
            }))}
          />
          <SelectInput
            id="transportista"
            label="Transportista"
            shouldValidate={shouldValidate && (transportista || "") === ""}
            value={transportista || ""}
            onChange={onTransportistaChange}
            options={(dataTransportistas ?? []).map((transportista) => ({
              value: transportista.id,
              label: transportista.nombre,
            }))}
          />
        </>
      ) : (
        <>
          {/* En modo view, mostrar los nombres descriptivos */}
          <TextInput
            label="Costo base"
            type="text"
            value={valor || ""}
            disabled
          />
          <TextInput
            label="Vehiculo"
            type="text"
            value={vehiculoNombre || ""}
            disabled
          />
          <TextInput
            label="Zona"
            type="text"
            value={zonaNombre || ""}
            disabled
          />
          <TextInput
            label="Carga"
            type="text"
            value={cargaNombre || ""}
            disabled
          />
          <TextInput
            label="Transportista"
            type="text"
            value={transportistaNombre || ""}
            disabled
          />
        </>
      )}
    </section>
  );
}

export default TarifaBasicDataSection;
