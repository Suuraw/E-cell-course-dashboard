import React, { useState } from "react";
import { deleteAssessmentData } from "../../api/dataApi";
import "primeicons/primeicons.css";

interface CapstoneItemProps {
  link: string;
  deadline: string;
  instruction: string;
  id: string;
  isAdmin: boolean;
  onDelete: (id: string) => void; 
}

export const AssessmentItem: React.FC<CapstoneItemProps> = ({
  link,
  deadline,
  instruction,
  id,
  isAdmin,
  onDelete,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = async () => {
    console.log("Delete Button is clicked");
    setIsRemoving(true); 
    try {
      await deleteAssessmentData(id);
      console.log("Deleted");
      onDelete(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg my-4 p-4 ${
        isRemoving ? "opacity-0 transition-opacity duration-500" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start my-4">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-3/4 space-y-2">
          <div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Test Link
            </a>
          </div>
          <div className="text-sm">
            <span className="font-bold">Deadline: </span>
            <span className="ml-4 font-semibold">{deadline}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">Instruction: </span>
            <span className="block text-justify mt-2 font-semibold">{instruction}</span>
          </div>
        </div>

        {/* Delete Button for Admin */}
        {isAdmin && (
          <div className="ml-auto mt-2 md:mt-0">
            <button onClick={handleDelete} className="p-2">
              <i
                className="pi  pi-trash"
                style={{ fontSize: "1rem" }}
              ></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
