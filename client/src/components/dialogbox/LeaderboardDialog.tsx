import React from "react";
interface LeaderboardProps{
  isModelOpen:boolean
  setIsModelOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const Leaderboard:React.FC<LeaderboardProps> = ({isModelOpen,setIsModelOpen}) => {
 
  return (
    <>
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="relative bg-white w-screen h-screen flex flex-col rounded-none"
          >
            {/* Header */}  
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="md:text-2xl sm:text-sm  font-semibold">
                Leaderboard week 1 | Winter Consulting
              </h2>
              <button
                onClick={()=>setIsModelOpen((prev)=>!prev)}
                className="text-gray-500 hover:text-gray-700 md:text-3xl font-bold"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow" onClick={()=>setIsModelOpen((prev)=>!prev)}>
              <p className="mb-6 text-gray-700 md:text-lg sm:text-xs">
                Leaderboard for Quiz and Assignment 1
              </p>
              <button
                
                className="px-4 md:py-2 bg-black text-white rounded hover:bg-gray-700 "
              >
                Click to Exit Leaderboard View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
