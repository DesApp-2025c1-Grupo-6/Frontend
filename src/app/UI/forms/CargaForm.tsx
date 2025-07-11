import TextInput from "@/src/components/TextInput";
import { CargaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";
import SelectInput from "@/src/components/SelectInput";

function CargaForm({
  id,
  title,
  mode,
  data,
  dataTipoDeCargas,
  onSave,
}: CargaFormProps) {
  const [peso, setPeso] = useState("");
  const [volumen, setVolumen] = useState("");
  const [tipoDeCarga, setTipoDeCarga] = useState("");
  const [requisitosEspeciales, setRequisitosEspeciales] = useState("Ninguno");
  const [shouldValidate, setShouldValidate] = useState(false);

  const resetForm = () => {
    setShouldValidate(false);
    setPeso("");
    setVolumen("");
    setTipoDeCarga("");
    setRequisitosEspeciales("");
  };

  const fillFormFromData = (data: any, dataTipoDeCargas: any[]) => {
    setPeso(data.peso ?? "");
    setVolumen(data.volumen ?? "");
    if (dataTipoDeCargas && data.tipo) {
      const tipoEncontrado = dataTipoDeCargas.find(
        (t) =>
          t.descripcion === data.tipo ||
          t.id.toString() === data.tipo.toString()
      );
      setTipoDeCarga(tipoEncontrado ? tipoEncontrado.id.toString() : "");
    } else {
      setTipoDeCarga("");
    }
    setRequisitosEspeciales(data.requisitos ?? "");
  };

  const handlePesoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeso(event.target.value);
  };
  const handleVolumenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolumen(event.target.value);
  };
  const handleTipoDeCargaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTipoDeCarga(event.target.value);
  };
  const handleRequisitosEspecialesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequisitosEspeciales(event.target.value);
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      fillFormFromData(data, dataTipoDeCargas || []);
    }
  }, [mode, data, dataTipoDeCargas]);

  const handleSave = () => {
    if (!peso || !volumen || !tipoDeCarga) {
      setShouldValidate(true);
      return;
    }
    if (onSave) onSave(peso, volumen, tipoDeCarga, requisitosEspeciales);
    toggleModalVisibility(id);

    if (mode === "create") {
      resetForm();
    }
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    if (mode === "create") {
      resetForm();
    } else if (mode === "edit" && data) {
      fillFormFromData(data, dataTipoDeCargas || []);
      setShouldValidate(false);
    }
  };

  return (
    <Modal
      id={id}
      title={title}
      lineButton
      fillButton
      lineButtonText="Cancelar"
      fillButtonText={mode === "view" ? "Cerrar" : "Guardar"}
      fillButtonAction={handleSave}
      lineButtonAction={onCancel}
    >
      <form className="flex flex-col gap-4">
        <TextInput
          value={peso}
          onChange={handlePesoChange}
          label="Peso"
          placeholder="kilogramos"
          type="number"
          shouldValidate={peso === "" && shouldValidate}
        />
        <TextInput
          value={volumen}
          onChange={handleVolumenChange}
          label="Volumen"
          placeholder="Metros cúbicos"
          type="number"
          shouldValidate={volumen === "" && shouldValidate}
        />
        <SelectInput
          id="tipoCarga"
          label="Tipo"
          value={tipoDeCarga}
          errorMessage="Debe seleccionar un tipo de carga"
          shouldValidate={tipoDeCarga === "" && shouldValidate}
          onChange={handleTipoDeCargaChange}
          options={
            dataTipoDeCargas
              ? dataTipoDeCargas?.map((tipoCarga) => {
                  return {
                    value: tipoCarga.id.toString(),
                    label: tipoCarga.descripcion,
                  };
                })
              : []
          }
        />
        <TextInput
          value={requisitosEspeciales}
          type="text"
          label="Requisitos Especiales"
          onChange={handleRequisitosEspecialesChange}
        />
      </form>
    </Modal>
  );
}

export default CargaForm;
