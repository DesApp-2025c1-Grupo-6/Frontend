import { FiltrosProvider } from "@/src/context/FiltrosContext";

export default function TarifaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FiltrosProvider>{children}</FiltrosProvider>;
}
