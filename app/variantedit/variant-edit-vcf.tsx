"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function VariantEditUploader() {
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset state when a new file is uploaded
    setColumns([]);
    setData([]);
    setError(null);

    if (file && file.name.endsWith(".vcf")) {
      const reader = new FileReader();

      // Read the file as text
      reader.onload = (e) => {
        const vcfText = e.target?.result as string;

        // If file is empty or unreadable, show error
        if (!vcfText || vcfText.trim() === "") {
          setError("The file appears to be empty or unreadable.");
          return;
        }

        const lines = vcfText.split("\n");

        // Find the line that starts with #CHROM to extract the column headers
        const headerLine = lines.find((line: string) =>
          line.startsWith("#CHROM")
        );
        if (headerLine) {
          const parsedColumns = headerLine.slice(1).trim().split("\t"); // Get columns and remove #
          setColumns(parsedColumns);
        } else {
          setError("Invalid VCF file: Missing header line (#CHROM)");
          return;
        }

        // Get data lines (after the header)
        const dataLines = lines.filter(
          (line: string) => !line.startsWith("#") && line.trim() !== ""
        );

        const parsedData = dataLines.map((line: string) => {
          return line.split("\t"); // Split each data line by tabs
        });

        setData(parsedData);
      };

      reader.onerror = () => {
        setError("Error reading the file. Please try again.");
      };

      reader.readAsText(file);
    } else {
      setError("Please upload a valid .vcf file.");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">VCF File Uploader</h1>
      <input
        type="file"
        accept=".vcf"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {columns.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Columns</h2>
          <Table className="table-auto border-collapse w-full">
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={index} className="border px-4 py-2 text-left">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((colData, colIndex) => (
                    <TableCell key={colIndex} className="border px-4 py-2">
                      {colData}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default VariantEditUploader;
