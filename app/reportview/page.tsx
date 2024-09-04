"user client";

import Image from "next/image";
import React from "react";

export default function ReportView() {
  return (
    <div className="w-full h-ful p-8">
      <div className="bg-white p-6 rounded-lg mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Image
              src="/assets/logo.png"
              alt="Lab Logo"
              width={64}
              height={64}
              className="py-2 items-center"
            />
            <h2 className="font-bold text-gray-800">Lab. Company</h2>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Variant Analysis Report
            </h1>
            <p>
              Genusa Labs
              <br />
              123 Genome Way
              <br />
              Jakarta Pusat, Cempaka Putih, 62701
              <br />
              Jakarta, Indonesia
            </p>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Patient Information
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p>
                <strong>Patient Detail</strong>
              </p>
              <p>Name: John Doe</p>
              <p>Sex: Male</p>
              <p>Date of Birth: 12/01/1987</p>
              <p>Sample: Blood</p>
            </div>
            <div>
              <p>
                <strong>Test Ordered By</strong>
              </p>
              <p>Name: Dr. Fulan</p>
              <p>Organization: Amazing Hospital Centre</p>
              <p>Phone: +6712 - 232 - 233</p>
            </div>
            <div>
              <p>
                <strong>Test Carried out By</strong>
              </p>
              <p>Genetic Counselor: Dr. Fulan</p>
              <p>Laboratory: Lab. ID</p>
              <p>Phone: +6712 - 232 - 233</p>
              <p>Date of Test: 12-April-2024</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Executive Summary
          </h2>
          <p className="text-sm text-gray-600">
            This genetic testing report summarizes the findings from the sample
            provided. The analysis was focused on identifying variants
            associated with hereditary cardiomyopathy. The results include
            information on detected genetic variants, their classification, and
            potential clinical implications.
          </p>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Testing Material and Methods
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Testing Method: Next Generation Sequencing (NGS)</li>
            <li>Gene Panel: Comprehensive Cardiomyopathy Panel</li>
            <li>
              The genetic analysis was performed using high-throughput Next
              Generation Sequencing (NGS) on a blood sample. DNA was extracted
              using the QIAamp DNA Blood Mini Kit. Sequencing was carried out on
              an Illumina HiSeq 4000 platform, covering all coding regions and
              intron-exon boundaries of the genes listed.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Result & Interpretations
          </h2>
          <table className="min-w-full bg-white text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left font-medium text-gray-900">
                  Gene
                </th>
                <th className="px-6 py-4 text-left font-medium text-gray-900">
                  Variant Detail
                </th>
                <th className="px-6 py-4 text-left font-medium text-gray-900">
                  Zygosity
                </th>
                <th className="px-6 py-4 text-left font-medium text-gray-900">
                  AMGC Classification
                </th>
                <th className="px-6 py-4 text-left font-medium text-gray-900">
                  Global Allele Frequency
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">MYH7</td>
                <td className="px-6 py-4">c.1503T&gt;C (p.Tyr501=)</td>
                <td className="px-6 py-4">Heterozygous</td>
                <td className="px-6 py-4">Likely Benign</td>
                <td className="px-6 py-4">0,0005</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="px-6 py-4">TNNT2</td>
                <td className="px-6 py-4">c.518C&gt;T (p.Arg173Cys)</td>
                <td className="px-6 py-4">Heterozygous</td>
                <td className="px-6 py-4">Pathogenic</td>
                <td className="px-6 py-4">0,0001</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4">TNNI3</td>
                <td className="px-6 py-4">c.253G&gt;A (p.Arg85His)</td>
                <td className="px-6 py-4">Heterozygous</td>
                <td className="px-6 py-4">Variant of Unknown Significance</td>
                <td className="px-6 py-4">0,001</td>
              </tr>
            </tbody>
          </table>

          <ul className="list-disc pl-5 text-gray-600">
            <li>
              <strong>MYH7 c.1503T&gt;C (p.Tyr501=):</strong> This synonymous
              variant is classified as likely benign based on its prevalence in
              the general population and lack of association with disease in
              current literature.
            </li>
            <li>
              <strong>TNNT2 c.518C&gt;T (p.Arg173Cys):</strong> This missense
              variant is classified as pathogenic. It is known to affect protein
              function and has been previously reported in patients with
              hypertrophic cardiomyopathy.
            </li>
            <li>
              <strong>TNNI3 c.253G&gt;A (p.Arg85His):</strong> This variant is
              currently classified as a variant of unknown significance. Further
              studies are required to understand its impact on protein function
              and association with cardiac conditions.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Recommendation
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>
              Follow-up genetic counseling is recommended to discuss the
              implications of the detected pathogenic and uncertain variants.
            </li>
            <li>
              Family screening may be advised for the pathogenic variant
              identified in TNNT2.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Counselor is Notes
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>
              <strong>MYH7 Variant:</strong> Given the benign nature of the MYH7
              variant, no immediate clinical action is required. However, it is
              important to note that genetic factors are just one aspect of
              disease risk.
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
              re-evaluation of this variant is clinical significance as new data
              emerge.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Supporting Evidence from Academic Journal
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>
              BRCA1 c.5266dupC: Smith et al., Journal of Medical Genetics, 2023.
              {/* "Impact of recurrent BRCA1 mutations in breast cancer
              susceptibility." */}
            </li>
            <li>
              MLH1 c.3503_3504delTA: Lee et al., Clinical Cancer Research, 2022.
              {/* "Genetic landscape of Lynch syndrome: early detection and new
              treatments." */}
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Conclusions
          </h2>
          <p className="text-sm text-gray-600">
            This report reflects the findings based on the genetic testing
            performed with the current known scientific literature and available
            databases. Variants are classified according to the American College
            of Medical Genetics and Genomics (ACMG) guidelines. Changes in the
            classification of these variants may occur as new information
            becomes available.
          </p>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="text-center">
            <p className="font-semibold">Rina Maheswari, M.Sc., Ph.D.</p>
            <p>Head Laboratory</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Lia Kartika, M.D.</p>
            <p>Genetic Counsellor</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Putu Bagus, M.G.C</p>
            <p>Clinical Pathology</p>
          </div>
        </div>
      </div>
    </div>
  );
}
