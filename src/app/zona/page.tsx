"use client";

import Table from "@/src/components/Table";
import SectionTable from "../UI/SectionTable";
import Modal from "../UI/Modal";
import { toggleModalVisibility } from "../utils/utils";

const data = [
  { id: 1, nombre: "Zona Norte", descripcion: "Área residencial y comercial" },
  { id: 2, nombre: "Zona Sur", descripcion: "Sector industrial" },
  { id: 3, nombre: "Zona Este", descripcion: "Zona universitaria" },
  { id: 4, nombre: "Zona Oeste", descripcion: "Barrio histórico" },
];

function index() {
  return (
    <>
      <SectionTable
        titulo="Zonas"
        textButton="Agregar Zona"
        onClickButton={() => toggleModalVisibility("registroDeZona")}
      >
        <Table data={data} />
      </SectionTable>
      <Modal
        lineButton
        fillButton
        lineButtonText="Cancelar"
        fillButtonText="Guardar"
        fillButtonAction={() => console.log("Zona guardada")}
        lineButtonAction={() => {
          console.log("Cancelado");
          toggleModalVisibility("registroDeZona");
        }}
        id="registroDeZona"
        title="Registrar nueva Zona"
      ></Modal>
    </>
  );
}

export default index;
