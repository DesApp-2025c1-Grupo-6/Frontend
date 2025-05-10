"use client";

import Table from "@/src/components/Table";
import ZonaForm from "../UI/forms/ZonaForm";
import SectionTable from "../UI/SectionTable";
import { toggleModalVisibility } from "../utils/utils";
import { useState, useCallback, useRef, useEffect } from "react";
import { Zona } from "@/src/types";
import Toast from "@/src/components/Toast";
import TableSkeleton from "@/src/components/Skeletons";
import Modal from "../UI/Modal";

// Mock de datos iniciales
const initialData: Zona[] = [
  { id: 1, nombre: "Zona Norte" },
  { id: 2, nombre: "Zona Sur" },
  { id: 3, nombre: "Zona Este" },
  { id: 4, nombre: "Zona Oeste" },
  { id: 5, nombre: "Zona Centro" },
  { id: 6, nombre: "Zona Industrial" },
  { id: 7, nombre: "Zona Comercial" },
  { id: 8, nombre: "Zona Residencial" },
  { id: 9, nombre: "Zona Rural" },
  { id: 10, nombre: "Zona Universitaria" },
  { id: 11, nombre: "Zona Portuaria" },
  { id: 12, nombre: "Zona Costera" },
  { id: 13, nombre: "Zona Montañosa" },
  { id: 14, nombre: "Zona Histórica" },
  { id: 15, nombre: "Zona Deportiva" },
  { id: 16, nombre: "Zona Escolar" },
  { id: 17, nombre: "Zona Hospitalaria" },
  { id: 18, nombre: "Zona Turística" },
  { id: 19, nombre: "Zona Tecnológica" },
  { id: 20, nombre: "Zona Administrativa" },
  { id: 21, nombre: "Zona Administrativa" },
];

// Simula una petición asíncrona para obtener los datos iniciales de zonas
async function fetchInitialData(): Promise<Zona[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialData);
    }, 1000);
  });
}
//////////////////////////////////////////////////////////

function Index() {
  // Estado para almacenar los datos de la tabla
  const [data, setData] = useState([] as Zona[]);
  // Estado para mostrar el loader mientras se cargan los datos
  const [loading, setLoading] = useState(false);
  // Estado para la fila seleccionada (para editar o eliminar)
  const [selectedRow, setSelectedRow] = useState<Zona>();
  // Estados para el Toast de notificación
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  // Referencia para controlar el timeout del Toast
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para cargar los datos iniciales al montar el componente
  useEffect(() => {
    setLoading(true);
    fetchInitialData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Función para mostrar el Toast de notificación
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

  // Handler para crear una nueva zona
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

  // Handler para editar una zona existente
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

  // Handler para eliminar una zona
  const handleDelete = useCallback(
    (id: string | number) => {
      setData((prevData) => prevData.filter((row) => row.id !== id));
      showToast("Zona eliminada", "Se ha eliminado la zona: " + id, "success");
    },
    [showToast]
  );

  // Handler para abrir el modal de edición con la fila seleccionada
  const handleEdit = useCallback((row: Zona) => {
    setSelectedRow(row);
    toggleModalVisibility("editZona");
  }, []);

  // Handler para abrir el modal de confirmación de eliminación
  const handleDeleteRequest = useCallback(
    (id: string | number) => {
      const row = data.find((row) => row.id === id);
      setSelectedRow(row);
      toggleModalVisibility("deleteZona");
    },
    [data]
  );

  return (
    <>
      <SectionTable
        titulo="Zonas"
        textButton="Agregar Zona"
        onClickButton={() => toggleModalVisibility("createZona")}
      >
        {loading ? (
          // Muestra skeletons mientras se cargan los datos
          <TableSkeleton columns={3} />
        ) : (
          // Tabla con los datos de zonas
          <Table
            data={data}
            rowsPerPage={5}
            editButton
            deleteButton
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        )}
      </SectionTable>

      {/* Toast de notificación */}
      <Toast
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        open={toastVisible}
      />

      {/* Modal de confirmación de eliminación de zona */}
      <Modal
        id="deleteZona"
        title={"Eliminar Zona " + (selectedRow ? selectedRow.id : "")}
        description="¿Está seguro de que desea eliminar esta zona?"
        fillButton
        lineButton
        fillButtonText="Eliminar"
        lineButtonText="Cancelar"
        fillButtonColor="#eb5757"
        lineButtonColor="#eb5757"
        fillButtonAction={() => {
          if (selectedRow?.id !== undefined) {
            handleDelete(selectedRow.id);
          }
          toggleModalVisibility("deleteZona");
        }}
        lineButtonAction={() => toggleModalVisibility("deleteZona")}
      />

      {/* Modal de formulario para crear una nueva zona */}
      <ZonaForm
        id="createZona"
        mode="create"
        title="Registro de Zona"
        onSave={handleCreateZone}
      />

      {/* Modal de formulario para editar una zona existente */}
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
