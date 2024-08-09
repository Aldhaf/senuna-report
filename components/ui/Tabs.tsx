"use client";

import { useState, ReactNode } from "react";

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
  acmgClassification: string;
  globalAlleleFrequency: string;
  reviewerClassification: string;
  description: string;
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
    variantDetail: "c.1503TC (p.Tyr501=)",
    zygosity: "Heterozygous",
    acmgClassification: "Likely Benign",
    globalAlleleFrequency: "0.0005",
    reviewerClassification: "Likely Benign",
    description:
      "This synonymous variant is classified as likely benign based on its prevalence in the general population and lack of association with disease in current literature.",
  },
  {
    gene: "TNNT2",
    variantDetail: "c.518CT (p.Arg173Cys)",
    zygosity: "Heterozygous",
    acmgClassification: "-",
    globalAlleleFrequency: "0.0001",
    reviewerClassification: "-",
    description:
      "This missense variant is classified as pathogenic. It is known to affect protein function and has been previously reported in patients with hypertrophic cardiomyopathy.",
  },
  {
    gene: "TNNI3",
    variantDetail: "c.253GA (p.Arg85His)",
    zygosity: "Heterozygous",
    acmgClassification: "Variant of Unknown Significance",
    globalAlleleFrequency: "0.001",
    reviewerClassification: "Variant of Unknown Significance",
    description:
      "This variant is currently classified as a variant of unknown significance. Further studies are required to understand its impact on protein function and association with cardiac conditions.",
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

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("patient-info");
  const [patientInfo, setPatientInfo] =
    useState<PatientInfo>(initialPatientInfo);
  const [variants, setVariants] = useState<Variant[]>(initialVariants);

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

  const handleDeleteVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
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
      content: <p>Choose the variant for the test.</p>,
    },
    {
      id: "result-interpretation",
      label: "Result and Interpretation",
      content: (
        <div>
          <table className="min-w-full text-left text-sm text-gray-500 mt-4">
            <thead>
              <tr>
                <th className="px-6 py-3">GENE</th>
                <th className="px-6 py-3">VARIANT DETAIL</th>
                <th className="px-6 py-3">ZYGOSITY</th>
                <th className="px-6 py-3">ACMG CLASSIFICATION</th>
                <th className="px-6 py-3">GLOBAL ALLELE FREQUENCY</th>
                <th className="px-6 py-3">ACTION</th>
                <th className="px-6 py-3">REVIEWERS CLASSIFICATION</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">{variant.gene}</td>
                  <td className="px-6 py-4">{variant.variantDetail}</td>
                  <td className="px-6 py-4">{variant.zygosity}</td>
                  <td className="px-6 py-4">{variant.acmgClassification}</td>
                  <td className="px-6 py-4">{variant.globalAlleleFrequency}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        const newDetail = prompt(
                          "Enter new variant detail",
                          variant.variantDetail
                        );
                        if (newDetail)
                          handleVariantChange(
                            index,
                            "variantDetail",
                            newDetail
                          );
                      }}
                    >
                      Edit
                    </button>{" "}
                    |{" "}
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteVariant(index)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {variant.reviewerClassification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <h2 className="text-md font-medium text-gray-900">
              Variant Details
            </h2>

            {variants.map((variant, index) => (
              <div key={index} className="mt-4">
                <p>
                  <strong>{variant.variantDetail}:</strong>{" "}
                  {variant.description}
                </p>
                <button
                  className="text-blue-500 mt-1"
                  onClick={() => {
                    const newDescription = prompt(
                      "Enter new description",
                      variant.description
                    );
                    if (newDescription)
                      handleVariantChange(index, "description", newDescription);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
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
          <button className="text-blue-500 mt-1">Edit</button>

          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li>
              Follow-up genetic counseling is recommended to discuss the
              implications of the detected pathogenic and uncertain variants.
            </li>
            <li>
              Family screening may be advised for the pathogenic variant
              identified in TNNT2.
            </li>
          </ul>

          <div className="mt-6">
            <h2 className="text-md font-medium text-gray-900">
              Genetics Counselor's Note
            </h2>
            <p className="text-sm text-gray-500">
              This info will be displayed on report
            </p>
            <button className="text-blue-500 mt-1">Edit</button>

            <ul className="list-disc ml-6 mt-4 text-gray-700">
              <li>
                <strong>MYH7 Variant:</strong> Given the benign nature of the
                MYH7 variant, no immediate clinical action is required. However,
                it's important to note that genetic factors are just one aspect
                of disease risk.
              </li>
              <li>
                <strong>TNNT2 Variant:</strong> The identification of the
                pathogenic variant in TNNT2 suggests a significant risk for
                hypertrophic cardiomyopathy. It is strongly recommended that the
                patient engage in a detailed discussion with a cardiologist.
                Screening of first-degree relatives may also be considered.
              </li>
              <li>
                <strong>TNNI3 Variant:</strong> The uncertainty associated with
                the TNNI3 variant warrants cautious interpretation. We recommend
                periodic review of the scientific literature and potential
                re-evaluation of this variant's clinical significance as new
                data emerge.
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-md font-medium text-gray-900">Conclusion</h2>
            <p className="text-sm text-gray-500">
              This info will be displayed on report
            </p>
            <button className="text-blue-500 mt-1">Edit</button>

            <ul className="list-disc ml-6 mt-4 text-gray-700">
              <li>
                This report reflects the findings based on the genetic testing
                performed with the current known scientific literature and
                available databases. Variants are classified according to the
                American College of Medical Genetics and Genomics (ACMG)
                guidelines. Changes in the classification of these variants may
                occur as new information becomes available.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "preview-report",
      label: "Preview Report",
      content: <p>Preview the final report before submission.</p>,
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
