import React, { useState } from "react";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

interface WeeklyProps {
  editState: boolean;
  updateEditState: (newState: boolean) => void;
  endpoint: string;
}

interface Topic {
  name: string;
  link: string;
}

interface Task {
  name: string;
  topics: Topic[];
}

interface Resource {
  name: string;
  topics: Topic[];
}

interface Day {
  day: string;
  description: string;
  tasks: Task[];
  resources: Resource[];
  dueDate: string;
}

const WeeklyForm: React.FC<WeeklyProps> = ({
  updateEditState,
  editState,
  endpoint,
}) => {
  const [submit, updateSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weekData, setWeekData] = useState<Day[]>([
    {
      day: "Week 1",
      description: "",
      tasks: [{ name: "", topics: [{ name: "", link: "" }] }],
      resources: [{ name: "", topics: [{ name: "", link: "" }] }],
      dueDate: "",
    },
  ]);

  // Add Topic to Task
  const handleAddTopic = (dayIndex: number, taskIndex: number) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].tasks[taskIndex].topics.push({
      name: "",
      link: "",
    });
    setWeekData(updatedWeekData);
  };

  // Delete Topic from Task
  const handleDeleteTopic = (
    dayIndex: number,
    taskIndex: number,
    topicIndex: number
  ) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].tasks[taskIndex].topics.splice(topicIndex, 1);
    setWeekData(updatedWeekData);
  };

  // Handle Input Change for Tasks
  const handleInputChange = (
    dayIndex: number,
    field: "description" | "taskName" | "topic" | "dueDate",
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
    } else if (field === "dueDate") {
      updatedWeekData[dayIndex][field] = value;
    }
    setWeekData(updatedWeekData);
  };

  // Add Resource
  const handleAddResource = (dayIndex: number, resourceIdx: number) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].resources[resourceIdx].topics.push({
      name: "",
      link: "",
    });
    setWeekData(updatedWeekData);
  };

  // Delete Topic from Resource
  const handleDeleteResourceTopic = (
    dayIndex: number,
    resourceIndex: number,
    topicIndex: number
  ) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex].resources[resourceIndex].topics.splice(
      topicIndex,
      1
    );
    setWeekData(updatedWeekData);
  };

  // Handle Input Change for Resources
  const handleResourceInputChange = (
    dayIndex: number,
    resourceField: "resourceName" | "resourceTopic",
    value: string,
    resourceIndex?: number,
    topicIndex?: number,
    topicField?: "name" | "link"
  ) => {
    const updatedWeekData = [...weekData];

    if (resourceField === "resourceName" && resourceIndex !== undefined) {
      updatedWeekData[dayIndex].resources[resourceIndex].name = value;
    } else if (
      resourceField === "resourceTopic" &&
      resourceIndex !== undefined &&
      topicIndex !== undefined &&
      topicField
    ) {
      updatedWeekData[dayIndex].resources[resourceIndex].topics[topicIndex][
        topicField
      ] = value;
    }

    setWeekData(updatedWeekData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekData }),
      });
      const result = await response.json();
      if (result.status === 200) alert("SUCCESSFUL SUBMISSION");
      updateSubmit(true);
    } catch (error) {
      alert("Error Submitting");
    } finally {
      setLoading(false);
    }
  };

  if (!editState || submit) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full h-full max-w-4xl p-6 relative overflow-y-auto rounded shadow-lg">
        <button
          onClick={() => updateEditState(!editState)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4">Weekly Form</h1>
        {loading && (
          <div className="flex justify-center mb-4">
            <Spinner />
          </div>
        )}
        {weekData.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-6 p-4 bg-gray-100 rounded shadow">
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

            {/* Tasks Section */}
            {day.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="mb-4">
                <label className="block mb-2 font-medium">Task</label>
                {task.topics.map((topic, topicIdx) => (
                  <div key={topicIdx} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={topic.name}
                      onChange={(e) =>
                        handleInputChange(
                          dayIndex,
                          "topic",
                          e.target.value,
                          taskIndex,
                          topicIdx,
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
                          topicIdx,
                          "link"
                        )
                      }
                      className="w-full p-2 border rounded mb-2 mr-2"
                      placeholder="Enter topic link"
                    />
                    <button
                      onClick={() =>
                        handleDeleteTopic(dayIndex, taskIndex, topicIdx)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
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

            {/* Resources Section */}
            {day.resources.map((resource, resourceIdx) => (
              <div key={resourceIdx} className="mb-4">
                <label className="block mb-2 font-medium">Resource</label>
                {resource.topics.map((topic, topicIdx) => (
                  <div key={topicIdx} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={topic.name}
                      onChange={(e) =>
                        handleResourceInputChange(
                          dayIndex,
                          "resourceTopic",
                          e.target.value,
                          resourceIdx,
                          topicIdx,
                          "name"
                        )
                      }
                      className="w-full p-2 border rounded mb-2 mr-2"
                      placeholder="Enter resource topic name"
                    />
                    <input
                      type="text"
                      value={topic.link}
                      onChange={(e) =>
                        handleResourceInputChange(
                          dayIndex,
                          "resourceTopic",
                          e.target.value,
                          resourceIdx,
                          topicIdx,
                          "link"
                        )
                      }
                      className="w-full p-2 border rounded mb-2 mr-2"
                      placeholder="Enter resource topic link"
                    />
                    <button
                      onClick={() =>
                        handleDeleteResourceTopic(
                          dayIndex,
                          resourceIdx,
                          topicIdx
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <Button
                  onClick={() => handleAddResource(dayIndex, resourceIdx)}
                  className="px-4 py-2 bg-transparent text-blue-500 shadow-none border border-blue-500 hover:bg-gray-200"
                >
                  Add Resource
                </Button>
              </div>
            ))}
            {/* Button to Add New Resource */}
            <div className="mt-4">
              <label className="block mb-2 font-medium">Due Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded mb-4"
                // Set to current date and time in ISO format
                value={day.dueDate}
                onChange={(e) =>
                  handleInputChange(dayIndex, "dueDate", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <Button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-4"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default WeeklyForm;
