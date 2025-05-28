import type { Transportista } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getTransportistas() {
  const response = await fetch(`${BASE_URL}/transportistas`);
  if (!response.ok) throw new Error("Error fetching transportistas");
  return response.json();
}

export async function getTransportista(id: number | string) {
  const response = await fetch(`${BASE_URL}/transportistas/${id}`);
  if (!response.ok) throw new Error("Error fetching transportista");
  return response.json();
}

export async function createTransportista(data: any): Promise<Transportista> {
  const response = await fetch(`${BASE_URL}/transportistas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error creating transportista");
  return response.json() as Promise<Transportista>;
}

export async function updateTransportista(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/transportistas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error updating transportista");
  return response.json();
}

export async function deleteTransportista(id: number | string) {
  const response = await fetch(`${BASE_URL}/transportistas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting transportista");
  return response.json();
}
