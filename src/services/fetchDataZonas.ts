import type { Zona } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getZonas() {
  const response = await fetch(`${BASE_URL}/zonas`);
  if (!response.ok) throw new Error("Error fetching zonas");
  return response.json();
}

export async function getZona(id: number | string) {
  const response = await fetch(`${BASE_URL}/zonas/${id}`);
  if (!response.ok) throw new Error("Error fetching zona");
  return response.json();
}

export async function createZona(data: any): Promise<Zona> {
  const response = await fetch(`${BASE_URL}/zonas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error creating zona");
  return response.json() as Promise<Zona>;
}

export async function updateZona(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/zonas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error updating zona");
  return response.json();
}

export async function deleteZona(id: number | string) {
  const response = await fetch(`${BASE_URL}/zonas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting zona");
  return response.json();
}
