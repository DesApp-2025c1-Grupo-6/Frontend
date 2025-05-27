import type { Vehiculo } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getVehiculos() {
  const response = await fetch(`${BASE_URL}/vehiculos`);
  if (!response.ok) throw new Error("Error fetching vehiculos");
  return response.json();
}

export async function getVehiculo(id: number | string) {
  const response = await fetch(`${BASE_URL}/vehiculos/${id}`);
  if (!response.ok) throw new Error("Error fetching vehiculo");
  return response.json();
}

export async function createVehiculo(data: any): Promise<Vehiculo> {
  const response = await fetch(`${BASE_URL}/vehiculos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error creating vehiculo");
  return response.json() as Promise<Vehiculo>;
}

export async function updateVehiculo(id: number | string, data: any) {
  const response = await fetch(`${BASE_URL}/vehiculos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error updating vehiculo");
  return response.json();
}

export async function deleteVehiculo(id: number | string) {
  const response = await fetch(`${BASE_URL}/vehiculos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting vehiculo");
  return response.json();
}
