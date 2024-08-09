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

const initialPatientInfo: PatientInfo = {
  fullName: "Andi Saputra",
  sex: "Male",
  dateOfBirth: "14 February 1988",
  sample: "Blood",
  medicalHistory: "No-Significant History",
  currentDiagnosis: "Type II Diabetes",
};

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

  const handleInfoChange = (key: keyof PatientInfo, value: string) => {
    setPatientInfo((prev) => ({ ...prev, [key]: value }));
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
      content: <p>Details about the testing material and report.</p>,
    },
    {
      id: "select-variant",
      label: "Select Variant",
      content: <p>Choose the variant for the test.</p>,
    },
    {
      id: "result-interpretation",
      label: "Result and Interpretation",
      content: <p>Analysis and interpretation of the test results.</p>,
    },
    {
      id: "recommendation",
      label: "Recommendation",
      content: <p>Suggestions based on the test results.</p>,
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
                <h2>{tab.label}</h2>
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
