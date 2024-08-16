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
import { CircleX } from "lucide-react";

type Variant = {
  gene: string;
  variantDetail: string;
  zygosity: string;
  globalAlleleFrequency: string;
  functionalImpact: string;
  acmgClassification: string;
  phenotype: string;
};

type ResultInterpretationProps = {
  selectedVariants: Variant[];
  setSelectedVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  setVariantExplanations: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  variantExplanations: { [key: string]: string };
  editingVariant: string | null;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  setEditingVariant: React.Dispatch<React.SetStateAction<string | null>>;
};

function ResultInterpretation({
  selectedVariants,
  setSelectedVariants,
  setVariantExplanations,
  variantExplanations,
  editingVariant,
  editText,
  setEditText,
  setEditingVariant,
}: ResultInterpretationProps) {
  const handleRemoveSelectedVariant = (index: number) => {
    const variantToRemove = selectedVariants[index];
    const updatedSelectedVariants = selectedVariants.filter(
      (_, i) => i !== index
    );
    setSelectedVariants(updatedSelectedVariants);

    // Count how many instances of the same variant detail remain in the table
    const remainingInstances = updatedSelectedVariants.filter(
      (variant) => variant.variantDetail === variantToRemove.variantDetail
    ).length;

    // Only remove the explanatory text if no instances of the variant detail remain
    if (remainingInstances === 0) {
      setVariantExplanations((prevExplanations) => {
        const { [variantToRemove.variantDetail]: _, ...remainingExplanations } =
          prevExplanations;
        return remainingExplanations;
      });
    }
  };

  const handleSaveEdit = (variantDetail: string) => {
    setVariantExplanations((prevExplanations) => ({
      ...prevExplanations,
      [variantDetail]: editText,
    }));
    setEditingVariant(null);
  };

  const handleCancelEdit = () => {
    setEditingVariant(null);
  };

  const handleEditVariant = (variantDetail: string) => {
    setEditingVariant(variantDetail);
    setEditText(variantExplanations[variantDetail] || "");
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>GENE</TableHead>
            <TableHead>VARIANT DETAIL</TableHead>
            <TableHead>ZYGOSITY</TableHead>
            <TableHead>ACMG CLASSIFICATION</TableHead>
            <TableHead>GLOBAL ALLELE FREQUENCY</TableHead>
            <TableHead>ACTION</TableHead>
            <TableHead>REVIEWERS CLASSIFICATION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedVariants.map((variant, index) => (
            <TableRow key={index}>
              <TableCell>{variant.gene}</TableCell>
              <TableCell>{variant.variantDetail}</TableCell>
              <TableCell>{variant.zygosity}</TableCell>
              <TableCell>{variant.acmgClassification}</TableCell>
              <TableCell>{variant.globalAlleleFrequency}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="hover:bg-red-800 group hover:text-white"
                  onClick={() => handleRemoveSelectedVariant(index)}
                >
                  <CircleX className="w-4 h-4 hover:text-white"></CircleX>
                </Button>
              </TableCell>
              <TableCell>{variant.acmgClassification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <h2 className="text-md font-semibold text-gray-900">Variant Details</h2>
        <div style={{ whiteSpace: "pre-line" }}>
          {Object.entries(variantExplanations).map(
            ([variantDetail, explanation], index) => (
              <div key={index} className="mt-4 text-gray-700">
                <p className="font-bold">{variantDetail}</p>
                {editingVariant === variantDetail ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 p-2"
                    />
                    <div className="mt-2">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:underline mr-2"
                        onClick={() => handleSaveEdit(variantDetail)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:underline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{explanation}</p>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditVariant(variantDetail)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultInterpretation;
