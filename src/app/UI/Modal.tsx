import Button from "@/src/components/Button";
import React from "react";

function Modal({
  children,
  title,
  id,
  description,
  lineButton,
  fillButton,
  lineButtonText,
  fillButtonText,
  lineButtonColor,
  fillButtonColor,
  fillButtonAction,
  lineButtonAction,
}: {
  children?: React.ReactNode;
  title: string;
  id: string;
  description?: string;
  lineButton?: boolean;
  fillButton?: boolean;
  lineButtonText?: string;
  fillButtonText?: string;
  lineButtonColor?: string;
  fillButtonColor?: string;
  fillButtonAction?: () => void;
  lineButtonAction?: () => void;
}) {
  return (
    <section
      id={id}
      className="fixed hidden justify-center items-center inset-0 z-50 bg-black/45 px-4 py-6"
    >
      <section className="flex flex-col gap-2 lg:gap-4 justify-center items-start w-full max-w-xl bg-gray-chateau-50 rounded-2xl shadow-lg p-5 overflow-y-hidden ">
        {/* Título del modal, con corte de palabras y ajuste a pantalla */}
        <h1 className="w-full max-w-full text-left text-md lg:text-2xl font-semibold break-words leading-tight text-black">
          {title}
        </h1>

        {/* Descripción opcional */}
        {description && (
          <p className="w-full text-left text-wild-sand-600 break-words">
            {description}
          </p>
        )}

        {/* Contenido del modal */}
        {children && (
          <section className="flex flex-col gap-4 w-full">{children}</section>
        )}

        {/* Botones */}
        <div className="flex justify-end w-full gap-2 flex-wrap">
          {lineButton && (
            <Button
              onClick={lineButtonAction}
              text={lineButtonText ?? ""}
              line
              color={lineButtonColor}
            />
          )}
          {fillButton && (
            <Button
              onClick={fillButtonAction}
              text={fillButtonText ?? ""}
              color={fillButtonColor}
            />
          )}
        </div>
      </section>
    </section>
  );
}

export default Modal;
