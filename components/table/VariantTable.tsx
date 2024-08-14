"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CirclePlus, CircleX } from "lucide-react";

interface varianDetail {
  gene: string;
  variantdetail: string;
  zygosity: string;
  acmg?: string;
  globalallelefreq: number;
}

const varianDetailData = [
  {
    gene: "BRCA2",
    variantdetail: "c.6174delT",
    zygosity: "Heterozygous",
    acmg: "Pathogenic",
    globalallelefreq: 0.0001,
  },
  {
    gene: "APOE",
    variantdetail: "e4/e4",
    zygosity: "Homozygous",
    acmg: "Likely pathogenic",
    globalallelefreq: 0.15,
  },
  {
    gene: "F5",
    variantdetail: "c.1649G>A",
    zygosity: "Heterozygous",
    acmg: "Benign",
    globalallelefreq: 0.02,
  },
  {
    gene: "HBB",
    variantdetail: "c.376C>T",
    zygosity: "Heterozygous",
    acmg: "Pathogenic",
    globalallelefreq: 0.005,
  },
  {
    gene: "LDLR",
    variantdetail: "c.931G>A",
    zygosity: "Heterozygous",
    acmg: "Uncertain significance",
    globalallelefreq: 0.001,
  },
];

const VariantTable = () => {
  const [variantData, setVarianData] = useState<varianDetail[]>([]);

  useEffect(() => {
    setVarianData(varianDetailData);
  }, []);

  return (
    <div className="flex items-center justify-center m-10 border p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gen</TableHead>
            <TableHead>Variant Detail</TableHead>
            <TableHead>Zygosity</TableHead>
            <TableHead>ACMG Classification</TableHead>
            <TableHead>Global Allele Frequency</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {variantData.map((data, index) => (
            <TableRow key={index} className="text-center">
              <TableCell>{data.gene}</TableCell>
              <TableCell>{data.variantdetail}</TableCell>
              <TableCell>{data.zygosity}</TableCell>
              <TableCell>{data.acmg}</TableCell>
              <TableCell>{data.globalallelefreq}</TableCell>
              <TableCell>
                <div className="flex flex-row gap-1">
                  <Button
                    variant="ghost"
                    className="hover:bg-violet-800 group hover:text-white "
                  >
                    <CirclePlus className="w-4 h-4 hover:text-white"></CirclePlus>
                  </Button>
                  <Button
                    variant="ghost"
                    className="hover:bg-red-800 group hover:text-white"
                  >
                    <CircleX className="w-4 h-4 hover:text-white"></CircleX>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default VariantTable;
