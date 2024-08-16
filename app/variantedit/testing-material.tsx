import EditableRow from "@/components/table/EditableRow";

function TestingMaterial(){
return  <div>
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
}

export default TestingMaterial;