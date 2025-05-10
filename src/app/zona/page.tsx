"use client";

import Table from "@/src/components/Table";
import ZonaForm from "../UI/forms/ZonaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { useState, useCallback, useRef } from "react";
import { Zona } from "@/src/types";
import Toast from "@/src/components/Toast";

const initialData: Zona[] = [
  { id: 1, nombre: "Zona Norte" },
  { id: 2, nombre: "Zona Sur" },
  { id: 3, nombre: "Zona Este" },
  { id: 4, nombre: "Zona Oeste" },
];

function Index() {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<Zona | undefined>();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (title: string, message: string, type: "success" | "error" = "success") => {
      setToastVisible(true);
      setToastTitle(title);
      setToastMessage(message);
      setToastType(type);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    },
    []
  );

  const handleCreateZone = useCallback(
    (nombre: string) => {
      showToast("Zona creada", "Se ha creado la zona: " + nombre, "success");
      setData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          nombre: nombre,
        },
      ]);
    },
    [showToast]
  );

  const handleEditZone = useCallback(
    (nombre: string) => {
      showToast("Zona editada", "Zona editada con éxito", "success");
      setData((prevData) =>
        prevData.map((row) =>
          row.id === selectedRow?.id ? { ...row, nombre } : row
        )
      );
    },
    [selectedRow, showToast]
  );

  const handleDelete = useCallback(
    (id: string | number) => {
      setData((prevData) => prevData.filter((row) => row.id !== id));
      showToast("Zona eliminada", "Se ha eliminado la zona: " + id, "success");
    },
    [showToast]
  );

  const handleView = useCallback((row: Zona) => {
    setSelectedRow(row);
    toggleModalVisibility("viewZona");
  }, []);

  const handleEdit = useCallback((row: Zona) => {
    setSelectedRow(row);
    toggleModalVisibility("editZona");
  }, []);

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
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </SectionTable>

      {/* Toast de notificación */}
      <Toast
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        open={toastVisible}
      />

      {/* Modal de formulario de registro de nueva zona */}
      <ZonaForm
        id="createZona"
        mode="create"
        title="Registro de Zona"
        onSave={handleCreateZone}
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
        onSave={handleEditZone}
      />
    </>
  );
}

export default Index;
