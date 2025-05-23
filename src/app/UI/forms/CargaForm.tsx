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
  const [requisitosEspeciales, setRequisitosEspeciales] = useState("");

  const resetForm = () => {
    setPeso("");
    setVolumen("");
    setTipoDeCarga("");
    setRequisitosEspeciales("");
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
    if ((mode === "edit" || mode === "view") && data) {
      setPeso(data.peso || "");
      setVolumen(data.volumen || "");
      // Buscar el id del tipo de carga a partir de la descripción si es necesario
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
      setRequisitosEspeciales(data.requisitos || "");
    }
  }, [mode, data, dataTipoDeCargas]);

  const handleSave = () => {
    if (mode === "view") {
      toggleModalVisibility(id);
      return;
    }

    if (!peso || !volumen || !tipoDeCarga) return;
    if (onSave) onSave(peso, volumen, tipoDeCarga, requisitosEspeciales);
    toggleModalVisibility(id);

    if (mode === "create") {
      resetForm();
    }
  };

  const onCancel = () => {
    if (mode === "edit") {
      toggleModalVisibility(id);
      return;
    }
    toggleModalVisibility(id);
    resetForm();
  };

  return (
    <Modal
      id={id}
      title={title}
      lineButton={mode !== "view"}
      fillButton
      lineButtonText="Cancelar"
      fillButtonText={mode === "view" ? "Cerrar" : "Guardar"}
      fillButtonAction={handleSave}
      lineButtonAction={onCancel}
    >
      <form className="flex flex-col gap-4">
        <TextInput
          value={peso}
          disabled={mode === "view"}
          onChange={handlePesoChange}
          placeholder="Peso"
        />
        <TextInput
          value={volumen}
          disabled={mode === "view"}
          onChange={handleVolumenChange}
          placeholder="Volumen"
        />
        {mode !== "view" ? (
          <SelectInput
            id="tipoCarga"
            label="Tipo de Carga"
            value={tipoDeCarga}
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
        ) : (
          <TextInput value={tipoDeCarga} disabled />
        )}
        <TextInput
          value={requisitosEspeciales}
          disabled={mode === "view"}
          onChange={handleRequisitosEspecialesChange}
          placeholder="Requisitos Especiales"
        />
      </form>
    </Modal>
  );
}

export default CargaForm;
