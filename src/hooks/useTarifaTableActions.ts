import { toggleModalVisibility } from "@/src/app/utils/utils";
import { UseTableActionsProps } from "@/src/types";

export const useTarifaTableActions = ({
  data,
  setSelectedRow,
}: UseTableActionsProps) => {
  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = (row: any) => {
    const dataRow = data.find((t) => t.id === row.id);
    setSelectedRow(dataRow);
    toggleModalVisibility("editTarifa");
  };

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = (id: string | number) => {
    const row = data.find((row) => row.id === id);
    setSelectedRow(row);
    toggleModalVisibility("deleteTarifa");
  };

  // Handler para abrir el modal de visualización con la fila seleccionada
  const handleView = (row: any) => {
    const dataRow = data.find((t) => t.id === row.id);
    setSelectedRow(dataRow);
    toggleModalVisibility("viewTarifa");
  };

  // Handler para abrir el modal de creación
  const handleCreate = () => {
    toggleModalVisibility("createTarifa");
  };

  return {
    handleEdit,
    handleDeleteRequest,
    handleView,
    handleCreate,
  };
};
