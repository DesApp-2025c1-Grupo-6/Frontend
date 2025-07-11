import TextInput from "@/src/components/TextInput";
import { TipoCargaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function TipoCargaForm({ id, title, mode, data, onSave }: TipoCargaFormProps) {
  const [descripcion, setDescripcion] = useState("");
  const [shouldValidate, setShouldValidate] = useState(false);

  const resetForm = () => {
    setShouldValidate(false);
    setDescripcion("");
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setDescripcion(data.descripcion ?? "");
    } else {
      setDescripcion("");
    }
  }, [mode, data]);

  const handleDescripcionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);
  };

  const handleSave = () => {
    if (!descripcion) {
      setShouldValidate(true);
      return;
    }
    if (onSave) onSave(descripcion);
    toggleModalVisibility(id);
    if (mode === "create") resetForm();
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    if (mode === "create") {
      resetForm();
    } else if (mode === "edit" && data) {
      setDescripcion(data.descripcion ?? "");
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
          type="text"
          shouldValidate={shouldValidate && descripcion === ""}
          value={descripcion}
          onChange={handleDescripcionChange}
          placeholder="Ej: Carga Refrigerada, Carga Peligrosa, etc."
          label="Descripción"
        />
      </form>
    </Modal>
  );
}

export default TipoCargaForm;
