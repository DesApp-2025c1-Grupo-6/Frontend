import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./UI/Navbar";

export const metadata: Metadata = {
  title: "Gestión de tarifa de costos",
  description: "Aplicación para gestionar tarifas de costos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-chateau-100">
        {/* Navbar fija */}
        <Navbar />

        {/* Contenido con margen a la izquierda */}
        <main className="pl-16 min-h-screen ">{children}</main>
      </body>
    </html>
  );
}
