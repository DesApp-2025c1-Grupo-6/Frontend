import AdicionalesIcon from "@/src/icons/AdicionalesIcon";
import CargaIcon from "@/src/icons/CargaIcon";
import HomeIcon from "@/src/icons/HomeIcon";
import TipoCargaIcon from "@/src/icons/TipoCargaIcon";
import TransportistaIcon from "@/src/icons/TransportistaIcon";
import VehiculoIcon from "@/src/icons/VehiculoIcon";
import ZonaIcon from "@/src/icons/ZonaIcon";

const BASE_URL = "http://localhost:3000";

export function toggleModalVisibility(id: string) {
  const modal = document.getElementById(id);
  modal?.classList.toggle("hidden");
  modal?.classList.toggle("flex");
}
/**
 * Función para mapear TarifaData a Tarifa
 * Convierte el formato de datos de la tabla al formato esperado por el formulario
 */
export function mapTarifaDataToTarifa(tarifaData: any): any {
  return {
    ...tarifaData,
    adicionales: tarifaData.adicionales?.map((adicional: any) => ({
      ...adicional,
      tipo: adicional.tipo || "", // Proporcionar valor por defecto
      valor: adicional.valor || 0, // Proporcionar valor por defecto
    })),
  };
}

// Funcion para hacer capitalize la primera letra de una cadena
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const menuItems = [
  {
    name: "Tarifa",
    icon: HomeIcon,
    href: "/tarifa",
  },
  {
    name: "Vehículo",
    icon: VehiculoIcon,
    href: "/vehiculo",
  },
  {
    name: "Transportista",
    icon: TransportistaIcon,
    href: "/transportista",
  },
  {
    name: "Zona",
    icon: ZonaIcon,
    href: "/zona",
  },
  {
    name: "Carga",
    icon: CargaIcon,
    href: "/carga",
  },
  {
    name: "Tipo de carga",
    icon: TipoCargaIcon,
    href: "/tipo-de-carga",
  },
  {
    name: "Adicional",
    icon: AdicionalesIcon,
    href: "/adicional",
  },
];

export async function generateReporte(endpoint: string, filename: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error generating report");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  return { success: true, message: "Reporte generado exitosamente" };
}
