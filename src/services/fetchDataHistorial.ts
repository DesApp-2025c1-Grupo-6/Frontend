import { HistorialTarifa } from "@/src/types";

const BASE_URL = "http://localhost:3000";

async function getErrorMessage(response: Response) {
  try {
    const data = await response.json();
    if (data && data.error) return data.error;
    if (typeof data === "string") return data;
    return response.statusText || "Error desconocido";
  } catch {
    return response.statusText || "Error desconocido";
  }
}

export async function getHistorialTarifas(): Promise<HistorialTarifa[]> {
  const response = await fetch(`${BASE_URL}/historial`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getHistorialTarifa(
  id: number | string
): Promise<HistorialTarifa> {
  const response = await fetch(`${BASE_URL}/historial/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}
//       id: 4,
//       zona: "Zona Oeste",
//       carga: "Carga refrigerada",
//       fecha: "01/01/2025",
//       id_zona: 1,
//       id_carga: 1,
//       vehiculo: "camión",
//       valor_base: "1200.00",
//       adicionales: [
//         {
//           id: 1,
//           tipo: "Ayudante",
//           costo_default: "200.00",
//         },
//         {
//           id: 2,
//           tipo: "Combustible extra",
//           costo_default: "150.00",
//         },
//       ],
//       id_vehiculo: 1,
//       transportista: "Transportes Express",
//       id_transportista: 1,
//     },
//     accion: "MODIFICACION",
//     cambios: {
//       valor_base: {
//         anterior: "1000.00",
//         nuevo: "1200.00",
//       },
//       adicionales: {
//         anterior: [{ id: 1, tipo: "Ayudante", costo_default: "200.00" }],
//         nuevo: [
//           { id: 1, tipo: "Ayudante", costo_default: "200.00" },
//           { id: 2, tipo: "Combustible extra", costo_default: "150.00" },
//         ],
//       },
//     },
//   },
//   // Tarifa 4 - ELIMINACION
//   {
//     id: 3,
//     idtarifa: 4,
//     fecha: "03/07/2025",
//     data: {
//       id: 4,
//       zona: "Zona Oeste",
//       carga: "Carga refrigerada",
//       fecha: "01/01/2025",
//       id_zona: 1,
//       id_carga: 1,
//       vehiculo: "camión",
//       valor_base: "1200.00",
//       adicionales: [
//         {
//           id: 1,
//           tipo: "Ayudante",
//           costo_default: "200.00",
//         },
//         {
//           id: 2,
//           tipo: "Combustible extra",
//           costo_default: "150.00",
//         },
//       ],
//       id_vehiculo: 1,
//       transportista: "Transportes Express",
//       id_transportista: 1,
//     },
//     accion: "ELIMINACION",
//     cambios: null,
//   },
//   // Tarifa 2 - CREACION
//   {
//     id: 4,
//     idtarifa: 2,
//     fecha: "05/06/2025",
//     data: {
//       id: 2,
//       zona: "Zona Norte",
//       carga: "Carga seca",
//       fecha: "01/02/2025",
//       id_zona: 2,
//       id_carga: 2,
//       vehiculo: "furgón",
//       valor_base: "1200.00",
//       adicionales: [],
//       id_vehiculo: 2,
//       transportista: "Logística Norte",
//       id_transportista: 2,
//     },
//     accion: "CREACION",
//     cambios: null,
//   },
//   // Tarifa 2 - PRIMERA MODIFICACION
//   {
//     id: 5,
//     idtarifa: 2,
//     fecha: "10/06/2025",
//     data: {
//       id: 2,
//       zona: "Zona Norte",
//       carga: "Carga seca",
//       fecha: "01/02/2025",
//       id_zona: 2,
//       id_carga: 2,
//       vehiculo: "furgón",
//       valor_base: "1500.00",
//       adicionales: [
//         {
//           id: 3,
//           tipo: "Peón",
//           costo_default: "300.00",
//         },
//       ],
//       id_vehiculo: 2,
//       transportista: "Logística Norte",
//       id_transportista: 2,
//     },
//     accion: "MODIFICACION",
//     cambios: {
//       valor_base: {
//         anterior: "1200.00",
//         nuevo: "1500.00",
//       },
//       adicionales: {
//         anterior: [],
//         nuevo: [{ id: 3, tipo: "Peón", costo_default: "300.00" }],
//       },
//     },
//   },
//   // Tarifa 2 - SEGUNDA MODIFICACION (en lugar de eliminación)
//   {
//     id: 6,
//     idtarifa: 2,
//     fecha: "15/06/2025",
//     data: {
//       id: 2,
//       zona: "Zona Norte",
//       carga: "Carga seca",
//       fecha: "01/02/2025",
//       id_zona: 2,
//       id_carga: 2,
//       vehiculo: "furgón",
//       valor_base: "1800.00",
//       adicionales: [
//         {
//           id: 3,
//           tipo: "Peón",
//           costo_default: "300.00",
//         },
//         {
//           id: 4,
//           tipo: "Seguro adicional",
//           costo_default: "250.00",
//         },
//         {
//           id: 8,
//           tipo: "Carga y descarga",
//           costo_default: "180.00",
//         },
//         {
//           id: 9,
//           tipo: "Peaje",
//           costo_default: "120.00",
//         },
//         {
//           id: 10,
//           tipo: "Estiba",
//           costo_default: "90.00",
//         },
//         {
//           id: 11,
//           tipo: "Desinfección",
//           costo_default: "60.00",
//         },
//       ],
//       id_vehiculo: 2,
//       transportista: "Logística Norte",
//       id_transportista: 2,
//     },
//     accion: "MODIFICACION",
//     cambios: {
//       valor_base: {
//         anterior: "1500.00",
//         nuevo: "1800.00",
//       },
//       adicionales: {
//         anterior: [{ id: 3, tipo: "Peón", costo_default: "300.00" }],
//         nuevo: [
//           { id: 3, tipo: "Peón", costo_default: "300.00" },
//           { id: 4, tipo: "Seguro adicional", costo_default: "250.00" },
//           { id: 8, tipo: "Carga y descarga", costo_default: "180.00" },
//           { id: 9, tipo: "Peaje", costo_default: "120.00" },
//           { id: 10, tipo: "Estiba", costo_default: "90.00" },
//           { id: 11, tipo: "Desinfección", costo_default: "60.00" },
//         ],
//       },
//     },
//   },
//   // Tarifa 5 - CREACION
//   {
//     id: 7,
//     idtarifa: 5,
//     fecha: "20/05/2025",
//     data: {
//       id: 5,
//       zona: "Zona Sur",
//       carga: "Carga general",
//       fecha: "15/01/2025",
//       id_zona: 3,
//       id_carga: 3,
//       vehiculo: "camioneta",
//       valor_base: "600.00",
//       adicionales: [],
//       id_vehiculo: 3,
//       transportista: "Trans Sur",
//       id_transportista: 3,
//     },
//     accion: "CREACION",
//     cambios: null,
//   },
//   // Tarifa 5 - MODIFICACION
//   {
//     id: 8,
//     idtarifa: 5,
//     fecha: "25/05/2025",
//     data: {
//       id: 5,
//       zona: "Zona Sur",
//       carga: "Carga general",
//       fecha: "15/01/2025",
//       id_zona: 3,
//       id_carga: 3,
//       vehiculo: "camioneta",
//       valor_base: "800.00",
//       adicionales: [
//         {
//           id: 5,
//           tipo: "Descarga manual",
//           costo_default: "100.00",
//         },
//       ],
//       id_vehiculo: 3,
//       transportista: "Trans Sur",
//       id_transportista: 3,
//     },
//     accion: "MODIFICACION",
//     cambios: {
//       valor_base: {
//         anterior: "600.00",
//         nuevo: "800.00",
//       },
//       adicionales: {
//         anterior: [],
//         nuevo: [{ id: 5, tipo: "Descarga manual", costo_default: "100.00" }],
//       },
//     },
//   },
//   // Tarifa 5 - ELIMINACION
//   {
//     id: 9,
//     idtarifa: 5,
//     fecha: "30/05/2025",
//     data: {
//       id: 5,
//       zona: "Zona Sur",
//       carga: "Carga general",
//       fecha: "15/01/2025",
//       id_zona: 3,
//       id_carga: 3,
//       vehiculo: "camioneta",
//       valor_base: "800.00",
//       adicionales: [
//         {
//           id: 5,
//           tipo: "Descarga manual",
//           costo_default: "100.00",
//         },
//       ],
//       id_vehiculo: 3,
//       transportista: "Trans Sur",
//       id_transportista: 3,
//     },
//     accion: "ELIMINACION",
//     cambios: null,
//   },
//   // Tarifa 6 - CREACION
//   {
//     id: 10,
//     idtarifa: 6,
//     fecha: "01/06/2025",
//     data: {
//       id: 6,
//       zona: "Zona Norte",
//       carga: "Carga peligrosa",
//       fecha: "01/02/2025",
//       id_zona: 2,
//       id_carga: 4,
//       vehiculo: "camión especializado",
//       valor_base: "2000.00",
//       adicionales: [
//         {
//           id: 6,
//           tipo: "Protocolo seguridad",
//           costo_default: "500.00",
//         },
//       ],
//       id_vehiculo: 4,
//       transportista: "Logística Norte",
//       id_transportista: 2,
//     },
//     accion: "CREACION",
//     cambios: null,
//   },
//   // Tarifa 6 - MODIFICACION
//   {
//     id: 11,
//     idtarifa: 6,
//     fecha: "05/06/2025",
//     data: {
//       id: 6,
//       zona: "Zona Norte",
//       carga: "Carga peligrosa",
//       fecha: "01/02/2025",
//       id_zona: 2,
//       id_carga: 4,
//       vehiculo: "camión especializado",
//       valor_base: "2200.00",
//       adicionales: [
//         {
//           id: 6,
//           tipo: "Protocolo seguridad",
//           costo_default: "500.00",
//         },
//         {
//           id: 7,
//           tipo: "Escolta especializada",
//           costo_default: "300.00",
//         },
//       ],
//       id_vehiculo: 4,
//       transportista: "Logística Norte",
//       id_transportista: 2,
//     },
//     accion: "MODIFICACION",
//     cambios: {
//       valor_base: {
//         anterior: "2000.00",
//         nuevo: "2200.00",
//       },
//       adicionales: {
//         anterior: [
//           { id: 6, tipo: "Protocolo seguridad", costo_default: "500.00" },
//         ],
//         nuevo: [
//           { id: 6, tipo: "Protocolo seguridad", costo_default: "500.00" },
//           { id: 7, tipo: "Escolta especializada", costo_default: "300.00" },
//         ],
//       },
//     },
//   },
//   // Tarifa 6 - ELIMINACION
//   {
//     id: 12,
//     idtarifa: 6,
//     fecha: "10/06/2025",
//     data: {
//       id: 6,
//       zona: "Zona Norte",
//       carga: "Carga peligrosa",
//       fecha: "01/02/2025",
//       id_zona: 2,
//       id_carga: 4,
//       vehiculo: "camión especializado",
//       valor_base: "2200.00",
//       adicionales: [
//         {
//           id: 6,
//           tipo: "Protocolo seguridad",
//           costo_default: "500.00",
//         },
//         {
//           id: 7,
//           tipo: "Escolta especializada",
//           costo_default: "300.00",
//         },
//       ],
//       id_vehiculo: 4,
//       transportista: "Logística Norte",
//       id_transportista: 2,
//     },
//     accion: "ELIMINACION",
//     cambios: null,
//   },
// ];

// Simulación de delay de red para hacer más realista el mock
// const simulateNetworkDelay = (ms: number = 500) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// export const getTarifasHistorial = async (): Promise<HistorialTarifa[]> => {
//   // Simular llamada a API
//   await simulateNetworkDelay();

//   // En desarrollo, usar mock data
//   if (process.env.NODE_ENV === "development") {
//     // Agrupa por idtarifa y toma el último historial (por id más alto)
//     const latestByTarifa = Object.values(
//       mockHistorialData.reduce<Record<number, HistorialTarifa>>((acc, item) => {
//         if (!acc[item.idtarifa] || acc[item.idtarifa].id < item.id) {
//           acc[item.idtarifa] = item;
//         }
//         return acc;
//       }, {})
//     );
//     return latestByTarifa;
//   }

//   // En producción, usar API real
//   const response = await fetch(`${BASE_URL}/tarifas/historico`);
//   if (!response.ok) {
//     throw new Error("Error fetching historial data");
//   }
//   return response.json();
// };

// export const getTarifaHistorial = async (
//   id: string
// ): Promise<HistorialTarifa[] | null> => {
//   // Simular llamada a API
//   await simulateNetworkDelay();

//   // En desarrollo, usar mock data
//   if (process.env.NODE_ENV === "development") {
//     const historial = mockHistorialData
//       .filter((item) => item.data.id === parseInt(id))
//       .sort((a, b) => {
//         // Asume formato DD/MM/YYYY
//         const parseDate = (fecha: string) => {
//           const [day, month, year] = fecha.split("/").map(Number);
//           return new Date(year, month - 1, day).getTime();
//         };
//         return parseDate(b.fecha) - parseDate(a.fecha);
//       });
//     if (!historial.length) {
//       throw new Error(`No se encontró historial para la tarifa con ID: ${id}`);
//     }
//     return historial;
//   }

//   // En producción, usar API real
//   const response = await fetch(`${BASE_URL}/tarifas/historico/${id}`);
//   if (!response.ok) {
//     return null;
//   }
//   return response.json();
// };

// // Función para obtener un registro específico del historial por su ID
// export const getRegistroHistorial = async (
//   historialId: string
// ): Promise<HistorialTarifa | null> => {
//   // Simular llamada a API
//   await simulateNetworkDelay();

//   // En desarrollo, usar mock data
//   if (process.env.NODE_ENV === "development") {
//     const registro = mockHistorialData.find(
//       (item) => item.id === parseInt(historialId)
//     );
//     if (!registro) {
//       throw new Error(
//         `No se encontró registro de historial con ID: ${historialId}`
//       );
//     }
//     return registro;
//   }

//   // En producción, usar API real
//   const response = await fetch(`${BASE_URL}/historial/${historialId}`);
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || "Error fetching registro historial");
//   }
//   return response.json();
// };

export const getTarifasHistorial = async (): Promise<HistorialTarifa[]> => {
  const response = await fetch(`${BASE_URL}/tarifas/historico/ultimos`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error fetching historial data");
  }
  return response.json() as Promise<HistorialTarifa[]>;
};

export const getTarifaHistorial = async (
  id: string
): Promise<HistorialTarifa[] | null> => {
  const response = await fetch(`${BASE_URL}/tarifas/${id}/historico`);

  if (!response.ok) {
    if (response.status === 404) return null; // No se encontró historial
    const errorText = await response.text();
    throw new Error(errorText || "Error fetching tarifa historial");
  }
  return response.json() as Promise<HistorialTarifa[]>;
};

export const getRegistroHistorial = async (
  historialId: string
): Promise<HistorialTarifa | null> => {
  const response = await fetch(`${BASE_URL}/tarifas/historico/${historialId}`);

  if (!response.ok) {
    if (response.status === 404) return null; // No se encontró registro
    const errorText = await response.text();
    throw new Error(errorText || "Error fetching registro historial");
  }
  return response.json() as Promise<HistorialTarifa>;
};
