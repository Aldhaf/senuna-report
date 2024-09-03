"use client";

import RecommendationRow from "@/components/RecommendationRow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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
    // const newRec = prompt("Enter new recommendation");
    // if (newRec) {
    //   setRecommendations([...recommendations, newRec]);
    // }
    setOpenModal(true);
  };

  const handleEditRecommendation = (index: number, newContent: string) => {
    const updatedRecs = [...recommendations];
    updatedRecs[index] = newContent;
    setRecommendations(updatedRecs);
  };

  const handleAddCounselorNote = () => {
    const newNote = prompt("Enter new counselor is note");
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

  const [openModal, setOpenModal] = useState(false);
  const [newRec, setNewRec] = useState("");

  const saveNewRecommendation = () => {
    setRecommendations([...recommendations, newRec]);

    // Sintax untuk ke database

    setOpenModal(false);
    setNewRec("");
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
          Genetics Counselor is Note
        </h2>
        <p className="text-sm text-gray-500">
          This info will be displayed on report
        </p>
        <button className="text-blue-500 mt-1" onClick={handleAddCounselorNote}>
          Add Counselor is Note
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

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-65 ">
          <Card>
            <CardHeader>
              <CardTitle>Add Recommendation</CardTitle>
              <CardDescription>Recommendation for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Label>Recommendation</Label>
                <Textarea
                  value={newRec}
                  onChange={(e) => setNewRec(e.target.value)}
                ></Textarea>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-between">
              <Button onClick={saveNewRecommendation}> Save</Button>
              <Button variant={"ghost"} onClick={() => setOpenModal(false)}>
                {" "}
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Recommendation;
