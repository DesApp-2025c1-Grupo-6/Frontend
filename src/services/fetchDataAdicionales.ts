import type { Adicional } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAdicionales() {
  const response = await fetch(`${BASE_URL}/adicionales`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getAdicional(id: number | string) {
  const response = await fetch(`${BASE_URL}/adicionales/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function createAdicional(data: any): Promise<Adicional> {
  const response = await fetch(`${BASE_URL}/adicionales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<Adicional>;
}

export async function updateAdicional(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/adicionales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function deleteAdicional(id: number | string) {
  const response = await fetch(`${BASE_URL}/adicionales/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}
