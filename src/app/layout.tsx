import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./UI/Navbar";

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
      <body className="flex h-screen w-screen bg-gray-chateau-100">
        <Navbar />
        <main className="bg-gray-chateau-100 flex flex-col gap-4 size-full">
          {children}
        </main>
      </body>
    </html>
  );
}
