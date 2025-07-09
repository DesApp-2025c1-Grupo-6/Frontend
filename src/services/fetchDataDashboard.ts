import { AreaData } from "lightweight-charts";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getdataDashboard = async (
  id: string
): Promise<AreaData[] | null> => {
  const response = await fetch(`${BASE_URL}/tarifas/dashboard/${id}`);

  if (!response.ok) {
    if (response.status === 404) return null; // No se encontró historial
    throw new Error(await getErrorMessage(response));
  }
  return response.json() as Promise<AreaData[]>;
};
