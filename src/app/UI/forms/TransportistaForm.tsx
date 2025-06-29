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
    const valor = event.target.value;

    // Permitir solo números, guiones y paréntesis
    const soloPermitidos = /^[0-9\-\(\)\s]*$/;

    if (soloPermitidos.test(valor)) {
      setTelefono(valor);
    }
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

  const isValidEmail = (email: string) => {
    // Expresión regular simple para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidTelefono = (telefono: string) => {
    const telefonoRegex = /^[0-9\-\(\)\s]+$/;
    return telefonoRegex.test(telefono);
  };

  const handleSave = () => {
    if (!nombre || !telefono || !isValidTelefono(telefono)) {
      setShouldValidate(true);
      return;
    }

    if (email && !isValidEmail(email)) {
      setShouldValidate(true);
      return;
    }

    if (onSave) {
      const trimmedEmail = email.trim();
      onSave(nombre, telefono, trimmedEmail === "" ? null : trimmedEmail);
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
          shouldValidate={
            shouldValidate && (telefono === "" || !isValidTelefono(telefono))
          }
          type="text"
          onChange={handleTelefonoChange}
          placeholder="Teléfono"
        />
      </form>
      <form>
        <TextInput
          value={email}
          shouldValidate={
            shouldValidate && email !== "" && !isValidEmail(email)
          }
          type="email"
          onChange={handleEmailChange}
          placeholder="Email"
        />
      </form>
    </Modal>
  );
}

export default TransportistaForm;
