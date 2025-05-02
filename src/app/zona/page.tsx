"use client";

import Table from "@/src/components/Table";
import SectionTable from "../UI/SectionTable";

const data = [
  { id: 1, nombre: "Zona Norte", descripcion: "Área residencial y comercial" },
  { id: 2, nombre: "Zona Sur", descripcion: "Sector industrial" },
  { id: 3, nombre: "Zona Este", descripcion: "Zona universitaria" },
  { id: 4, nombre: "Zona Oeste", descripcion: "Barrio histórico" },
];

function index() {
  return (
    <SectionTable titulo="Zonas" textButton="Agregar Zona">
      <Table data={data} />
    </SectionTable>
  );
}

export default index;
