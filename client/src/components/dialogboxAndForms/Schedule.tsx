import React from "react";
import ReactDOM from "react-dom";

interface ScheduleItem {
  date: string;
  description: string;
}

interface ScheduleProps {
  scheduleBtn: boolean;
  updateScheduleBtn: React.Dispatch<React.SetStateAction<boolean>>;
}
const scheduleData: ScheduleItem[] = [
  { date: "25.1.2025", description: "Cohort Release" }
];

const ScheduleDialog: React.FC<ScheduleProps> = ({
  scheduleBtn,
  updateScheduleBtn,
}) => {
  if (!scheduleBtn) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Schedule</h2>
          <button
            onClick={() => updateScheduleBtn((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto flex-grow p-4">
          <p className="text-base text-gray-700 mb-6">
            The given schedule does not include AMAs planned to be held
            weekly. Dates for AMA sessions will be updated after receiving
            sufficient feedback from the participants.
          </p>
          <div className="space-y-4">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-8 py-2 border-b last:border-b-0"
              >
                <span className="text-base font-bold min-w-[100px]">
                  {item.date}
                </span>
                <span className="text-base">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body // Render at the root level of the DOM
  );
};

export default ScheduleDialog;