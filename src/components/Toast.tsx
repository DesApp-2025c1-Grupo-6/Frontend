import Check from "../icons/Check";
import Error from "../icons/Error";
import React, { useEffect, useState } from "react";
import Plus from "../icons/Plus";
import { ToastProps } from "../types";

/**
 * Componente Toast para mostrar mensajes de notificación temporales.
 *
 * @remarks
 * Este componente muestra una notificación (toast) en la esquina superior derecha de la pantalla.
 * Soporta estados de éxito y error, título y mensaje personalizables, y se cierra automáticamente después de un tiempo.
 * El usuario también puede cerrarlo manualmente.
 *
 * @param props - Las propiedades del componente Toast.
 * @param props.type - Tipo de toast: "success" o "error".
 * @param props.title - El texto del título que se muestra en la parte superior del toast.
 * @param props.message - El contenido del mensaje del toast.
 * @param props.open - Controla la visibilidad del toast. Por defecto es false.
 * @param props.onClose - Callback opcional que se ejecuta cuando el toast se cierra (automática o manualmente).
 *
 * @example
 * ```tsx
 * <Toast
 *   type="success"
 *   title="Operación exitosa"
 *   message="Tus cambios han sido guardados."
 *   open={mostrarToast}
 *   onClose={() => setMostrarToast(false)}
 * />
 * ```
 */

function Toast({ type, title, message, open = false, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (!visible && onClose) {
      const timeout = setTimeout(onClose, 300);
      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  const backgroundColor =
    type === "success"
      ? "bg-esmerald-500"
      : type === "error"
      ? "bg-roman-500"
      : "";
  const textColor =
    type === "success"
      ? "text-esmerald-700"
      : type === "error"
      ? "text-roman-700"
      : "";

  return (
    <section
      className={`fixed right-0 top-10 z-50 flex max-w-96 w-96 h-32 min-h-32 rounded-l-2xl gap-2 overflow-hidden bg-gray-100 shadow-lg transition-all duration-300
        ${visible ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <span className={`h-full w-3 min-w-3 ${backgroundColor}`} />
      <div className="w-full flex flex-col justify-start items-center">
        <div className="flex w-full items-center p-1">
          {type === "success" && <Check />}
          {type === "error" && <Error />}
          <h1
            className={`text-center w-4/5 text-xl font-semibold ml-2 ${textColor}`}
          >
            {title}
          </h1>
          <button
            className="font-bold text-2xl text-gray-300 cursor-pointer hover:text-gray-500"
            onClick={() => setVisible(false)}
            aria-label="Cerrar"
          >
            <Plus className="rotate-45 text-wild-sand-600"></Plus>
          </button>
        </div>
        <span className={"w-full px-2 h-1 " + backgroundColor}></span>
        <p
          className={`m-1 text-center italic ${textColor} overflow-y-auto break-words`}
          style={{ maxHeight: "40vh", width: "90%" }}
        >
          {message}
        </p>
      </div>
    </section>
  );
}

export default Toast;
