import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

import VariantTable from "@/components/table/VariantTable";

interface varianDetail {
  gene: string;
  variantdetail: string;
  zygosity: string;
  acmg?: string;
  globalallelefreq: number;
}

const CostumeTable = () => {
  return (
    <div className="flex items-center justify-center m-10 border p-10 w-full">
      <div className="flex flex-col items-center w-full">
        <p className="text-2xl">Data Variant Detail</p>
        <VariantTable></VariantTable>
      </div>
    </div>
  );
};
export default CostumeTable;
