"use client";

import React, { createContext, useContext, useState } from "react";

interface FiltrosContextType {
  filtroCarga: string;
  setFiltroCarga: (v: string) => void;
  filtroVehiculo: string;
  setFiltroVehiculo: (v: string) => void;
  filtroZona: string;
  setFiltroZona: (v: string) => void;
  filtroAdicional: string;
  setFiltroAdicional: (v: string) => void;
  filtroTransportista: string;
  setFiltroTransportista: (v: string) => void;
  limpiarFiltros: () => void;
}

const FiltrosContext = createContext<FiltrosContextType | undefined>(undefined);

export const FiltrosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filtroCarga, setFiltroCarga] = useState("");
  const [filtroVehiculo, setFiltroVehiculo] = useState("");
  const [filtroZona, setFiltroZona] = useState("");
  const [filtroAdicional, setFiltroAdicional] = useState("");
  const [filtroTransportista, setFiltroTransportista] = useState("");

  const limpiarFiltros = () => {
    setFiltroCarga("");
    setFiltroVehiculo("");
    setFiltroZona("");
    setFiltroAdicional("");
    setFiltroTransportista("");
  };

  return (
    <FiltrosContext.Provider
      value={{
        filtroCarga,
        setFiltroCarga,
        filtroVehiculo,
        setFiltroVehiculo,
        filtroZona,
        setFiltroZona,
        filtroAdicional,
        setFiltroAdicional,
        filtroTransportista,
        setFiltroTransportista,
        limpiarFiltros,
      }}
    >
      {children}
    </FiltrosContext.Provider>
  );
};

export const useFiltros = () => {
  const context = useContext(FiltrosContext);
  if (!context)
    throw new Error("useFiltros debe usarse dentro de FiltrosProvider");
  return context;
};
