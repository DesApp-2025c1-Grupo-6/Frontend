"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SectionTable from "../UI/SectionTable";
import Table from "@/src/components/Table";
import useHistorial from "@/src/hooks/useHistorial";
import Skeletons from "@/src/components/Skeletons";

const Index = () => {
  const router = useRouter();
  const { tableData, loading } = useHistorial();

  return (
    <SectionTable titulo="Historial de Tarifas">
      {loading ? (
        <Skeletons columns={5} rows={4} />
      ) : (
        <Table
          data={tableData}
          viewButton
          onView={(row) => {
            router.push(`/historial/${row.tarifa}`);
          }}
        />
      )}
    </SectionTable>
  );
};

export default Index;
