import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { fetchLeadboard } from "../../api/leadboard";

interface LeaderboardProps {
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type StudentEntry = [string, string];

const Leaderboard: React.FC<LeaderboardProps> = ({ isModelOpen, setIsModelOpen }) => {
  const [students, updateStudents] = useState<StudentEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const studentData: StudentEntry[] = await fetchLeadboard();
        updateStudents(studentData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  if (!isModelOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
    >
      <div className="relative bg-white w-screen h-screen flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="md:text-2xl sm:text-sm font-semibold text-gray-800">
            Leaderboard Week 1 | Winter Consulting
          </h2>
          <button
            onClick={() => setIsModelOpen((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 md:text-3xl font-bold"
          >
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow overflow-y-auto">
          <p className="mb-6 text-gray-700 md:text-lg sm:text-xs">
            Leaderboard for Quiz and Assignment 1
          </p>
          <ul className="space-y-4">
            {students.map((student, ind) => (
              <li
                key={ind}
                className={`flex justify-between items-center p-4 border-b rounded-lg ${
                  ind === 0
                    ? "bg-yellow-200"
                    : ind === 1
                    ? "bg-blue-100"
                    : ind === 2
                    ? "bg-green-100" 
                    : "bg-white"
                }`}
              >
                <span className="text-xl font-semibold text-gray-800">{student[0]}</span>
                <span className="text-lg text-gray-600">{student[1]}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsModelOpen(false)}
            className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Click to Exit Leaderboard View
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Leaderboard;
