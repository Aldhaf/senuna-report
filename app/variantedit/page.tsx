"use client";

import { useState } from "react";
import { ReactNode } from "react";
import PatientInformation from "./patient-information";
import TestingMaterial from "./testing-material";
import SelectVariant from "./select-variant";
import ResultInterpretation from "./result-interpretation";
import Recommendation from "./recommendation";
import PreviewReport from "./preview-report";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type Variant = {
  gene: string;
  variantDetail: string;
  zygosity: string;
  globalAlleleFrequency: string;
  functionalImpact: string;
  acmgClassification: string;
  phenotype: string;
};

const initialVariants: Variant[] = [
  {
    gene: "MYH7",
    variantDetail: "c.388T>C (p.Cys130Arg)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.001",
    functionalImpact: "Missense",
    acmgClassification: "Likely Benign",
    phenotype: "HP:0001645",
  },
  {
    gene: "TNNT2",
    variantDetail: "c.388T>C (p.Cys130Arg)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.00003",
    functionalImpact: "Missense",
    acmgClassification: "Likely Benign",
    phenotype: "HP:0000822",
  },
  {
    gene: "APOE",
    variantDetail: "c.388T>C (p.Cys130Arg)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.00003",
    functionalImpact: "Synonymous",
    acmgClassification: "Likely Benign",
    phenotype: "HP:0002017",
  },
  {
    gene: "LDLR",
    variantDetail: "c.2140-5T>G",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.001",
    functionalImpact: "Synonymous",
    acmgClassification: "VUS",
    phenotype: "HP:0003124",
  },
  {
    gene: "LRRK2",
    variantDetail: "c.6055G>A (p.Gly2019Ser)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.001",
    functionalImpact: "Nonsense",
    acmgClassification: "VUS",
    phenotype: "HP:0002302",
  },
  {
    gene: "BRCA1",
    variantDetail: "c.181T>G (p.Cys61Gly)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.001",
    functionalImpact: "Splice site",
    acmgClassification: "Pathogenic",
    phenotype: "HP:0009725",
  },
  {
    gene: "CFTR",
    variantDetail: "c.1521_1523delCTT (p.Phe508del)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "0.02",
    functionalImpact: "Splice site",
    acmgClassification: "Pathogenic",
    phenotype: "HP:0005202",
  },
  {
    gene: "GBA",
    variantDetail: "c.1448T>C (p.Leu483Pro)",
    zygosity: "Heterozygous",
    globalAlleleFrequency: "N/A",
    functionalImpact: "Splice site",
    acmgClassification: "Pathogenic",
    phenotype: "HP:0001970",
  },
];

function Page() {
  const [activeTab, setActiveTab] = useState<string>("patient-info");
  const [variants, setVariants] = useState<Variant[]>(initialVariants);
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [variantExplanations, setVariantExplanations] = useState<{
    [key: string]: string;
  }>({});
  const [editingVariant, setEditingVariant] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const [recommendations, setRecommendations] = useState<string[]>([
    "Follow-up genetic counseling is recommended to discuss the implications of the detected pathogenic and uncertain variants.",
    "Family screening may be advised for the pathogenic variant identified in TNNT2.",
  ]);

  const [counselorNotes, setCounselorNotes] = useState<string[]>([
    "MYH7 Variant: Given the benign nature of the MYH7 variant, no immediate clinical action is required. However, it's important to note that genetic factors are just one aspect of disease risk.",
    "TNNT2 Variant: The identification of the pathogenic variant in TNNT2 suggests a significant risk for hypertrophic cardiomyopathy. It is strongly recommended that the patient engage in a detailed discussion with a cardiologist. Screening of first-degree relatives may also be considered.",
    "TNNI3 Variant: The uncertainty associated with the TNNI3 variant warrants cautious interpretation. We recommend periodic review of the scientific literature and potential re-evaluation of this variant's clinical significance as new data emerge.",
  ]);

  const [conclusion, setConclusion] = useState<string>(
    "This report reflects the findings based on the genetic testing performed with the current known scientific literature and available databases. Variants are classified according to the American College of Medical Genetics and Genomics (ACMG) guidelines. Changes in the classification of these variants may occur as new information becomes available."
  );

  const [executiveSummary, setExecutiveSummary] = useState<string>(
    "This genetic testing report summarizes the findings from the sample provided. The analysis was focused on identifying variants associated with hereditary cardiomyopathy. The results include information on detected genetic variants, their classification, and potential clinical implications."
  );

  const [approvedBy, setApprovedBy] = useState<string[]>([
    "Rina Maheswari, M.Sc. Ph.D. - Head Laboratory",
    "Lia Kartika, M.D. - Genetics Counselor",
    "Putu Bagus, M.G.C - Clinical Pathology",
  ]);

  const tabs: Tab[] = [
    {
      id: "patient-info",
      label: "Patient Information",
      content: <PatientInformation />,
    },
    {
      id: "testing-material",
      label: "Testing Material and Report",
      content: <TestingMaterial />,
    },
    {
      id: "select-variant",
      label: "Select Variant",
      content: (
        <SelectVariant
          variants={variants}
          selectedVariants={selectedVariants}
          setSelectedVariants={setSelectedVariants}
          setVariants={setVariants}
          setVariantExplanations={setVariantExplanations}
        />
      ),
    },
    {
      id: "result-interpretation",
      label: "Result and Interpretation",
      content: (
        <ResultInterpretation
          setSelectedVariants={setSelectedVariants}
          selectedVariants={selectedVariants}
          setVariantExplanations={setVariantExplanations}
          variantExplanations={variantExplanations}
          editText={editText}
          setEditText={setEditText}
          editingVariant={editingVariant}
          setEditingVariant={setEditingVariant}
        />
      ),
    },
    {
      id: "recommendation",
      label: "Recommendation",
      content: (
        <Recommendation
          setRecommendations={setRecommendations}
          recommendations={recommendations}
          counselorNotes={counselorNotes}
          setCounselorNotes={setCounselorNotes}
          conclusion={conclusion}
          setConclusion={setConclusion}
        />
      ),
    },
    {
      id: "preview-report",
      label: "Preview Report",
      content: (
        <PreviewReport
          executiveSummary={executiveSummary}
          approvedBy={approvedBy}
          setApprovedBy={setApprovedBy}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            } border-b-2`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id}>
                <h1>{tab.label}</h1>
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Page;
