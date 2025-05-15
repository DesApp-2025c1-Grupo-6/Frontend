import type { Carga } from "../types";

const BASE_URL = "http://localhost:3000";

export async function getCargas() {
  const response = await fetch(`${BASE_URL}/cargas`);
  if (!response.ok) {
    console.error("Error fetching cargas", await response.text());
    throw new Error("Error fetching cargas");
  }
  return response.json();
}

export async function getCarga(id: number | string) {
  const response = await fetch(`${BASE_URL}/cargas/${id}`);
  if (!response.ok) {
    console.error("Error fetching carga", await response.text());
    throw new Error("Error fetching carga");
  }
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
  if (!response.ok) {
    console.error("Error creating carga", await response.text());
    throw new Error("Error creating carga");
  }
  return response.json() as Promise<Carga>;
}

export async function updateCarga(id: number | string, data: Carga) {
  console.log("Data to update carga:", data);

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
