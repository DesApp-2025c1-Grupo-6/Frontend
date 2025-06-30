import TextInput from "@/src/components/TextInput";
import { TransportistaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";

function TransportistaForm({
  id,
  title,
  mode,
  data,
  onSave,
}: TransportistaFormProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [shouldValidate, setShouldValidate] = useState(false);

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };
  const handleTelefonoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelefono(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const resetForm = () => {
    setShouldValidate(false);
    setNombre("");
    setTelefono("");
    setEmail("");
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setNombre(data.nombre);
      setTelefono(data.telefono);
      setEmail(data.email);
    }
  }, [mode, data]);

  const handleSave = () => {
    if (!nombre || !telefono || !email) {
      setShouldValidate(true);
      return;
    }
    if (onSave) {
      onSave(nombre, telefono, email);
    }
    toggleModalVisibility(id);
    resetForm();
  };

  const onCancel = () => {
    toggleModalVisibility(id);

    if (mode === "create") {
      resetForm();
    } else if (mode === "edit" && data) {
      setNombre(data.nombre);
      setTelefono(data.telefono);
      setEmail(data.email);
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
      <form>
        <TextInput
          value={telefono}
          shouldValidate={shouldValidate && telefono === ""}
          type="text"
          onChange={handleTelefonoChange}
          placeholder="Teléfono"
        />
      </form>
      <form>
        <TextInput
          value={email}
          shouldValidate={shouldValidate && email === ""}
          type="email"
          onChange={handleEmailChange}
          placeholder="Email"
        />
      </form>
    </Modal>
  );
}

export default TransportistaForm;
