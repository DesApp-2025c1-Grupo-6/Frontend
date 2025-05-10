import { useState, useRef, useCallback } from "react";

export function useToast() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (title: string, message: string, type: "success" | "error" = "success") => {
      setToastVisible(true);
      setToastTitle(title);
      setToastMessage(message);
      setToastType(type);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    },
    []
  );

  return {
    toastVisible,
    toastMessage,
    toastTitle,
    toastType,
    showToast,
  };
}
