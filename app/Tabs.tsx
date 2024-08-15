"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CirclePlus, CircleX } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type PatientInfo = {
  fullName: string;
  sex: string;
  dateOfBirth: string;
  sample: string;
  medicalHistory: string;
  currentDiagnosis: string;
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

const initialPatientInfo: PatientInfo = {
  fullName: "Andi Saputra",
  sex: "Male",
  dateOfBirth: "14 February 1988",
  sample: "Blood",
  medicalHistory: "No-Significant History",
  currentDiagnosis: "Type II Diabetes",
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

const EditableRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  return (
    <tr className="border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {label}
      </th>
      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1"
          />
        ) : (
          value
        )}
      </td>
      <td className="px-6 py-4 text-blue-500 cursor-pointer">
        {isEditing ? (
          <span onClick={handleSave}>Save</span>
        ) : (
          <span onClick={() => setIsEditing(true)}>Edit</span>
        )}
      </td>
    </tr>
  );
};

const RecommendationRow = ({
  content,
  onEdit,
}: {
  content: string;
  onEdit: (newContent: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <li className="mt-2">
      {isEditing ? (
        <div className="flex">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <button className="ml-2 text-blue-500" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <span>{content}</span>
      )}
      {!isEditing && (
        <button
          className="ml-2 text-blue-500"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}
    </li>
  );
};

const Tabs: React.FC = () => {
  const router = useRouter();
  const handleViewRButton = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/reportview");
  };

  const [activeTab, setActiveTab] = useState<string>("patient-info");
  const [patientInfo, setPatientInfo] =
    useState<PatientInfo>(initialPatientInfo);
  const [variants, setVariants] = useState<Variant[]>(initialVariants);
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [additionalText, setAdditionalText] = useState<string>("");
  // Use a state to store the explanatory text for each variant detail
  const [editingVariant, setEditingVariant] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [variantExplanations, setVariantExplanations] = useState<{ [key: string]: string }>({});


  // Handel Add, Delete, Remove di tabs Select Variant dan Result and Interpretation
  const handleAddVariant = (index: number) => {
    const variantToAdd = variants[index];
    if (!selectedVariants.includes(variantToAdd)) {
        setSelectedVariants([...selectedVariants, variantToAdd]);

        // Add or update the explanatory text for the specific variant detail
        setVariantExplanations(prevExplanations => ({
            ...prevExplanations,
            [variantToAdd.variantDetail]:
            `This synonymous variant is classified as likely benign based on its prevalence in the general population and lack of association with disease in current literature.\n`
        }));
    }
};

const handleDeleteVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
};

const handleRemoveSelectedVariant = (index: number) => {
    const variantToRemove = selectedVariants[index];
    const updatedSelectedVariants = selectedVariants.filter(
        (_, i) => i !== index
    );
    setSelectedVariants(updatedSelectedVariants);

    // Count how many instances of the same variant detail remain in the table
    const remainingInstances = updatedSelectedVariants.filter(
        variant => variant.variantDetail === variantToRemove.variantDetail
    ).length;

    // Only remove the explanatory text if no instances of the variant detail remain
    if (remainingInstances === 0) {
        setVariantExplanations(prevExplanations => {
            const { [variantToRemove.variantDetail]: _, ...remainingExplanations } = prevExplanations;
            return remainingExplanations;
        });
    }

    setAdditionalText(`You have removed a variant from the results.`);
};

const handleEditVariant = (variantDetail: string) => {
    setEditingVariant(variantDetail);
    setEditText(variantExplanations[variantDetail] || "");
};

const handleSaveEdit = (variantDetail: string) => {
    setVariantExplanations(prevExplanations => ({
        ...prevExplanations,
        [variantDetail]: editText
    }));
    setEditingVariant(null);
};

const handleCancelEdit = () => {
    setEditingVariant(null);
};
  // ================================================================================

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

  const handleInfoChange = (key: keyof PatientInfo, value: string) => {
    setPatientInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleVariantChange = (
    index: number,
    key: keyof Variant,
    value: string
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const handleAddRecommendation = () => {
    const newRec = prompt("Enter new recommendation");
    if (newRec) {
      setRecommendations([...recommendations, newRec]);
    }
  };

  const handleEditRecommendation = (index: number, newContent: string) => {
    const updatedRecs = [...recommendations];
    updatedRecs[index] = newContent;
    setRecommendations(updatedRecs);
  };

  const handleAddCounselorNote = () => {
    const newNote = prompt("Enter new counselor's note");
    if (newNote) {
      setCounselorNotes([...counselorNotes, newNote]);
    }
  };

  const handleEditCounselorNote = (index: number, newContent: string) => {
    const updatedNotes = [...counselorNotes];
    updatedNotes[index] = newContent;
    setCounselorNotes(updatedNotes);
  };

  const handleEditConclusion = (newContent: string) => {
    setConclusion(newContent);
  };

  const handleEditExecutiveSummary = (newContent: string) => {
    setExecutiveSummary(newContent);
  };

  const handleAddApproval = () => {
    const newApproval = prompt("Enter new approver");
    if (newApproval) {
      setApprovedBy([...approvedBy, newApproval]);
    }
  };

  const tabs: Tab[] = [
    {
      id: "patient-info",
      label: "Patient Information",
      content: (
        <div>
          <p>This info will be displayed on report</p>
          <table className="min-w-full text-left text-sm text-gray-500">
            <tbody>
              <EditableRow
                label="Full name"
                value={patientInfo.fullName}
                onChange={(value) => handleInfoChange("fullName", value)}
              />
              <EditableRow
                label="Sex"
                value={patientInfo.sex}
                onChange={(value) => handleInfoChange("sex", value)}
              />
              <EditableRow
                label="Date of Birth"
                value={patientInfo.dateOfBirth}
                onChange={(value) => handleInfoChange("dateOfBirth", value)}
              />
              <EditableRow
                label="Sample"
                value={patientInfo.sample}
                onChange={(value) => handleInfoChange("sample", value)}
              />
              <EditableRow
                label="Medical History"
                value={patientInfo.medicalHistory}
                onChange={(value) => handleInfoChange("medicalHistory", value)}
              />
              <EditableRow
                label="Current Diagnosis"
                value={patientInfo.currentDiagnosis}
                onChange={(value) =>
                  handleInfoChange("currentDiagnosis", value)
                }
              />
            </tbody>
          </table>
          <div className="mt-4">
            <h4 className="font-medium text-gray-900">Supplementary Files</h4>
            <p className="text-sm text-gray-500">
              1. Patient Consent Form 2. Lab. Report 3. Medical History
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "testing-material",
      label: "Testing Material and Report",
      content: (
        <div>
          <p>This info will be displayed on report</p>
          <table className="min-w-full text-left text-sm text-gray-500">
            <tbody>
              <EditableRow
                label="Testing Method"
                value="Next Generation Sequencing (NGS)"
                onChange={(value) =>
                  console.log("Updated Testing Method:", value)
                }
              />
              <EditableRow
                label="Gene Panel"
                value="Comprehensive Cardiomyopathy Panel"
                onChange={(value) => console.log("Updated Gene Panel:", value)}
              />
              <EditableRow
                label="Testing Description"
                value={`The genetic analysis was performed using high-throughput Next Generation Sequencing (NGS) on a blood sample. DNA was extracted using the QIAamp DNA Blood Mini Kit. Sequencing was carried out on an Illumina HiSeq 4000 platform, covering all coding regions and intron-exon boundaries of the genes listed.`}
                onChange={(value) =>
                  console.log("Updated Testing Description:", value)
                }
              />
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "select-variant",
      label: "Select Variant",
      content: (
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
                  <TableHead className="px-6 py-3 text-center">
                    ZYGOSITY
                  </TableHead>
                  <TableHead className="px-6 py-3 text-center">
                    GLOBAL ALLELE FREQUENCY
                  </TableHead>
                  <TableHead className="px-6 py-3 text-center">
                    FUNCTIONAL IMPACT
                  </TableHead>
                  <TableHead className="text-center">
                    ACMG CLASSIFICATION
                  </TableHead>
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
      ),
    },
    {
      id: "result-interpretation",
      label: "Result and Interpretation",
      content: (
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
            <h2 className="text-md font-semibold text-gray-900">
              Variant Details
            </h2>
            <div style={{ whiteSpace: "pre-line" }}>
              {Object.entries(variantExplanations).map(([variantDetail, explanation], index) => (
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
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "recommendation",
      label: "Recommendation",
      content: (
        <div>
          <h1 className="text-lg font-medium text-gray-900">Recommendation</h1>
          <p className="text-sm text-gray-500">
            This info will be displayed on the report
          </p>
          <button
            className="text-blue-500 mt-1"
            onClick={handleAddRecommendation}
          >
            Add Recommendation
          </button>

          <ul className="list-disc ml-6 mt-4 text-gray-700">
            {recommendations.map((rec, index) => (
              <RecommendationRow
                key={index}
                content={rec}
                onEdit={(newContent) =>
                  handleEditRecommendation(index, newContent)
                }
              />
            ))}
          </ul>

          <div className="mt-6">
            <h2 className="text-md font-medium text-gray-900">
              Genetics Counselor's Note
            </h2>
            <p className="text-sm text-gray-500">
              This info will be displayed on report
            </p>
            <button
              className="text-blue-500 mt-1"
              onClick={handleAddCounselorNote}
            >
              Add Counselor's Note
            </button>

            <ul className="list-disc ml-6 mt-4 text-gray-700">
              {counselorNotes.map((note, index) => (
                <RecommendationRow
                  key={index}
                  content={note}
                  onEdit={(newContent) =>
                    handleEditCounselorNote(index, newContent)
                  }
                />
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-md font-medium text-gray-900">Conclusion</h2>
            <p className="text-sm text-gray-500">
              This info will be displayed on report
            </p>
            <RecommendationRow
              content={conclusion}
              onEdit={handleEditConclusion}
            />
          </div>
        </div>
      ),
    },
    {
      id: "preview-report",
      label: "Preview Report",
      content: (
        <div>
          <h1 className="text-lg font-medium text-gray-900">
            See Complete Report
          </h1>
          <p className="text-sm text-gray-500">
            This info will be displayed on report
          </p>

          <div className="text-blue-500 mt-4 cursor-pointer">
            <button onClick={handleViewRButton}>view</button>
            {/* <Link href="./PdfView">View</Link> */}
          </div>

          <h2 className="mt-6 text-md font-medium text-gray-900">
            Executive Summary
          </h2>
          <p className="text-sm text-gray-500 mt-2">{executiveSummary}</p>

          <div className="mt-6">
            <h2 className="text-md font-medium text-gray-900">Approved By</h2>
            <ul className="list-disc ml-6 mt-4 text-gray-700">
              {approvedBy.map((approver, index) => (
                <li key={index}>
                  <span>{approver}</span>
                </li>
              ))}
            </ul>
            <button className="text-blue-500 mt-1" onClick={handleAddApproval}>
              Add Approver
            </button>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button className="text-blue-500">
              + Submit & Complete Report
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
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
};

export default Tabs;
