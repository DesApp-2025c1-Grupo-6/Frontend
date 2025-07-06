import React from "react";
import { DiferenciaSection } from "@/src/utils/historialDiferencias";

interface DiferenciasViewProps {
  diferencias: DiferenciaSection[];
  accion: "CREACION" | "MODIFICACION" | "ELIMINACION";
}

const DiferenciasView: React.FC<DiferenciasViewProps> = ({
  diferencias,
  accion,
}) => {
  if (accion === "CREACION") {
    return (
      <section
        className="bg-gray-chateau-100 shadow-md border border-esmerald-500 rounded-lg p-4"
        aria-labelledby="registro-creado"
      >
        <header>
          <h2
            id="registro-creado"
            className="text-esmerald-700 font-semibold mb-2"
          >
            ✓ Registro Creado
          </h2>
        </header>
        <p className="text-esmerald-500">
          Este registro fue creado: no hay cambios previos para mostrar.
        </p>
      </section>
    );
  }

  if (accion === "ELIMINACION") {
    return (
      <section
        className="bg-gray-chateau-100 border border-roman-500 rounded-lg p-4"
        aria-labelledby="registro-eliminado"
      >
        <header>
          <h2
            id="registro-eliminado"
            className="text-roman-700 font-semibold mb-2"
          >
            ✗ Registro Eliminado
          </h2>
        </header>
        <p className="text-roman-500">
          Este registro fue eliminado del sistema.
        </p>
      </section>
    );
  }

  if (!diferencias || diferencias.length === 0) {
    return (
      <section
        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
        aria-labelledby="sin-cambios"
      >
        <header>
          <h2 id="sin-cambios" className="text-gray-800 font-semibold mb-2">
            Sin Cambios
          </h2>
        </header>
        <p className="text-gray-700">
          No se detectaron cambios en este registro.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6" aria-labelledby="cambios-realizados">
      {diferencias.map((seccion, index) => (
        <article
          key={index}
          className="bg-gray-chateau-100 shadow-md border border-gray-200 rounded-lg overflow-hidden"
          aria-labelledby={`seccion-${index}`}
        >
          <header className="bg-gray-300 px-4 py-3 border-b border-gray-200">
            <h3 id={`seccion-${index}`} className="font-semibold text-gray-800">
              {seccion.section}
            </h3>
          </header>

          <ul
            className="p-0"
            aria-label={`Campos modificados en ${seccion.section}`}
          >
            {seccion.fields.map((field, fieldIndex) => (
              <li
                key={fieldIndex}
                className="border-b border-gray-100 last:border-b-0"
              >
                <section className="p-4">
                  <header className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">
                      {field.label}
                    </span>
                  </header>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Valor Anterior */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 bg-red-400 rounded-full"
                          aria-hidden="true"
                        ></span>
                        <span className="text-sm font-medium text-gray-600">
                          Anterior
                        </span>
                      </div>
                      <div
                        className="bg-red-200/30 border border-red-200 rounded-md p-3 text-roman-700 text-sm"
                        aria-label="Valor anterior"
                      >
                        {field.anterior && field.anterior.includes(",") ? (
                          <ul className="list-disc list-inside text-roman-700 text-sm">
                            {field.anterior.split(",").map((item, idx) => (
                              <li key={idx}>{item.trim()}</li>
                            ))}
                          </ul>
                        ) : (
                          field.anterior || "Sin valor"
                        )}
                      </div>
                    </div>
                    {/* Valor Actual */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 bg-esmerald-700 rounded-full"
                          aria-hidden="true"
                        ></span>
                        <span className="text-sm font-medium text-gray-600">
                          Nuevo
                        </span>
                      </div>
                      <div
                        className="bg-green-200/30 border border-green-200 rounded-md p-3 text-green-800 text-sm"
                        aria-label="Valor nuevo"
                      >
                        {field.actual && field.actual.includes(",") ? (
                          <ul className="list-disc list-inside text-green-800 text-sm">
                            {field.actual.split(",").map((item, idx) => (
                              <li key={idx}>{item.trim()}</li>
                            ))}
                          </ul>
                        ) : (
                          field.actual || "Sin valor"
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
};

export default DiferenciasView;
