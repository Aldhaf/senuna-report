import React from 'react';

export default function ReportView() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">PDF Report View</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Executive Summary</h2>
        <p className="text-sm text-gray-600 mb-8">
          This genetic testing report summarizes the findings from the sample provided. The analysis was focused on identifying variants associated with hereditary cardiomyopathy. The results include information on detected genetic variants, their classification, and potential clinical implications.
        </p>
        
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h2>
        <table className="min-w-full bg-white text-sm">
          <tbody>
            <tr className="border-b">
              <th className="px-6 py-4 text-left font-medium text-gray-900">Name</th>
              <td className="px-6 py-4">John Doe</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left font-medium text-gray-900">Date of Birth</th>
              <td className="px-6 py-4">12/01/1987</td>
            </tr>
            <tr className="border-b">
              <th className="px-6 py-4 text-left font-medium text-gray-900">Sex</th>
              <td className="px-6 py-4">Male</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left font-medium text-gray-900">Sample</th>
              <td className="px-6 py-4">Blood</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Result & Interpretations</h2>
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left font-medium text-gray-900">Gene</th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">Variant Detail</th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">Zygosity</th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">Classification</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4">MYH7</td>
              <td className="px-6 py-4">c.1503T{">"}C (p.Tyr501=)</td>
              <td className="px-6 py-4">Heterozygous</td>
              <td className="px-6 py-4">Likely Benign</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-6 py-4">TNNT2</td>
              <td className="px-6 py-4">c.518C{">"}T (p.Arg173Cys)</td>
              <td className="px-6 py-4">Heterozygous</td>
              <td className="px-6 py-4">Pathogenic</td>
            </tr>
            {/* Tambahkan lebih banyak baris sesuai kebutuhan */}
          </tbody>
        </table>

        <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Approved By</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Rina Maheswari, M.Sc. Ph.D. - Head Laboratory</li>
          <li>Lia Kartika, M.D. - Genetics Counselor</li>
          <li>Putu Bagus, M.G.C - Clinical Pathology</li>
        </ul>
      </div>
    </div>
    );
}