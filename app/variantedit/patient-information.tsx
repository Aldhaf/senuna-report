"use client"

import EditableRow from "@/components/table/EditableRow";
import { useState } from "react";

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

function PatientInformation(){
    const [patientInfo, setPatientInfo] =
    useState<PatientInfo>(initialPatientInfo);

    const handleInfoChange = (key: keyof PatientInfo, value: string) => {
        setPatientInfo((prev) => ({ ...prev, [key]: value }));
      };

    return  <div>
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
}

export default PatientInformation;