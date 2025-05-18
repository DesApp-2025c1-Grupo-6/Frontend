import TextInput from "@/src/components/TextInput";
import { VehiculoFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function VehiculoForm({ id, title, mode, data, onSave }: VehiculoFormProps) {
  const [tipo, setTipo] = useState("");
  const [toneladas, setToneladas] = useState("");

  const handleTipoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };

  const handleToneladasChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToneladas(event.target.value);
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setTipo(data.tipo || "");
      setToneladas(data.toneladas ? String(data.toneladas) : "");
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!tipo || !toneladas) return; // No hace nada si algún campo está vacío
    if (onSave) onSave({ tipo, toneladas });
    toggleModalVisibility(id);
    setTipo("");
    setToneladas("");
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    setTipo("");
    setToneladas("");
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
      <form className="flex flex-col gap-3">
        <TextInput
          value={tipo}
          disabled={mode === "view"}
          onChange={handleTipoChange}
          placeholder="Tipo"
        />
        <TextInput
          value={toneladas}
          disabled={mode === "view"}
          onChange={handleToneladasChange}
          placeholder="Toneladas"
        />
      </form>
    </Modal>
  );
}

export default VehiculoForm;
