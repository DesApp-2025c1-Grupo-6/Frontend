import type { Tarifa } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getTarifas(): Promise<Tarifa[]> {
  const response = await fetch(`${BASE_URL}/tarifas`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getTarifa(id: number | string): Promise<Tarifa> {
  const response = await fetch(`${BASE_URL}/tarifas/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function createTarifa(data: any): Promise<Tarifa> {
  const response = await fetch(`${BASE_URL}/tarifas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<Tarifa>;
}

export async function updateTarifa(
  id: number | string,
  data: any
): Promise<Tarifa> {
  const response = await fetch(`${BASE_URL}/tarifas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function deleteTarifa(id: number | string): Promise<any> {
  const response = await fetch(`${BASE_URL}/tarifas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}
