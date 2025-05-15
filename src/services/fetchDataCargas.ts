import type { Carga } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getCargas() {
  const response = await fetch(`${BASE_URL}/cargas`);
  if (!response.ok) throw new Error("Error fetching cargas");
  return response.json();
}

export async function getCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/Cargas/${id}`);
  if (!response.ok) throw new Error("Error fetching carga");
  return response.json();
}

export async function createCarga(data: any): Promise<Carga> {
  const response = await fetch(`${BASE_URL}/cargas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error creating zona");
  return response.json() as Promise<Carga>;
}

export async function updateCarga(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/cargas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error updating carga");
  return response.json();
}

export async function deleteCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/cargas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting carga");
  return response.json();
}
