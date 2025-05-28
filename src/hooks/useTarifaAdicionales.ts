import { useState } from "react";
import { Adicional, UseAdicionalesProps } from "@/src/types";

export const useTarifaAdicionales = ({
  dataAdicionales,
}: UseAdicionalesProps) => {
  const [adicionales, setAdicionales] = useState<Adicional[]>([]);
  const [adicionalSeleccionado, setAdicionalSeleccionado] = useState<any>(null);
  const [costoAdicionalSeleccionado, setCostoAdicionalSeleccionado] =
    useState("");
  const [customCostoAdicional, setCustomCostoAdicional] = useState("");
  const [shouldValidateTipoAdicional, setShouldValidateTipoAdicional] =
    useState(false);
  const [errorMessageTipoAdicional, setErrorMessageTipoAdicional] =
    useState("");

  const resetAdicionales = () => {
    setAdicionales([]);
    setAdicionalSeleccionado(null);
    setCostoAdicionalSeleccionado("");
    setCustomCostoAdicional("");
  };

  const resetFormTipoAdicional = () => {
    setShouldValidateTipoAdicional(false);
    setErrorMessageTipoAdicional("");
    setAdicionalSeleccionado(null);
    setCostoAdicionalSeleccionado("");
    setCustomCostoAdicional("");
  };

  const handleChangeAdicionales = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const adicional = dataAdicionales?.find(
      (adicional) => String(adicional.id) === event.target.value
    );
    setAdicionalSeleccionado(adicional || null);

    if (customCostoAdicional) {
      setCostoAdicionalSeleccionado(customCostoAdicional);
    } else {
      setCostoAdicionalSeleccionado(
        adicional?.costo_default !== undefined &&
          adicional?.costo_default !== null
          ? String(adicional.costo_default)
          : ""
      );
    }
  };

  const handleChangeCustomCostoAdicional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomCostoAdicional(event.target.value);
  };

  const addAdicional = () => {
    if (!adicionalSeleccionado) {
      setErrorMessageTipoAdicional("Debe seleccionar un tipo de adicional");
      setShouldValidateTipoAdicional(true);
      return false;
    }

    // Evitar duplicados por id
    if (adicionales.some((a) => a.id === adicionalSeleccionado.id)) {
      setErrorMessageTipoAdicional("El tipo de adicional ya ha sido agregado");
      setShouldValidateTipoAdicional(true);
      return false;
    }

    setAdicionales((prev) => [
      ...prev,
      {
        ...adicionalSeleccionado,
        costo:
          costoAdicionalSeleccionado ||
          adicionalSeleccionado.costo_default ||
          0,
        costo_personalizado: customCostoAdicional || "",
      },
    ]);

    resetFormTipoAdicional();
    return true;
  };

  const removeAdicional = (id: number) => {
    setAdicionales((prev) => prev.filter((a) => a.id !== id));
  };
  const loadAdicionales = (data: Adicional[] | null | undefined) => {
    setAdicionales(data || []);
  };

  return {
    adicionales,
    adicionalSeleccionado,
    costoAdicionalSeleccionado,
    customCostoAdicional,
    shouldValidateTipoAdicional,
    errorMessageTipoAdicional,
    setAdicionales,
    resetAdicionales,
    resetFormTipoAdicional,
    handleChangeAdicionales,
    handleChangeCustomCostoAdicional,
    addAdicional,
    removeAdicional,
    loadAdicionales,
  };
};
