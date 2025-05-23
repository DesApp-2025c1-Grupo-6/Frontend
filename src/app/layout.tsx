import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestion de tarifa de costos",
  description: "Aplicación para gestionar tarifas de costos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-chateau-100 flex flex-col gap-4">
        {children}
      </body>
    </html>
  );
}
