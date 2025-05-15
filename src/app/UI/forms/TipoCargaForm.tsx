import TextInput from "@/src/components/TextInput";
import { TipoCargaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function TipoCargaForm({ id, title, mode, data, onSave }: TipoCargaFormProps) {
  const [descripcion, setDescripcion] = useState("");

  const handleDescripcionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setDescripcion(data.descripcion);
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!descripcion) return; // No hace nada si el campo está vacío
    if (onSave) onSave(descripcion);
    toggleModalVisibility(id);
    setDescripcion("");
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    setDescripcion("");
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
          value={descripcion}
          disabled={mode === "view"}
          onChange={handleDescripcionChange}
          placeholder="Descripcion"
        />
      </form>
    </Modal>
  );
}

export default TipoCargaForm;
