import { useState } from "react";

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
      {!isEditing && content && (
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

export default RecommendationRow;
