import React, { useRef, useEffect } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  AreaData,
  DeepPartial,
  AreaSeriesOptions,
  AreaSeries,
  ColorType,
} from "lightweight-charts";

type ChartProps = {
  data: AreaData[];
};

function Chart({ data }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartContainerRef.current.innerHTML = "";

    const { clientWidth, clientHeight } = chartContainerRef.current;
    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: ColorType.Solid, color: "#eeeff1" },
      },
      width: clientWidth,
      height: clientHeight || 300,
    };

    const chart: IChartApi = createChart(
      chartContainerRef.current,
      chartOptions
    );
    chartRef.current = chart;

    const areaSeriesOptions: DeepPartial<AreaSeriesOptions> = {
      lineColor: "#566173",
      topColor: "#566173",
      bottomColor: "#bbc8dd",
    };

    const areaSeries: ISeriesApi<"Area"> = chart.addSeries(
      AreaSeries,
      areaSeriesOptions
    );
    areaSeries.setData(data);

    chart.timeScale().fitContent();

    // ResizeObserver para ajustar el tamaño del gráfico al contenedor
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        chart.applyOptions({ width, height });
      }
    });
    resizeObserver.observe(chartContainerRef.current);

    const links = chartContainerRef.current.querySelectorAll(
      "a[href*='tradingview.com']"
    );
    links.forEach((link) => link.remove());

    // Cleanup on unmount
    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [data]);

  return (
    <div
      className="w-full mx-auto h-full min-h-[300px] md:px-10 "
      ref={chartContainerRef}
    />
  );
}

export default Chart;
