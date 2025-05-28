import React from "react";
import { ModalTipoAdicionalProps } from "@/src/types";
import Modal from "./Modal";
import SelectInput from "@/src/components/SelectInput";
import TextInput from "@/src/components/TextInput";

function ModalTipoAdicional({
  id,
  dataAdicionales,
  adicionalSeleccionado,
  costoAdicionalSeleccionado,
  customCostoAdicional,
  shouldValidate,
  errorMessage,
  handleChangeCustomCostoAdicional,
  handleChangeAdicionales,
  handleSaveTipoAdicional,
  handleCancelTipoAdicional,
}: ModalTipoAdicionalProps) {
  return (
    <Modal
      id={id}
      title="Seleccione un tipo de adicional"
      lineButton
      fillButton
      lineButtonText="Cancelar"
      fillButtonText="Agregar"
      fillButtonAction={handleSaveTipoAdicional}
      lineButtonAction={handleCancelTipoAdicional}
    >
      <form className="flex flex-col gap-4">
        {" "}
        <SelectInput
          id="tipo_Adicional"
          label="Tipo de adicional"
          options={
            (dataAdicionales ?? []).map((adicional) => ({
              value: String(adicional.id),
              label: adicional.tipo,
            })) ?? []
          }
          value={
            adicionalSeleccionado?.id ? String(adicionalSeleccionado.id) : ""
          }
          errorMessage={errorMessage}
          shouldValidate={shouldValidate}
          onChange={handleChangeAdicionales}
        />
        <TextInput
          type="text"
          value={
            costoAdicionalSeleccionado && costoAdicionalSeleccionado !== ""
              ? `$${costoAdicionalSeleccionado}`
              : ""
          }
          placeholder="Costo"
          disabled
        />
        <TextInput
          type="number"
          placeholder="Costo personalizado"
          value={customCostoAdicional}
          onChange={handleChangeCustomCostoAdicional}
        />
      </form>
    </Modal>
  );
}

export default ModalTipoAdicional;
