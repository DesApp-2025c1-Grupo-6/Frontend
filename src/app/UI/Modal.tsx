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
      className="fixed hidden justify-center items-center h-screen w-screen"
    >
      <span className="absolute size-full bg-black/45 z-40"></span>
      <section className="flex flex-col gap-3 justify-center items-center p-3 w-1/3 bg-gray-chateau-50 rounded-2xl shadow-lg z-50">
        <h1 className="w-full text-left text-2xl font-semibold">{title}</h1>
        <p className="w-full text-left text-wild-sand-600">
          {description && description}
        </p>
        {children && (
          <section className="flex flex-col gap-3 w-full p-3">
            {children}
          </section>
        )}
        <div className="flex justify-end w-full gap-2">
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
