import type { Zona } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getZonas() {
  const response = await fetch(`${BASE_URL}/zonas`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getZona(id: number | string) {
  const response = await fetch(`${BASE_URL}/zonas/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function createZona(data: any): Promise<Zona> {
  const response = await fetch(`${BASE_URL}/zonas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<Zona>;
}

export async function updateZona(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/zonas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function deleteZona(id: number | string) {
  const response = await fetch(`${BASE_URL}/zonas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}
