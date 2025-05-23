import TextInput from "@/src/components/TextInput";
import { ZonaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function ZonaForm({ id, title, mode, data, onSave }: ZonaFormProps) {
  const [nombre, setNombre] = useState("");
  const [shouldValidate, setShouldValidate] = useState(false);

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const resetForm = () => {
    setShouldValidate(false);
    setNombre("");
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setNombre(data.nombre);
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!nombre) {
      setShouldValidate(true);
      return;
    }
    if (onSave) onSave(nombre);
    toggleModalVisibility(id);
    resetForm();
  };

  const onCancel = () => {
    toggleModalVisibility(id);

    if (mode === "create") {
      resetForm();
    } else if (mode === "edit" && data) {
      setNombre(data.nombre);
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
      fillButtonText="Guardar"
      fillButtonAction={handleSave}
      lineButtonAction={onCancel}
    >
      <form>
        <TextInput
          value={nombre}
          shouldValidate={shouldValidate && nombre === ""}
          type="text"
          onChange={handleNombreChange}
          placeholder="Nombre"
        />
      </form>
    </Modal>
  );
}

export default ZonaForm;
