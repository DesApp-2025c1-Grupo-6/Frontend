import TextInput from "@/src/components/TextInput";
import { CargaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";
import AsyncSelect from "react-select/async";
import { getTipoCargas } from "@/src/services/fetchDataTipoCarga";

function CargaForm({ id, title, mode, data, onSave }: CargaFormProps) {
  const [peso, setPeso] = useState("");
  const [volumen, setVolumen] = useState("");
  const [tipoCarga, setTipoCarga] = useState("");

  const handlePesoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeso(event.target.value);
  };
  const handleVolumenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolumen(event.target.value);
  };
  const handleTipoCargaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoCarga(event.target.value);
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setPeso(data.peso);
    }
  }, [mode, data]);
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setVolumen(data.volumen);
    }
  }, [mode, data]);
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setTipoCarga(data.tipoCarga);
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!peso || !volumen || !tipoCarga) return; // No hace nada si el campo está vacío
    if (onSave) onSave(peso, volumen, tipoCarga);
    toggleModalVisibility(id);
    setPeso("");
    setVolumen("");
    setTipoCarga("");
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    setPeso("");
    setVolumen("");
    setTipoCarga("");
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
      <form>
        <TextInput
          value={peso}
          disabled={mode === "view"}
          onChange={handlePesoChange}
          placeholder="Peso"
        />
      </form>
      <form>
        <TextInput
          value={volumen}
          disabled={mode === "view"}
          onChange={handleVolumenChange}
          placeholder="Volumen"
        />
      </form>
      <form>
        {/*<TextInput
          value={tipoCarga}
          disabled={mode === "view"}
          onChange={handleTipoCargaChange}
          placeholder="Tipo de Carga"
        />*/}
        <AsyncSelect
          isDisabled={mode === "view"}
          loadOptions={(inputValue) => getTipoCargas()}
          onChange={(selectedOption) => {
            setTipoCarga(selectedOption?.inputValue || "");
          }}
          placeholder="Tipo de Carga"
        />
      </form>
    </Modal>
  );
}

export default CargaForm;
