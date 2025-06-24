import Button from "@/src/components/Button";
import DownloadIcon from "@/src/icons/DownloadIcon";
import Plus from "@/src/icons/Plus";
import React from "react";

function SectionTable({
  titulo,
  children,
  textButton,
  onClickButton,
  onClickReporte,
}: {
  titulo: string;
  children: React.ReactNode;
  textButton: string;
  onClickReporte?: () => void;
  onClickButton?: () => void;
}) {
  return (
    <section className="flex flex-col p-10 h-screen bg-gray-chateau-100 gap-5">
      <div className="flex justify-between py-5">
        <h1 className="text-3xl font-semibold">{titulo}</h1>
        <div className="flex gap-4">
          {onClickReporte && (
            <Button
              onClick={onClickReporte}
              Icon={DownloadIcon}
              text={"Generar Reporte"}
            />
          )}
          <Button onClick={onClickButton} Icon={Plus} text={textButton} />
        </div>
      </div>
      {children}
    </section>
  );
}

export default SectionTable;
