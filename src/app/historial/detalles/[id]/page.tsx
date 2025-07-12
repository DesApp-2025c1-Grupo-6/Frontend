"use client";

import { useHistorialRegistro } from "@/src/hooks/useHistorialRegistro";
import { useParams } from "next/navigation";
import SectionTable from "../../../UI/SectionTable";
import DiferenciasView from "@/src/components/DiferenciasView";

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { registro, loading, error, diferencias } = useHistorialRegistro(
    id || ""
  );

  return (
    <SectionTable backButton titulo={`Detalle de modificaciones`}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800">Error</div>
          <div className="text-red-700">{error}</div>
        </div>
      ) : registro ? (
        <div className="space-y-6">
          {/* Información del Registro */}
          <div className="bg-gray-chateau-100 border border-gray-200 rounded-lg p-6 shadow-md">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 justify-between w-full">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  ID Tarifa
                </span>
                <div className="text-lg font-semibold">{registro.data.id}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Fecha</span>
                <div className="text-lg font-semibold">{registro.fecha}</div>
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="text-sm font-medium text-gray-500">
                  Acción
                </span>
                <div className={`badge badge-${registro.accion}`}>
                  {registro.accion}
                </div>
              </div>
            </div>

            {/* Datos Actuales de la Tarifa */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">
                Datos de la Tarifa
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Zona:</span>
                  <div>{registro.data.zona}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Carga:</span>
                  <div>{registro.data.carga}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Vehículo:</span>
                  <div>{registro.data.vehiculo}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Transportista:
                  </span>
                  <div>{registro.data.transportista}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Valor Base:
                  </span>
                  <div>${registro.data.valor_base}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Adicionales:
                  </span>
                  <div>
                    {registro.data.adicionales &&
                    registro.data.adicionales.length > 0
                      ? (() => {
                          const adicionalesStr = registro.data.adicionales
                            .map(
                              (a) =>
                                `${a.tipo} ($${a.costo || a.costo_default})`
                            )
                            .join(", ");
                          return adicionalesStr.includes(",") ? (
                            <ul className="list-disc list-inside text-gray-600 text-sm">
                              {adicionalesStr.split(",").map((item, idx) => (
                                <li key={idx}>{item.trim()}</li>
                              ))}
                            </ul>
                          ) : (
                            adicionalesStr || "Sin adicionales"
                          );
                        })()
                      : "Sin adicionales"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vista de Diferencias */}
          <DiferenciasView diferencias={diferencias} accion={registro.accion} />
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No se encontró el registro
        </div>
      )}
    </SectionTable>
  );
};

export default Page;
