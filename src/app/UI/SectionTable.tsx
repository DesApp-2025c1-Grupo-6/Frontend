import Button from "@/src/components/Button";
import DownloadIcon from "@/src/icons/DownloadIcon";
import Plus from "@/src/icons/Plus";
import React from "react";
import ArrowBack from "@/src/icons/ArrowBack";

function SectionTable({
  titulo,
  children,
  textButton,
  onClickButton,
  onClickReporte,
  backButton = false,
}: {
  titulo: string;
  children: React.ReactNode;
  textButton?: string;
  onClickReporte?: () => void;
  onClickButton?: () => void;
  backButton?: boolean;
}) {
  return (
    <section className="flex flex-col px-4 sm:px-6 md:px-10 py-6 min-h-screen bg-gray-chateau-100 gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3">
        <div>
          {backButton && (
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => window.history.back()}
            >
              <span className="flex items-center gap-2 text-wild-sand-600 hover:text-gray-800 font-semibold">
                <ArrowBack width="20" /> Volver
              </span>
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold">{titulo}</h1>
        </div>
        {(onClickReporte || textButton) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            {onClickReporte && (
              <Button
                onClick={onClickReporte}
                Icon={DownloadIcon}
                text={"Generar Reporte"}
              />
            )}
            {textButton && (
              <Button onClick={onClickButton} Icon={Plus} text={textButton} />
            )}
          </div>
        )}
      </div>

      {/* Tabla sin scroll */}
      <div className="w-full">{children}</div>
    </section>
  );
}
export default SectionTable;
