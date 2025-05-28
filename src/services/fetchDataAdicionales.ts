import type { Adicional } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getAdicionales() {
  const response = await fetch(`${BASE_URL}/adicionales`);
  if (!response.ok) throw new Error("Error fetching adicionales");
  return response.json();
}

export async function getAdicional(id: number | string) {
  const response = await fetch(`${BASE_URL}/adicionales/${id}`);
  if (!response.ok) throw new Error("Error fetching adicional");
  return response.json();
}

export async function createAdicional(data: any): Promise<Adicional> {
  const response = await fetch(`${BASE_URL}/adicionales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error creating adicional");
  return response.json() as Promise<Adicional>;
}

export async function updateAdicional(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/adicionales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error updating Adicional");
  return response.json();
}

export async function deleteAdicional(id: number | string) {
  const response = await fetch(`${BASE_URL}/adicionales/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting adicional");
  return response.json();
}
