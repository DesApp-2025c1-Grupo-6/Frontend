import {
  TarifaFormData,
  Adicional,
  UseTarifaFormActionsProps,
} from "@/src/types";
import { toggleModalVisibility } from "@/src/app/utils/utils";

export const useTarifaFormActions = ({
  id,
  mode,
  formData,
  adicionales,
  data,
  isFormValid,
  setShouldValidate,
  resetForm,
  fillFormFromData,
  onSave,
}: UseTarifaFormActionsProps) => {
  const handleSave = () => {
    if (!isFormValid()) {
      setShouldValidate(true);
      return;
    }

    if (onSave) {
      onSave({
        valor: formData.valor,
        id_zona: formData.idZona,
        id_vehiculo: formData.idVehiculo,
        id_carga: formData.idCarga,
        id_transportista: formData.idTransportista,
        adicionales,
      });
    }

    toggleModalVisibility(id);
    if (mode === "create") resetForm();
  };

  const onCancel = () => {
    toggleModalVisibility(id);
    if (mode === "create") {
      resetForm();
    } else if (mode === "edit" && data) {
      fillFormFromData(data);
      setShouldValidate(false);
    }
  };

  return {
    handleSave,
    onCancel,
  };
};
