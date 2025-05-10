"use client";

import Table from "@/src/components/Table";
import ZonaForm from "../UI/forms/ZonaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { useState } from "react";
import { Zona } from "@/src/types";

const initialData: Zona[] = [
  { id: 1, nombre: "Zona Norte" },
  { id: 2, nombre: "Zona Sur" },
  { id: 3, nombre: "Zona Este" },
  { id: 4, nombre: "Zona Oeste" },
];

function index() {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<Zona | undefined>();

  return (
    <>
      <SectionTable
        titulo="Zonas"
        textButton="Agregar Zona"
        onClickButton={() => toggleModalVisibility("createZona")}
      >
        <Table
          data={data}
          viewButton
          editButton
          deleteButton
          onView={(row) => {
            setSelectedRow(row);
            toggleModalVisibility("viewZona");
          }}
          onEdit={(row) => {
            setSelectedRow(row);
            toggleModalVisibility("editZona");
          }}
          onDelete={(id) => setData(data.filter((r) => r.id !== id))}
        />
      </SectionTable>

      {/* Modal de formulario de registro de nueva zona */}
      <ZonaForm
        id="createZona"
        mode="create"
        title="Registro de Zona"
        onSave={(nombre: string) => {
          setData((prevData) => [
            ...prevData,
            {
              id: prevData.length + 1,
              nombre: nombre,
            },
          ]);
        }}
      />

      {/* Modal de formulario de vista de zona */}
      <ZonaForm
        id="viewZona"
        mode="view"
        title={"Zona " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
      />

      {/* Modal de formulario de edición de zona */}
      <ZonaForm
        id="editZona"
        mode="edit"
        title={"Editar Zona " + (selectedRow ? selectedRow.id : "")}
        data={selectedRow}
        onSave={(nombre: string) => {
          setData((prevData) =>
            prevData.map((row) =>
              row.id === selectedRow?.id ? { ...row, nombre } : row
            )
          );
        }}
      />
    </>
  );
}

export default index;
