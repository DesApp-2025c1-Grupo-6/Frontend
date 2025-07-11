"use client";

import AnimatedNumber from "@/src/components/AnimatedNumber";
import Chart from "@/src/components/Chart";
import DateInput from "@/src/components/DateInput";
import FiltroInput from "@/src/components/FiltroInput";
import useDashboard from "@/src/hooks/useDashboard";
import useHistorial from "@/src/hooks/useHistorial";
import { useEffect, useState } from "react";
import SectionTable from "../UI/SectionTable";
import { AreaData } from "lightweight-charts";
import type { UTCTimestamp } from "lightweight-charts";
import { useCallback } from "react";

function App() {
  const [tarifaSelected, setTarifaSelected] = useState<string | null>(null);
  // Hook dashboard: obtiene los datos del gráfico según la tarifa seleccionada
  const { setIdTarifa, data: areaData } = useDashboard(tarifaSelected);

  const [filteredData, setFilteredData] = useState<AreaData[]>([]);

  const [show, setShow] = useState(false);
  // Fechas por defecto (controladas, nunca undefined)
  const [fromDate, setFromDate] = useState<string>("2022-01-17");
  const [toDate, setToDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [shouldValidate, setShouldValidate] = useState(false);
  const [lastValidRange, setLastValidRange] = useState({
    from: fromDate,
    to: toDate,
  });

  const { tableData } = useHistorial();

  // Validación: la fecha hasta no puede ser menor a desde
  const isInvalid = toDate < fromDate;

  // Cuando cambian las fechas, mostrar validación si hay error y guardar último rango válido
  useEffect(() => {
    if (isInvalid) {
      setShouldValidate(true);
    } else {
      setShouldValidate(false);
      setLastValidRange({ from: fromDate, to: toDate });
    }
  }, [fromDate, toDate, isInvalid]);

  // Utilidad para convertir el campo time (string u objeto) a string 'YYYY-MM-DD' para comparar y ordenar

  type TimeObj = { year: number; month: number; day: number; hour?: number };
  const timeToDateString = useCallback(
    (time: string | TimeObj | UTCTimestamp): string => {
      if (!time) return "";
      if (typeof time === "string") return time.slice(0, 10);
      if (typeof time === "number") {
        // UTCTimestamp: segundos desde epoch UTC
        const date = new Date(time * 1000);
        return date.toISOString().slice(0, 10);
      }
      if (typeof time === "object" && time !== null) {
        const y = time.year?.toString().padStart(4, "0") ?? "0000";
        const m = time.month?.toString().padStart(2, "0") ?? "01";
        const d = time.day?.toString().padStart(2, "0") ?? "01";
        return `${y}-${m}-${d}`;
      }
      return "";
    },
    []
  );

  const timeToTimestamp = useCallback(
    (time: string | TimeObj | UTCTimestamp): number => {
      if (!time) return 0;
      if (typeof time === "string") {
        return Math.floor(Date.parse(time) / 1000);
      }
      if (typeof time === "number") {
        return time;
      }
      if (typeof time === "object" && time !== null) {
        const y = time.year ?? 0;
        const m = (time.month ?? 1) - 1;
        const d = time.day ?? 1;
        const h = time.hour ?? 0;
        return Math.floor(Date.UTC(y, m, d, h, 0, 0) / 1000);
      }
      return 0;
    },
    []
  );

  useEffect(() => {
    setIdTarifa(tarifaSelected);
    if (!isInvalid && areaData && lastValidRange.from && lastValidRange.to) {
      const filtered = (areaData || [])
        .filter((d) => {
          const dateStr = timeToDateString(d.time);
          return dateStr >= lastValidRange.from && dateStr <= lastValidRange.to;
        })
        .sort((a, b) => {
          const aTs = timeToTimestamp(a.time);
          const bTs = timeToTimestamp(b.time);
          return aTs - bTs;
        })
        .filter((d, i, arr) => {
          if (i === 0) return true;
          const prevTs = timeToTimestamp(arr[i - 1].time);
          const currTs = timeToTimestamp(d.time);
          return currTs !== prevTs;
        });
      setFilteredData(filtered);
    } else {
      setFilteredData(areaData || []);
    }
  }, [
    tarifaSelected,
    setIdTarifa,
    areaData,
    lastValidRange,
    isInvalid,
    fromDate,
    toDate,
    timeToDateString,
    timeToTimestamp,
  ]);

  useEffect(() => {
    setShow(true);
  }, []);

  // Estado para variaciones
  const [absChange, setAbsChange] = useState(0);
  const [pctChange, setPctChange] = useState(0);

  // Calcular variaciones cuando cambian los datos filtrados
  useEffect(() => {
    if (filteredData.length > 1) {
      const first = filteredData[0].value;
      const last = filteredData[filteredData.length - 1].value;
      setAbsChange(last - first);
      setPctChange(first !== 0 ? ((last - first) / first) * 100 : 0);
    } else {
      setAbsChange(0);
      setPctChange(0);
    }
  }, [filteredData]);

  // Actualizar datos filtrados cuando cambia la tarifa seleccionada
  useEffect(() => {
    if (!isInvalid) {
      const filtered = (areaData || [])
        .filter((d) => {
          const dateStr = timeToDateString(d.time);
          return dateStr >= lastValidRange.from && dateStr <= lastValidRange.to;
        })
        .sort((a, b) => {
          const aTs = timeToTimestamp(a.time);
          const bTs = timeToTimestamp(b.time);
          return aTs - bTs;
        })
        .filter((d, i, arr) => {
          if (i === 0) return true;
          const prevTs = timeToTimestamp(arr[i - 1].time);
          const currTs = timeToTimestamp(d.time);
          return currTs !== prevTs;
        });
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [
    areaData,
    lastValidRange,
    isInvalid,
    tarifaSelected,
    fromDate,
    toDate,
    timeToDateString,
    timeToTimestamp,
  ]);

  return (
    <SectionTable titulo="Tendencia de Aumentos de Tarifas">
      <section
        className={`transition-all duration-700 ease-out transform ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-3 mb-4 px-5 md:px-10 w-full justify-center items-stretch">
          <div className="flex flex-col w-full md:w-1/4 h-full justify-center items-center self-center gap-5">
            <section className="flex flex-col gap-3 w-full">
              <span className="text-lg text-center font-semibold text-[#566173] mb-1">
                Seleccione una tarifa
              </span>

              <FiltroInput
                defaultOption="Ninguna"
                label={"Tarifa"}
                onChange={(value: string) => {
                  value = value.replace("Tarifa ", "");
                  if (value === "Ninguna") {
                    setTarifaSelected(null);
                  } else {
                    setTarifaSelected(value);
                  }
                }}
                data={[...tableData.map((tarifa) => "Tarifa " + tarifa.tarifa)]}
              ></FiltroInput>
            </section>
            <section className="flex flex-col gap-3 w-full">
              <span className="text-lg text-center font-semibold text-[#566173] mb-1">
                Seleccione un rango
              </span>
              <div className="flex flex-col">
                <DateInput
                  label="Desde"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  shouldValidate={shouldValidate}
                  errorMessage={"Debe ser mayor que 'Hasta'."}
                />
              </div>
              <div className="flex flex-col">
                <DateInput
                  label="Hasta"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  shouldValidate={shouldValidate}
                  errorMessage={"Debe ser mayor que 'Desde'."}
                />
              </div>
            </section>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <Chart data={filteredData} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-7 md:gap-16 mt-8 w-full justify-center items-center">
          <AnimatedNumber
            value={absChange}
            symbol="$"
            symbolPosition="left"
            duration={1000}
            decimals={2}
            title={"Variación absoluta"}
          />
          <AnimatedNumber
            value={pctChange}
            symbol="%"
            symbolPosition="right"
            duration={1000}
            decimals={0}
            title={"Variación porcentual"}
          />
        </div>
      </section>
    </SectionTable>
  );
}

export default App;
