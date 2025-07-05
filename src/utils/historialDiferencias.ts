import { HistorialTarifa } from "@/src/types";

// Tipos para las diferencias
export interface DiferenciaField {
  field: string;
  label: string;
  anterior: any;
  actual: any;
  tipo: "simple" | "array" | "object";
}

export interface DiferenciaSection {
  section: string;
  fields: DiferenciaField[];
}

// Configuración de campos a comparar
const FIELD_CONFIG = {
  valor_base: {
    label: "Costo base",
    tipo: "simple" as const,
    format: (val: string) => `$${val}`,
  },
  vehiculo: { label: "Vehículo", tipo: "simple" as const },
  zona: { label: "Zona", tipo: "simple" as const },
  carga: { label: "Carga", tipo: "simple" as const },
  transportista: { label: "Transportista", tipo: "simple" as const },
  adicionales: {
    label: "Adicionales",
    tipo: "array" as const,
    formatItem: (item: any) =>
      `${item.tipo} ($${item.costo ? item.costo : item.costo_personalizado})`,
    compareBy: "id",
  },
};

/**
 * Compara dos valores y determina si son diferentes
 */
const sonDiferentes = (anterior: any, actual: any): boolean => {
  if (Array.isArray(anterior) && Array.isArray(actual)) {
    return JSON.stringify(anterior) !== JSON.stringify(actual);
  }
  return anterior !== actual;
};

/**
 * Formatea un array de adicionales para mostrar
 */
const formatearAdicionales = (adicionales: any[]): string => {
  if (!adicionales || adicionales.length === 0) return "Sin adicionales";
  return adicionales
    .map((item) => `${item.tipo} ($${item.costo || item.costo_default})`)
    .join(", ");
};

/**
 * Extrae las diferencias basándose en los cambios registrados
 */
export const extraerDiferencias = (
  registro: HistorialTarifa
): DiferenciaSection[] => {
  if (!registro.cambios || registro.accion === "CREACION") {
    return []; // No hay diferencias para mostrar en creaciones
  }

  const diferencias: DiferenciaSection[] = [];
  const seccionPrincipal: DiferenciaField[] = [];

  // Procesar cada cambio registrado
  Object.entries(registro.cambios).forEach(([field, cambio]) => {
    if (field in FIELD_CONFIG) {
      const config = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG];

      let anterior, actual;

      if (config.tipo === "array" && field === "adicionales") {
        anterior = formatearAdicionales(cambio.anterior || []);
        actual = formatearAdicionales(cambio.nuevo || []);
      } else if (config.tipo === "simple") {
        anterior = config.format
          ? config.format(cambio.anterior)
          : cambio.anterior;
        actual = config.format ? config.format(cambio.nuevo) : cambio.nuevo;
      } else {
        anterior = JSON.stringify(cambio.anterior);
        actual = JSON.stringify(cambio.nuevo);
      }

      seccionPrincipal.push({
        field,
        label: config.label,
        anterior,
        actual,
        tipo: config.tipo,
      });
    }
  });

  if (seccionPrincipal.length > 0) {
    diferencias.push({
      section: "Cambios Realizados",
      fields: seccionPrincipal,
    });
  }

  return diferencias;
};

/**
 * Genera las diferencias completas comparando registro actual vs anterior
 */
export const generarDiferenciasCompletas = (
  registroActual: HistorialTarifa,
  registroAnterior?: HistorialTarifa | null
): DiferenciaSection[] => {
  if (!registroAnterior || registroActual.accion === "CREACION") {
    return [];
  }

  const diferencias: DiferenciaSection[] = [];
  const seccionPrincipal: DiferenciaField[] = [];

  // Comparar campos principales
  Object.entries(FIELD_CONFIG).forEach(([field, config]) => {
    const valorAnterior =
      registroAnterior.data[field as keyof typeof registroAnterior.data];
    const valorActual =
      registroActual.data[field as keyof typeof registroActual.data];

    if (sonDiferentes(valorAnterior, valorActual)) {
      let anterior, actual;

      if (config.tipo === "array" && field === "adicionales") {
        anterior = formatearAdicionales((valorAnterior as any[]) || []);
        actual = formatearAdicionales((valorActual as any[]) || []);
      } else if (config.tipo === "simple") {
        anterior = config.format
          ? config.format(valorAnterior as string)
          : valorAnterior;
        actual = config.format
          ? config.format(valorActual as string)
          : valorActual;
      } else {
        anterior = JSON.stringify(valorAnterior);
        actual = JSON.stringify(valorActual);
      }

      seccionPrincipal.push({
        field,
        label: config.label,
        anterior,
        actual,
        tipo: config.tipo,
      });
    }
  });

  if (seccionPrincipal.length > 0) {
    diferencias.push({
      section: "Cambios Realizados",
      fields: seccionPrincipal,
    });
  }

  return diferencias;
};
