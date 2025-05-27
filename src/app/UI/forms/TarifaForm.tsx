"use client";
import TarifaAdicionalesSection from "@/src/components/TarifaAdicionalesSection";
import TarifaBasicDataSection from "@/src/components/TarifaBasicDataSection";
import TarifaResumenSection from "@/src/components/TarifaResumenSection";
import { Adicional, TarifaFormProps } from "@/src/types";
import React, { useEffect, useState } from "react";
import { toggleModalVisibility } from "../../utils/utils";
import Modal from "../Modal";
import ModalTipoAdicional from "../ModalTipoAdicional";

function TarifaForm({
  id,
  title,
  mode,
  data,
  dataAdicionales,
  dataCargas,
  dataTransportistas,
  dataVehiculos,
  dataZonas,
  onSave,
}: TarifaFormProps) {
  const [shouldValidate, setShouldValidate] = useState(false);
  const [shouldValidateTipoAdicional, setShouldValidateTipoAdicional] =
    useState(false);
  const [errorMessageTipoAdicional, setErrorMessageTipoAdicional] =
    useState("");
  const [costoAdicionales, setCostoAdicionales] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);
  const [adicionales, setAdicionales] = useState<Adicional[]>([]);
  const [adicionalSeleccionado, setAdicionalSeleccionado] = useState<any>(null);
  const [costoAdicionalSeleccionado, setCostoAdicionalSeleccionado] =
    useState("");
  const [customCostoAdicional, setCustomCostoAdicional] = useState("");
  const [zona, setZona] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [carga, setCarga] = useState("");
  const [transportista, setTransportista] = useState("");
  const [valor, setValor] = useState("");

  // Estados para manejar los IDs de los elementos seleccionados
  const [idZona, setIdZona] = useState("");
  const [idVehiculo, setIdVehiculo] = useState("");
  const [idCarga, setIdCarga] = useState("");
  const [idTransportista, setIdTransportista] = useState("");
  const resetForm = () => {
    setShouldValidate(false);
    setCostoAdicionales(0);
    setAdicionalSeleccionado(null);
    setAdicionales([]);
    setCostoAdicionalSeleccionado("");
    setZona("");
    setVehiculo("");
    setCarga("");
    setTransportista("");
    setValor("");
    setIdZona("");
    setIdVehiculo("");
    setIdCarga("");
    setIdTransportista("");
  };

  const resetFormTipoAdicional = () => {
    setShouldValidateTipoAdicional(false);
    setErrorMessageTipoAdicional("");
    setAdicionalSeleccionado(null);
    setCostoAdicionalSeleccionado("");
    setCustomCostoAdicional("");
  };
  const fillFormFromData = (data: any) => {
    setCostoAdicionales(data.costoAdicionales ?? 0);
    setCostoTotal(data.costoTotal ?? 0);
    setZona(data.zona ?? "");
    setVehiculo(data.vehiculo ?? "");
    setCarga(data.carga ?? "");
    setTransportista(data.transportista ?? "");
    setValor(data.valor_base ?? "");
    setAdicionales(data.adicionales ?? null);

    // Establecer los IDs si están disponibles en los datos
    setIdZona(data.id_zona ?? "");
    setIdVehiculo(data.id_vehiculo ?? "");
    setIdCarga(data.id_carga ?? "");
    setIdTransportista(data.id_transportista ?? "");

    // Si no hay IDs disponibles, intentar encontrarlos por el texto
    if (!data.id_zona && data.zona) {
      const zona = dataZonas?.find((z) => z.nombre === data.zona);
      if (zona) setIdZona(String(zona.id));
    }
    if (!data.id_vehiculo && data.vehiculo) {
      const vehiculo = dataVehiculos?.find((v) => v.tipo === data.vehiculo);
      if (vehiculo) setIdVehiculo(String(vehiculo.id));
    }
    if (!data.id_carga && data.carga) {
      const carga = dataCargas?.find((c) => c.tipo === data.carga);
      if (carga) setIdCarga(String(carga.id));
    }
    if (!data.id_transportista && data.transportista) {
      const transportista = dataTransportistas?.find(
        (t) => t.nombre === data.transportista
      );
      if (transportista) setIdTransportista(String(transportista.id));
    }
  };

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && data) {
      fillFormFromData(data);
    } else {
      resetForm();
    }
  }, [mode, data]);

  // Sumar los costos de los adicionales y el valor base para el costo total
  useEffect(() => {
    if (!adicionales || adicionales.length === 0) {
      setCostoAdicionales(0);
      setCostoTotal(Number(valor) || 0);
      return;
    }
    const sumaAdicionales = adicionales.reduce((acc, adicional) => {
      let costo = 0;
      if (
        adicional.costo_personalizado !== undefined &&
        adicional.costo_personalizado !== null &&
        adicional.costo_personalizado !== ""
      ) {
        costo = Number(adicional.costo_personalizado);
      } else {
        costo = Number(adicional.costo ?? 0);
      }
      return acc + (isNaN(costo) ? 0 : costo);
    }, 0);
    setCostoAdicionales(sumaAdicionales);
    const valorBase = Number(valor);
    setCostoTotal((isNaN(valorBase) ? 0 : valorBase) + sumaAdicionales);
  }, [adicionales, valor]);

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value);
  };
  const handleChangeAdicionales = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const adicional = dataAdicionales?.find(
      (adicional) => String(adicional.id) === event.target.value
    );
    setAdicionalSeleccionado(adicional || null);
    if (customCostoAdicional)
      setCostoAdicionalSeleccionado(customCostoAdicional);
    else
      setCostoAdicionalSeleccionado(
        adicional?.costo_default !== undefined &&
          adicional?.costo_default !== null
          ? String(adicional.costo_default)
          : ""
      );
  };

  const handleChangeCustomCostoAdicional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomCostoAdicional(event.target.value);
  };
  const handleZonaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedZona = dataZonas?.find(
      (zona) => String(zona.id) === selectedId
    );

    setIdZona(selectedId);
    setZona(selectedZona?.nombre || "");
  };
  const handleVehiculoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    const selectedVehiculo = dataVehiculos?.find(
      (vehiculo) => String(vehiculo.id) === selectedId
    );

    setIdVehiculo(selectedId);
    setVehiculo(selectedVehiculo?.tipo || "");
  };
  const handleCargaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedCarga = dataCargas?.find(
      (carga) => String(carga.id) === selectedId
    );

    setIdCarga(selectedId);
    setCarga(selectedCarga?.tipo || "");
  };
  const handleTransportistaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    const selectedTransportista = dataTransportistas?.find(
      (transportista) => String(transportista.id) === selectedId
    );

    setIdTransportista(selectedId);
    setTransportista(selectedTransportista?.nombre || "");
  };
  const handleSave = () => {
    if (!valor || !zona || !vehiculo || !carga || !transportista) {
      setShouldValidate(true);
      return;
    }
    if (onSave) {
      onSave({
        valor,
        id_zona: idZona,
        id_vehiculo: idVehiculo,
        id_carga: idCarga,
        id_transportista: idTransportista,
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

  const handleSaveTipoAdicional = () => {
    if (!adicionalSeleccionado) {
      setErrorMessageTipoAdicional("Debe seleccionar un tipo de adicional");
      setShouldValidateTipoAdicional(true);
      return;
    }
    // Evitar duplicados por id
    if (adicionales.some((a) => a.id === adicionalSeleccionado.id)) {
      setErrorMessageTipoAdicional("El tipo de adicional ya ha sido agregado");
      setShouldValidateTipoAdicional(true);
      return;
    }
    setAdicionales([
      ...adicionales,
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
    toggleModalVisibility("tipoAdicional - " + mode);
  };

  const handleCancelTipoAdicional = () => {
    resetFormTipoAdicional();
    toggleModalVisibility("tipoAdicional - " + mode);
  };

  return (
    <>
      <Modal
        id={id}
        title={title}
        lineButton
        fillButton
        lineButtonText="Cancelar"
        fillButtonText={mode === "view" ? "Cerrar" : "Guardar"}
        fillButtonAction={handleSave}
        lineButtonAction={onCancel}
      >
        <form className="flex flex-col gap-4">
          <TarifaBasicDataSection
            mode={mode}
            valor={valor}
            vehiculo={vehiculo}
            zona={zona}
            carga={carga}
            transportista={transportista}
            shouldValidate={shouldValidate}
            dataVehiculos={dataVehiculos ?? []}
            dataZonas={dataZonas ?? []}
            dataCargas={dataCargas ?? []}
            dataTransportistas={dataTransportistas ?? []}
            onValorChange={handleValorChange}
            onVehiculoChange={handleVehiculoChange}
            onZonaChange={handleZonaChange}
            onCargaChange={handleCargaChange}
            onTransportistaChange={handleTransportistaChange}
          />
          <TarifaAdicionalesSection
            adicionales={adicionales}
            mode={mode}
            onAgregarAdicional={(e) => {
              e.preventDefault();
              toggleModalVisibility("tipoAdicional - " + mode);
            }}
            onDeleteAdicional={(id) => {
              setAdicionales(adicionales.filter((a) => a.id !== id));
            }}
          />
          <TarifaResumenSection
            costoAdicionales={costoAdicionales}
            costoTotal={costoTotal}
          />
        </form>
      </Modal>
      <ModalTipoAdicional
        id={"tipoAdicional - " + mode}
        dataAdicionales={dataAdicionales ?? []}
        adicionalSeleccionado={adicionalSeleccionado}
        costoAdicionalSeleccionado={costoAdicionalSeleccionado}
        customCostoAdicional={customCostoAdicional}
        shouldValidate={shouldValidateTipoAdicional}
        errorMessage={errorMessageTipoAdicional}
        handleChangeCustomCostoAdicional={handleChangeCustomCostoAdicional}
        handleChangeAdicionales={handleChangeAdicionales}
        handleSaveTipoAdicional={handleSaveTipoAdicional}
        handleCancelTipoAdicional={handleCancelTipoAdicional}
      />
    </>
  );
}

export default TarifaForm;
