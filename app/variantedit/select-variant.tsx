"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus, CircleX } from "lucide-react";

type Variant = {
  gene: string;
  variantDetail: string;
  zygosity: string;
  globalAlleleFrequency: string;
  functionalImpact: string;
  acmgClassification: string;
  phenotype: string;
};

type SelectVariantProps = {
  variants: Variant[];
  selectedVariants: Variant[];
  setSelectedVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  setVariantExplanations: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
};

function SelectVariant({
  variants,
  selectedVariants,
  setSelectedVariants,
  setVariants,
  setVariantExplanations,
}: SelectVariantProps) {
  const handleAddVariant = (index: number) => {
    const variantToAdd = variants[index];
    if (!selectedVariants.includes(variantToAdd)) {
      setSelectedVariants([...selectedVariants, variantToAdd]);

      setVariantExplanations((prevExplanations) => ({
        ...prevExplanations,
        [variantToAdd.variantDetail]: `This synonymous variant is classified as likely benign based on its prevalence in the general population and lack of association with disease in current literature.\n`,
      }));
    }
  };

  const handleDeleteVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  return (
    <div>
      <p>Select the variant you wish to view details for.</p>

      <div className="flex items-center justify-center m-10 border p-10">
        <Table>
          <TableHeader className="text-gray-500">
            <TableRow>
              <TableHead className="px-6 py-3 text-center">GENE</TableHead>
              <TableHead className="px-6 py-3 text-center">
                VARIANT DETAIL
              </TableHead>
              <TableHead className="px-6 py-3 text-center">ZYGOSITY</TableHead>
              <TableHead className="px-6 py-3 text-center">
                GLOBAL ALLELE FREQUENCY
              </TableHead>
              <TableHead className="px-6 py-3 text-center">
                FUNCTIONAL IMPACT
              </TableHead>
              <TableHead className="text-center">ACMG CLASSIFICATION</TableHead>
              <TableHead className="text-center">PHENOTYPE</TableHead>
              <TableHead className="text-center">ACTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {variants.map((data, index) => (
              <TableRow key={index} className="text-left">
                <TableCell>{data.gene}</TableCell>
                <TableCell>{data.variantDetail}</TableCell>
                <TableCell>{data.zygosity}</TableCell>
                <TableCell>{data.globalAlleleFrequency}</TableCell>
                <TableCell>{data.functionalImpact}</TableCell>
                <TableCell>{data.acmgClassification}</TableCell>
                <TableCell>{data.phenotype}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button
                      variant="ghost"
                      className="hover:bg-violet-800 group hover:text-white"
                      onClick={() => handleAddVariant(index)}
                    >
                      <CirclePlus className="w-4 h-4 hover:text-white"></CirclePlus>
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:bg-red-800 group hover:text-white"
                      onClick={() => handleDeleteVariant(index)}
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
    </div>
  );
}

export default SelectVariant;
