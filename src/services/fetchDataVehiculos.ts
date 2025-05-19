import type { Vehiculo } from "../types";

const BASE_URL = "http://localhost:3000";

// export async function getVehiculos() {
//   const response = await fetch(`${BASE_URL}/vehiculos`);
//   if (!response.ok) throw new Error("Error fetching vehiculos");
//   return response.json();
// }

// export async function getVehiculo(id: number | string) {
//   const response = await fetch(`${BASE_URL}/vehiculos/${id}`);
//   if (!response.ok) throw new Error("Error fetching vehiculo");
//   return response.json();
// }

// export async function createVehiculo(data: any): Promise<Vehiculo> {
//   const response = await fetch(`${BASE_URL}/vehiculos`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Error creating vehiculo");
//   return response.json() as Promise<Vehiculo>;
// }

// export async function updateVehiculo(id: number | string, data: any) {
//   const response = await fetch(`${BASE_URL}/vehiculos/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Error updating vehiculo");
//   return response.json();
// }

// export async function deleteVehiculo(id: number | string) {
//   const response = await fetch(`${BASE_URL}/vehiculos/${id}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) throw new Error("Error deleting vehiculo");
//   return response.json();
// }

const mockVehiculos: Vehiculo[] = [
  { id: 1, tipo: "Camión", toneladas: 10 },
  { id: 2, tipo: "Furgón", toneladas: 3 },
  { id: 3, tipo: "Pickup", toneladas: 1.5 },
];

export async function getVehiculos(): Promise<Vehiculo[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...mockVehiculos]), 300)
  );
}

export async function getVehiculo(
  id: number | string
): Promise<Vehiculo | undefined> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(mockVehiculos.find((v) => v.id === Number(id))),
      300
    )
  );
}

export async function createVehiculo(
  data: Omit<Vehiculo, "id">
): Promise<Vehiculo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lastId =
        mockVehiculos.length > 0
          ? mockVehiculos[mockVehiculos.length - 1].id
          : 0;
      const newVehiculo: Vehiculo = { id: Number(lastId) + 1, ...data };
      mockVehiculos.push(newVehiculo);
      resolve(newVehiculo);
    }, 300);
  });
}

export async function updateVehiculo(
  id: number | string,
  data: Partial<Vehiculo>
): Promise<Vehiculo | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockVehiculos.findIndex((v) => v.id === Number(id));
      if (index !== -1) {
        mockVehiculos[index] = { ...mockVehiculos[index], ...data };
        resolve(mockVehiculos[index]);
      } else {
        resolve(undefined);
      }
    }, 300);
  });
}

export async function deleteVehiculo(
  id: number | string
): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockVehiculos.findIndex((v) => v.id === Number(id));
      if (index !== -1) {
        mockVehiculos.splice(index, 1);
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 300);
  });
}
