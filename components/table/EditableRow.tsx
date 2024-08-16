"use client";

import { useState } from "react";

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

export default EditableRow;
