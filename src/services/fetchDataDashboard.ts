import { AreaData } from "lightweight-charts";

const BASE_URL = "http://localhost:3000";

export const getdataDashboard = async (
  id: string
): Promise<AreaData[] | null> => {
  const response = await fetch(`${BASE_URL}/tarifas/dashboard/${id}`);

  if (!response.ok) {
    if (response.status === 404) return null; // No se encontró historial
    const errorText = await response.text();
    throw new Error(errorText || "Error fetching data dashboard");
  }
  return response.json() as Promise<AreaData[]>;
};
