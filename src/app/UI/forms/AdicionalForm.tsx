import TextInput from "@/src/components/TextInput";
import { AdicionalFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function AdicionalForm({ id, title, mode, data, onSave }: AdicionalFormProps) {
  const [tipo, setTipo] = useState("");
  const [costo_default, setCosto_default] = useState("");
  const [shouldValidate, setShouldValidate] = useState(false);

  const handleTipoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };
  const handleCostoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCosto_default(event.target.value);
  };

  const resetForm = () => {
    setShouldValidate(false);
    setTipo("");
    setCosto_default("");
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setTipo(data.tipo);
      setCosto_default(data.costo_default);
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!tipo || !costo_default) {
      setShouldValidate(true);
      return;
    }
    if (onSave) onSave(tipo, costo_default);
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
      setTipo(data.tipo);
      setCosto_default(data.costo_default);
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
          value={tipo}
          shouldValidate={shouldValidate && tipo === ""}
          type="text"
          onChange={handleTipoChange}
          placeholder="Tipo"
        />
      </form>
      <form>
        <TextInput
          value={costo_default}
          shouldValidate={shouldValidate && costo_default === ""}
          type="text"
          onChange={handleCostoChange}
          placeholder="Costo"
        />
      </form>
    </Modal>
  );
}
export default AdicionalForm;
