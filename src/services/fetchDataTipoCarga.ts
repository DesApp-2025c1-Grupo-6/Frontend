import type { tipoCarga } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getTipoCargas() {
  const response = await fetch(`${BASE_URL}/TipoCarga`);
  if (!response.ok) throw new Error("Error fetching tipoCargas");
  return response.json();
}

export async function getTipoCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/tipoCarga/${id}`);
  if (!response.ok) throw new Error("Error fetching tipoCarga");
  return response.json();
}

export async function createTipoCarga(data: any): Promise<tipoCarga> {
  const response = await fetch(`${BASE_URL}/tipoCarga`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error creating tipo de carga");
  return response.json() as Promise<tipoCarga>;
}

export async function updateTipoCarga(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/tipoCargas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error updating tipo de carga");
  return response.json();
}

export async function deleteTipoCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/tipoCargas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting tipo de carga");
  return response.json();
}
