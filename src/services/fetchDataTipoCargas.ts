import type { TipoCarga } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getTipoCargas() {
  const response = await fetch(`${BASE_URL}/tipocargas`);
  if (!response.ok) throw new Error("Error fetching tipo cargas");
  return response.json();
}

export async function getTipoCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/tipocargas/${id}`);
  if (!response.ok) throw new Error("Error fetching tipo carga");
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
  if (!response.ok) throw new Error("Error creating tipo carga");
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
  if (!response.ok) throw new Error("Error updating tipo carga");
  return response.json();
}

export async function deleteTipoCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/tipocargas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting tipo carga");
  return response.json();
}
