import type { Carga } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCargas() {
  const response = await fetch(`${BASE_URL}/cargas`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function getCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/cargas/${id}`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json();
}

export async function createCarga(data: Carga): Promise<Carga> {
  const payload = {
    ...data,
    requisitos_especiales: data.requisitos,
    id_tipo_carga: data.tipo,
  };

  const response = await fetch(`${BASE_URL}/cargas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<Carga>;
}

export async function updateCarga(id: number | string, data: Carga) {
  const payload = {
    ...data,
    requisitos_especiales: data.requisitos,
    id_tipo_carga: data.tipo,
  };

  const response = await fetch(`${BASE_URL}/cargas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("Error updating carga", await response.text());
    throw new Error("Error updating carga");
  }
  return response.json();
}

export async function deleteCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/cargas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error("Error deleting carga", await response.text());
    throw new Error("Error deleting carga");
  }
  return response.json();
}
