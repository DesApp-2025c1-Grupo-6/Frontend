import TextInput from "@/src/components/TextInput";
import { ZonaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function ZonaForm({ id, title, mode, data, onSave }: ZonaFormProps) {
  const [nombre, setNombre] = useState("");

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      setNombre(data.nombre);
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!nombre) return; // No hace nada si el campo está vacío
    if (onSave) onSave(nombre);
    toggleModalVisibility(id);
    setNombre("");
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    setNombre("");
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
          value={nombre}
          disabled={mode === "view"}
          onChange={handleNombreChange}
          placeholder="Nombre"
        />
      </form>
    </Modal>
  );
}

export default ZonaForm;
