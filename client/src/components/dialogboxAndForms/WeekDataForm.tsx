import React, { useState } from "react";
import { Button } from "../ui/button";

// Define types for the data structure
const BACKEND_URL=import.meta.env.VITE_SERVER_URL||"http://localhost:3000";
interface WeeklyProps {
  editState: boolean;
  updateEditState: (newState: boolean) => void;
  endpoint:string;

}

interface Topic {
  name: string;
  link: string;
}

interface Task {
  name: string;
  topics: Topic[];
}

interface Day {
  day: string;
  description: string;
  tasks: Task[];  
}

const WeeklyForm: React.FC<WeeklyProps> = ({ updateEditState, editState,endpoint }) => {
  const [submit, updateSubmit] = useState(false);

  // Initialize state with the correct types
  const [weekData, setWeekData] = useState<Day[]>([
    {
      day: "Week 1",
      description: "",
      tasks: [
        { name: "", topics: [{ name: "", link: "" }] },
        //Commented out to show only 1 task in the form
        // { name: "", topics: [{ name: "", link: "" }] },
        // { name: "", topics: [{ name: "", link: "" }] },
      ],
    },
  ]);

  // Add Day
  const handleAddDay = () => {
    setWeekData([
      ...weekData,
      {
        day: `Day ${weekData.length + 1}`,
        description: "",
        tasks: [
          { name: "", topics: [{ name: "", link: "" }] },
          { name: "", topics: [{ name: "", link: "" }] },
          { name: "", topics: [{ name: "", link: "" }] },
        ],
      },
    ]);
  };

  // Add Topic
  const handleAddTopic = (dayIndex: number, taskIndex: number) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].tasks[taskIndex].topics.push({
      name: "",
      link: "",
    });
    setWeekData(updatedWeekData);
  };

  // Delete Topic
  const handleDeleteTopic = (
    dayIndex: number,
    taskIndex: number,
    topicIndex: number
  ) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].tasks[taskIndex].topics.splice(topicIndex, 1);
    setWeekData(updatedWeekData);
  };

  // Handle Input Change
  const handleInputChange = (
    dayIndex: number,
    field: "description" | "taskName" | "topic",
    value: string,
    taskIndex?: number,
    topicIndex?: number,
    topicField?: "name" | "link"
  ) => {
    const updatedWeekData = [...weekData];
    if (field === "description") {
      updatedWeekData[dayIndex][field] = value;
    } else if (field === "taskName" && taskIndex !== undefined) {
      updatedWeekData[dayIndex].tasks[taskIndex].name = value;
    } else if (
      field === "topic" &&
      taskIndex !== undefined &&
      topicIndex !== undefined &&
      topicField
    ) {
      updatedWeekData[dayIndex].tasks[taskIndex].topics[topicIndex][
        topicField
      ] = value;
    }
    setWeekData(updatedWeekData);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekData }),
      });
      console.log(response);
      const result = await response.json();
      if (result.status===200)
      alert("SUCCESSFULL SUBMISSION");
      // window.location.reload();
      updateSubmit(true);
    } catch (error) {
      console.log(error)
      alert("Error Submitting");
    }
  };

  if (!editState || submit) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white w-full h-full max-w-4xl p-6 relative overflow-y-auto rounded shadow-lg">
          {/* Cross Button */}
          
          <button
            onClick={() => updateEditState(!editState)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>

          <div>
            <h1 className="text-2xl font-bold mb-4">Weekly Form</h1>

            {weekData.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="mb-6 p-4 bg-gray-100 rounded shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{day.day}</h2>

                <label className="block mb-2 font-medium">
                  What's in there (Description)
                </label>
                <textarea
                  value={day.description}
                  onChange={(e) =>
                    handleInputChange(dayIndex, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter description"
                ></textarea>

                {day.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="mb-4">
                    <label className="block mb-2 font-medium">
                      Task
                    </label>

                    {task.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={topic.name}
                          onChange={(e) =>
                            handleInputChange(
                              dayIndex,
                              "topic",
                              e.target.value,
                              taskIndex,
                              topicIndex,
                              "name"
                            )
                          }
                          className="w-full p-2 border rounded mb-2 mr-2"
                          placeholder="Enter topic name"
                        />
                        <input
                          type="text"
                          value={topic.link}
                          onChange={(e) =>
                            handleInputChange(
                              dayIndex,
                              "topic",
                              e.target.value,
                              taskIndex,
                              topicIndex,
                              "link"
                            )
                          }
                          className="w-full p-2 border rounded mb-2 mr-2"
                          placeholder="Enter topic link"
                        />
                        {/* Delete Button */}
                        <button
                          onClick={() =>
                            handleDeleteTopic(dayIndex, taskIndex, topicIndex)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        </button>
                      </div>
                    ))}

                    <Button
                      onClick={() => handleAddTopic(dayIndex, taskIndex)}
                      className="px-4 py-2 bg-transparent text-blue-500 shadow-none border border-blue-500 hover:bg-gray-200"
                    >
                      Add Topic
                    </Button>
                  </div>
                ))}
              </div>
            ))}
            {/*Commented Out to not include add day button in the form
            <Button
              onClick={handleAddDay}
              className="px-4 py-2 bg-blue-200 text-blue-700 rounded hover:bg-blue-500 hover:text-black"
            >
              Add Day
            </Button> */}

            <Button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-4"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyForm;
