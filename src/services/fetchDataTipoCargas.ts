import type { TipoCarga } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getTipoCargas() {
  const response = await fetch(`${BASE_URL}/tipocargas`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getTipoCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/tipocargas/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function createTipoCarga(data: {
  descripcion: string;
}): Promise<TipoCarga> {
  const response = await fetch(`${BASE_URL}/tipocargas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<TipoCarga>;
}

export async function updateTipoCarga(
  id: number | string,
  data: { descripcion: string }
) {
  const response = await fetch(`${BASE_URL}/tipocargas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function deleteTipoCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/tipocargas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting tipo carga");
  return response.json();
}
