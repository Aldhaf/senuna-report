"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import ReportView from "../reportview/page";

type PreviewReportProps = {
  executiveSummary: string;
  approvedBy: string[];
  setApprovedBy: React.Dispatch<React.SetStateAction<string[]>>;
};

const PreviewReport = ({
  executiveSummary,
  approvedBy,
  setApprovedBy,
}: PreviewReportProps) => {
  const router = useRouter();
  const handleViewRButton = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/reportview");
  };
  const handleAddApproval = () => {
    const newApproval = prompt("Enter new approver");
    if (newApproval) {
      setApprovedBy([...approvedBy, newApproval]);
    }
  };

  const contentRef = useRef(null);
  const [IsHidden, setIsHidden] = useState(false);

  const convertToPdf = async () => {
    const content = contentRef.current;

    try {
      setIsHidden(true);

      const options = {
        filename: "my-document.pdf",
        margin: 1,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      // Menggunakan html2pdf untuk mengonversi konten menjadi PDF
      await html2pdf().set(options).from(content).save();
    } catch (error) {
      console.error(error.message);
    } finally {
      // Sembunyikan elemen setelah pembuatan PDF selesai
      setIsHidden(false);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-medium text-gray-900">See Complete Report</h1>
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
        <div className={`${IsHidden ? "block" : "hidden"}`} ref={contentRef}>
          <ReportView />
        </div>
        <button onClick={convertToPdf} className="text-blue-500">
          + Submit & Complete Report
        </button>
      </div>
    </div>
  );
};

export default PreviewReport;
