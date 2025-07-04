"use client";

import SectionTable from "../../UI/SectionTable";
import Table from "@/src/components/Table";
import { useParams, useRouter } from "next/navigation";
import useHistorial from "@/src/hooks/useHistorial";
import TableSkeleton from "@/src/components/Skeletons";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { tableData, loading } = useHistorial(id);
  const filteredTableData = tableData.map(({ tarifa, ...rest }) => {
    if (rest["ultima accion"] !== undefined) {
      rest["accion"] = rest["ultima accion"];
      delete rest["ultima accion"];
    }
    return rest;
  });

  return (
    <SectionTable
      titulo={`Historial de modificaciones de la tarifa: ${
        id ?? "Desconocido"
      }`}
    >
      {loading ? (
        <TableSkeleton columns={5} />
      ) : (
        <Table
          data={filteredTableData}
          viewButton
          onView={(row) => {
            router.push(`/historial/detalles/${row.id}`);
          }}
        />
      )}
    </SectionTable>
  );
};

export default Page;
