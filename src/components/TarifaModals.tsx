import TarifaForm from "@/src/app/UI/forms/TarifaForm";
import Modal from "@/src/app/UI/Modal";
import {
  mapTarifaDataToTarifa,
  toggleModalVisibility,
} from "@/src/app/utils/utils";
import { TarifaModalsProps } from "@/src/types";
import React from "react";

const TarifaModals: React.FC<TarifaModalsProps> = ({
  selectedRow,
  cargas,
  vehiculos,
  zonas,
  adicionales,
  transportistas,
  handleCreateTarifa,
  handleEditTarifa,
  handleDelete,
  showToast,
}) => {
  return (
    <>
      {/* Modal de confirmación de eliminación de tarifa */}
      <Modal
        id="deleteTarifa"
        title={"Eliminar Tarifa " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta tarifa?"
        fillButton
        lineButton
        fillButtonText="Eliminar"
        lineButtonText="Cancelar"
        fillButtonColor="#eb5757"
        lineButtonColor="#eb5757"
        fillButtonAction={async () => {
          if (selectedRow?.id !== undefined) {
            const res = await handleDelete(selectedRow.id);
            if (res?.success) {
              showToast(
                "Tarifa eliminada",
                "Se ha eliminado la tarifa: " + selectedRow.id,
                "success"
              );
            }
          }
          toggleModalVisibility("deleteTarifa");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteTarifa")}
      />
      {/* Modal de formulario para crear una nueva tarifa */}
      <TarifaForm
        id="createTarifa"
        mode="create"
        title="Registro de Tarifa"
        dataCargas={cargas}
        dataVehiculos={vehiculos}
        dataZonas={zonas}
        dataAdicionales={adicionales}
        dataTransportistas={transportistas}
        onSave={async (tarifaData) => {
          const res = await handleCreateTarifa(
            tarifaData.valor,
            tarifaData.id_zona,
            tarifaData.id_vehiculo,
            tarifaData.id_carga,
            tarifaData.id_transportista,
            tarifaData.adicionales
          );
          if (res?.success) {
            showToast(
              "Tarifa creada",
              "Se ha creado la tarifa: " + tarifaData.valor,
              "success"
            );
          }
        }}
      />{" "}
      {/* Modal de formulario para editar una tarifa existente */}
      <TarifaForm
        id="editTarifa"
        mode="edit"
        title={"Editar Tarifa " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow ? mapTarifaDataToTarifa(selectedRow) : undefined}
        dataCargas={cargas}
        dataVehiculos={vehiculos}
        dataZonas={zonas}
        dataAdicionales={adicionales}
        dataTransportistas={transportistas}
        onSave={async (tarifaData) => {
          const res = await handleEditTarifa(
            tarifaData.valor,
            tarifaData.id_zona,
            tarifaData.id_vehiculo,
            tarifaData.id_carga,
            tarifaData.id_transportista,
            tarifaData.adicionales
          );
          if (res?.success) {
            showToast("Tarifa editada", "Tarifa editada con éxito", "success");
          }
        }}
      />
      {/* Modal de formulario para visualizar una tarifa */}
      <TarifaForm
        id="viewTarifa"
        mode="view"
        title={"Ver Tarifa " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow ? mapTarifaDataToTarifa(selectedRow) : undefined}
        dataCargas={cargas}
        dataVehiculos={vehiculos}
        dataZonas={zonas}
        dataAdicionales={adicionales}
        dataTransportistas={transportistas}
      />
    </>
  );
};

export default TarifaModals;
