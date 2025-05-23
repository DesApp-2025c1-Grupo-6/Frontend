import TextInput from "@/src/components/TextInput";
import { TipoCargaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function TipoCargaForm({ id, title, mode, data, onSave }: TipoCargaFormProps) {
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setDescripcion(data.descripcion || "");
    } else if (mode === "create") {
      setDescripcion("");
    }
  }, [mode, data]);

  const handleDescripcionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);
  };

  const handleSave = () => {
    if (mode === "view") {
      toggleModalVisibility(id);
      return;
    }
    if (!descripcion) return;
    if (onSave) onSave(descripcion);
    toggleModalVisibility(id);
    if (mode === "create") setDescripcion("");
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    if (mode === "create") setDescripcion("");
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
          value={descripcion}
          disabled={mode === "view"}
          onChange={handleDescripcionChange}
          placeholder="Descripción"
        />
      </form>
    </Modal>
  );
}

export default TipoCargaForm;
