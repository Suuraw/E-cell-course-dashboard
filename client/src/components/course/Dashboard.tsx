import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Placeholder } from "./Placeholder";
import CourseNav from "./CourseNav";
import { sections } from "../data/courseData";
import {
  getWeek1Data,
  getWeek2Data,
  getWeek3Data,
  getWeek4Data,
  getWeek5Data,
  getCapstoneData,
  getAssessmentData,
} from "../../api/CourseData.ts";
import CourseNav1 from "./CourseNav1.tsx";

interface DashboardProps {
  openSection: number | null;
  toggleSection: (index: number) => void;
  login: boolean;
  editState: boolean;
  updateEditState: (newState: boolean) => void;
}

interface Task {
  name: string;
  topics: { name: string; link: string }[];
}

interface DayData {
  day: string;
  description: string;
  tasks: Task[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  openSection,
  toggleSection,
  login,
  editState,
  updateEditState,
}) => {
  const [week1, setWeek1Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week2, setWeek2Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week3, setWeek3Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week4, setWeek4Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week5, setWeek5Data] = useState<{ weekData: DayData[] } | null>(null);
  const [capstone_project, setCapstoneData] = useState<{
    weekData: DayData[];
  } | null>(null);
  const [assessment, setAssessmentData] = useState<{
    weekData: DayData[];
  } | null>(null);

  const [selectedWeek, setSelectedWeek] = useState<string>("1"); // Default to week 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const week1Data = await getWeek1Data();
        const week2Data = await getWeek2Data();
        const week3Data = await getWeek3Data();
        const week4Data = await getWeek4Data();
        const week5Data = await getWeek5Data();
        const capstoneData = await getCapstoneData();
        const assessmentData = await getAssessmentData();
        if (week1Data === null) {
          // alert("Database is empty");
        } else {
          setWeek1Data(week1Data.data.weekData);
        }
        if (week2Data === null) {
          // alert("Database is empty");
        } else {
          setWeek2Data(week2Data.data.weekData);
        }
        if (week3Data === null) {
          // alert("Database is empty");
        } else {
          setWeek3Data(week3Data.data.weekData);
        }
        if (week4Data === null) {
          // alert("Database is empty");
        } else {
          setWeek4Data(week4Data.data.weekData);
        }
        if (week5Data === null) {
          // alert("Database is empty");
        } else {
          setWeek5Data(week5Data.data.weekData);
        }
        if (capstoneData === null) {
          // alert("Database is Empty")
        } else {
          setCapstoneData(capstoneData.data.weekData);
        }
        if (assessmentData === null) {
          // alert("Database is empty");
        } else {
          setAssessmentData(assessmentData.data.weekData);
        }
      } catch (error) {
        console.log(error);
        alert("ERROR: Unable to fetch data.");
      }
    };
    fetchData();
  }, [selectedWeek]);

  // Function to handle section toggle and update query parameter
  const handleToggleSection = (index: number) => {
    toggleSection(index); // Toggle the section's visibility

    const newWeek = (index + 1).toString(); // Map section index to week number
    setSelectedWeek(newWeek); // Update the query parameter
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border rounded-lg overflow-hidden">
        {/* Section 1 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 0
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(0)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[0].title}
            </span>
            {openSection === 0 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {week1 !== null ? (
                      week1.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[0].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section 2 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 1
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(1)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[1].title}
            </span>
            {openSection === 1 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {week2 !== null ? (
                      week2.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[1].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section 3 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 2
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(2)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[2].title}
            </span>
            {openSection === 2 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {week3 !== null ? (
                      week3.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[2].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section 4 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 3
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(3)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[3].title}
            </span>
            {openSection === 3 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {week4 !== null ? (
                      week4.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[3].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Section 5 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 4
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(4)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[4].title}
            </span>
            {openSection === 4 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 4 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {week5 !== null ? (
                      week5.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[4].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Section 6 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 5
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(5)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[5].title}
            </span>
            {openSection === 5 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 5 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav1
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {capstone_project !== null ? (
                      capstone_project.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[5].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Section 7 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 6
                ? "text-blue-600 bg-blue-50"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(6)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections[6].title}
            </span>
            {openSection === 6 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 6 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                     <CourseNav1
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {assessment !== null ? (
                      assessment.weekData.map((day, idx) => (
                        <Placeholder
                          key={idx}
                          day={day.day}
                          description={day.description}
                          tasks={day.tasks}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Content for {sections[6].title} is not available yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
