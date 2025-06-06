import { TarifaFormData, UseTarifaFormProps } from "@/src/types";
import { useEffect, useState } from "react";

export const useTarifaForm = ({
  mode,
  data,
  dataZonas,
  dataVehiculos,
  dataCargas,
  dataTransportistas,
}: UseTarifaFormProps) => {
  const [formData, setFormData] = useState<TarifaFormData>({
    zona: "",
    vehiculo: "",
    carga: "",
    transportista: "",
    valor: "",
    idZona: "",
    idVehiculo: "",
    idCarga: "",
    idTransportista: "",
  });

  const [shouldValidate, setShouldValidate] = useState(false);

  const resetForm = () => {
    setShouldValidate(false);
    setFormData({
      zona: "",
      vehiculo: "",
      carga: "",
      transportista: "",
      valor: "",
      idZona: "",
      idVehiculo: "",
      idCarga: "",
      idTransportista: "",
    });
  };

  const fillFormFromData = (data: any) => {
    const newFormData: TarifaFormData = {
      zona: data.zona ?? "",
      vehiculo: data.vehiculo ?? "",
      carga: data.carga ?? "",
      transportista: data.transportista ?? "",
      valor: data.valor_base ?? "",
      idZona: data.id_zona ?? "",
      idVehiculo: data.id_vehiculo ?? "",
      idCarga: data.id_carga ?? "",
      idTransportista: data.id_transportista ?? "",
    };

    // Si no hay IDs disponibles, intentar encontrarlos por el texto
    if (!data.id_zona && data.zona) {
      const zona = dataZonas?.find((z) => z.nombre === data.zona);
      if (zona) newFormData.idZona = String(zona.id);
    }
    if (!data.id_vehiculo && data.vehiculo) {
      const vehiculo = dataVehiculos?.find((v) => v.tipo === data.vehiculo);
      if (vehiculo) newFormData.idVehiculo = String(vehiculo.id);
    }
    if (!data.id_carga && data.carga) {
      const carga = dataCargas?.find((c) => c.tipo === data.carga);
      if (carga) newFormData.idCarga = String(carga.id);
    }
    if (!data.id_transportista && data.transportista) {
      const transportista = dataTransportistas?.find(
        (t) => t.nombre === data.transportista
      );
      if (transportista) newFormData.idTransportista = String(transportista.id);
    }

    setFormData(newFormData);
  };

  const updateField = (field: keyof TarifaFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (
    field: "zona" | "vehiculo" | "carga" | "transportista",
    selectedId: string,
    dataArray?: any[],
    nameField: string = "nombre"
  ) => {
    const selectedItem = dataArray?.find(
      (item) => String(item.id) === selectedId
    );

    const fieldMap = {
      zona: "idZona",
      vehiculo: "idVehiculo",
      carga: "idCarga",
      transportista: "idTransportista",
    };

    const nameFieldMap: Record<string, string> = {
      zona: "nombre",
      vehiculo: "tipo",
      carga: "tipo",
      transportista: "nombre",
    };

    updateField(fieldMap[field] as keyof TarifaFormData, selectedId);
    updateField(field, selectedItem?.[nameFieldMap[field]] || "");
  };

  const isFormValid = () => {
    return !!(
      formData.valor &&
      formData.zona &&
      formData.vehiculo &&
      formData.carga &&
      formData.transportista
    );
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      fillFormFromData(data);
    } else {
      resetForm();
    }
  }, [mode, data]);

  return {
    formData,
    shouldValidate,
    setShouldValidate,
    resetForm,
    fillFormFromData,
    updateField,
    handleSelectChange,
    isFormValid,
  };
};
