export function toggleModalVisibility(id: string) {
  const modal = document.getElementById(id);
  modal?.classList.toggle("hidden");
  modal?.classList.toggle("flex");
}
/**
 * Función para mapear TarifaData a Tarifa
 * Convierte el formato de datos de la tabla al formato esperado por el formulario
 */
export function mapTarifaDataToTarifa(tarifaData: any): any {
  return {
    ...tarifaData,
    adicionales: tarifaData.adicionales?.map((adicional: any) => ({
      ...adicional,
      tipo: adicional.tipo || "", // Proporcionar valor por defecto
      valor: adicional.valor || 0, // Proporcionar valor por defecto
    })),
  };
}
