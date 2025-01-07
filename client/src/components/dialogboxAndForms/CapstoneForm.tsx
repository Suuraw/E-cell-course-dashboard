import { useState } from "react";
import { AnimatedAlert } from "../animation/AnimatedAlert";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

interface CapstoneProps {
  editState: boolean;
  updateEditState: (newState: boolean) => void;
  endpoint: string;
}

interface FormData {
  link: string;
  deadline: string;
  instruction: string;
}

export default function CapstoneForm({
  endpoint,
  editState,
  updateEditState,
}: CapstoneProps) {
  const [submit, updateSubmit] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    link: "",
    deadline: "",
    instruction: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const result = await response.json();

      if (result) {
        updateSubmit(true); 
        setTimeout(() => {
          window.location.reload(); 
        }, 2000); 
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    }

    setFormData({ link: "", deadline: "", instruction: "" });
  };

  if (!editState) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Content</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Link
              </label>
              <input
                type="text"
                id="link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="instruction"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Instruction
              </label>
              <textarea
                id="instruction"
                value={formData.instruction}
                onChange={(e) =>
                  setFormData({ ...formData, instruction: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => updateEditState(!editState)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      {submit && (
        <AnimatedAlert message="Submission Successful" type="success" />
      )}
    </div>
  );
}
