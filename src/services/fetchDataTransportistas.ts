import type { Transportista } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getTransportistas() {
  const response = await fetch(`${BASE_URL}/transportistas`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getTransportista(id: number | string) {
  const response = await fetch(`${BASE_URL}/transportistas/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function createTransportista(data: any): Promise<Transportista> {
  const response = await fetch(`${BASE_URL}/transportistas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<Transportista>;
}

export async function updateTransportista(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/transportistas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function deleteTransportista(id: number | string) {
  const response = await fetch(`${BASE_URL}/transportistas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}
