import React, { useState } from "react";

// Define types for the data structure
interface WeeklyProps{
  editState:boolean;
  updateEditState: (newState: boolean) => void;
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

const WeeklyForm: React.FC<WeeklyProps> = ({updateEditState,editState}) => {
  const [submit,updateSubmit]=useState(false);
  // Initialize state with the correct types
  const [weekData, setWeekData] = useState<Day[]>([
    {
      day: "Day 1",
      description: "",
      tasks: [
        { name: "", topics: [{ name: "", link: "" }] },
        { name: "", topics: [{ name: "", link: "" }] },
        { name: "", topics: [{ name: "", link: "" }] },
      ],
    },
  ]);


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

  const handleAddTopic = (dayIndex: number, taskIndex: number) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].tasks[taskIndex].topics.push({
      name: "",
      link: "",
    });
    setWeekData(updatedWeekData);
  };

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
    } else if (field === "topic" && taskIndex !== undefined && topicIndex !== undefined && topicField) {
      updatedWeekData[dayIndex].tasks[taskIndex].topics[topicIndex][topicField] = value;
    }
    setWeekData(updatedWeekData);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/addWeekData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekData }),
      });
      const result = await response.json();
      if (result) alert(JSON.stringify(result.data));
      updateSubmit(true)
    } catch (error) {
      alert("Error Submitting");
    }
  };
  if(!editState||submit)
    return null
  return (
    <>
    
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full max-w-4xl p-6 relative overflow-y-auto rounded shadow-lg">
            {/* Cross Button */}
            <button
              onClick={() =>updateEditState(!editState) }
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

            <div>
              <h1 className="text-2xl font-bold mb-4">Weekly Form</h1>

              {weekData.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-6 p-4 bg-gray-100 rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">{day.day}</h2>

                  <label className="block mb-2 font-medium">What's in there (Description)</label>
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
                      <label className="block mb-2 font-medium">Task {taskIndex + 1}</label>

                      {task.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="mb-2">
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
                            className="w-full p-2 border rounded mb-2"
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
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Enter topic link"
                          />
                        </div>
                      ))}

                      <button
                        onClick={() => handleAddTopic(dayIndex, taskIndex)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Add Topic
                      </button>
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={handleAddDay}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Add Day
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 ml-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

    </>
  );
};

export default WeeklyForm;
