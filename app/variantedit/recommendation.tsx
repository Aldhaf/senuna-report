"use client";

import RecommendationRow from "@/components/RecommendationRow";

type RecommendationsProps = {
  recommendations: string[];
  setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
  counselorNotes: string[];
  setCounselorNotes: React.Dispatch<React.SetStateAction<string[]>>;
  conclusion: string;
  setConclusion: React.Dispatch<React.SetStateAction<string>>;
};

function Recommendation({
  recommendations,
  setRecommendations,
  counselorNotes,
  setCounselorNotes,
  conclusion,
  setConclusion,
}: RecommendationsProps) {
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

  return (
    <div>
      <h1 className="text-lg font-medium text-gray-900">Recommendation</h1>
      <p className="text-sm text-gray-500">
        This info will be displayed on the report
      </p>
      <button className="text-blue-500 mt-1" onClick={handleAddRecommendation}>
        Add Recommendation
      </button>

      <ul className="list-disc ml-6 mt-4 text-gray-700">
        {recommendations.map((rec, index) => (
          <RecommendationRow
            key={index}
            content={rec}
            onEdit={(newContent) => handleEditRecommendation(index, newContent)}
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
        <button className="text-blue-500 mt-1" onClick={handleAddCounselorNote}>
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
        <RecommendationRow content={conclusion} onEdit={handleEditConclusion} />
      </div>
    </div>
  );
}

export default Recommendation;
