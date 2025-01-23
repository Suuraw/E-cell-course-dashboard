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
} from "../../api/dataApi.ts";
import CourseNav1 from "./CourseNav1.tsx";
import { CapstoneItem } from "./CapstoneData.tsx";
import { AssessmentItem } from "./AssessmentData.tsx";

interface DashboardProps {
  openSection: number | null;
  toggleSection: (index: number) => void;
  login: boolean;
  editState: boolean;
  updateEditState: (newState: boolean) => void;
  loginUser: boolean;
  // isAdmin:boolean;
}

interface Task {
  name: string;
  topics: { name: string; link: string }[];
}
interface Resource {
  name: string;
  topics: { name: string; link: string }[];
}

interface DayData {
  day: string;
  description: string;
  tasks: Task[];
  resources:Resource[];
  dueDate:string;
}
type CapstoneProject = {
  _id: string;
  formData: {
    link: string;
    deadline: string;
    instruction: string;
  };
};

const Dashboard: React.FC<DashboardProps> = ({
  openSection,
  toggleSection,
  login,
  editState,
  updateEditState,
  loginUser,
}) => {
  const [week1, setWeek1Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week2, setWeek2Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week3, setWeek3Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week4, setWeek4Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week5, setWeek5Data] = useState<{ weekData: DayData[] } | null>(null);

  const [capstone_project, setCapstoneData] = useState<CapstoneProject[]>([]);

  const [assessment, setAssessmentData] = useState<CapstoneProject[]>([]);

  const [selectedWeek, setSelectedWeek] = useState<string>("1"); // Default to week 1

  const handleDeleteCap = (id: string) => {
    setCapstoneData(capstone_project.filter((item) => item._id !== id)); // Update state to remove the deleted item
  };

  const handleDeleteAss = (id: string) => {
    setAssessmentData(assessment.filter((item) => item._id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const week1Data = await getWeek1Data();
        console.log(week1?.weekData)
        const week2Data = await getWeek2Data();
        const week3Data = await getWeek3Data();
        const week4Data = await getWeek4Data();
        const week5Data = await getWeek5Data();
        const capstoneData = await getCapstoneData();
        const assessmentData = await getAssessmentData();
       
        if (week1Data === null) {
          alert("Database is empty");
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
          alert("Collection is empty");
        } else {
          setCapstoneData(capstoneData.data);
        }
        if (assessmentData === null) {
          // alert("Database is empty");
        } else {
          setAssessmentData(assessmentData.data);
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
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
                <div className="border-t border-gray-100 bg-white py-2 px-4">
                  <div className="overflow-x-auto sm:overflow-x-hidden">
                    <CourseNav
                      login={login}
                      editState={editState}
                      updateEditState={updateEditState}
                      index={openSection}
                    />
                    {week1 !== null &&
                    week1 !== undefined &&
                    week1.weekData &&
                    week1.weekData[0] &&
                    week1.weekData[0].description !== "" ? (
                      // week1.weekData.map((day, idx) => (
                      //   <Placeholder
                      //     key={idx}
                      //     day={day.day}
                      //     description={day.description}
                      //     tasks={day.tasks}
                      //   />
                      // ))
                      <Placeholder
                        key={0}
                        day={week1.weekData[0].day}
                        description= {week1.weekData[0].description}
                        tasks={week1.weekData[0].tasks}
                        resources={week1.weekData[0].resources}
                        dueDate={week1.weekData[0].dueDate}
                      />
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
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
                    {week2 !== null &&
                    week2 !== undefined &&
                    week2.weekData &&
                    week2.weekData[0] &&
                    week2.weekData[0].description !== "" ? (
                    
                        <Placeholder
                        key={1}
                        day={week2.weekData[0].day}
                        description= {week2.weekData[0].description}
                        tasks={week2.weekData[0].tasks}
                        resources={week2.weekData[0].resources}
                        dueDate={week2.weekData[0].dueDate}
                      />
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
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
                    {week3 !== null &&
                    week3 !== undefined &&
                    week3.weekData &&
                    week3.weekData[0] &&
                    week3.weekData[0].description !== "" ? (
                      week3.weekData.map(() => (
                        <Placeholder
                        key={2}
                        day={week3.weekData[0].day}
                        description= {week3.weekData[0].description}
                        tasks={week3.weekData[0].tasks}
                        resources={week3.weekData[0].resources}
                        dueDate={week3.weekData[0].dueDate}
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
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

                    {week4 !== null &&
                    week4 !== undefined &&
                    week4.weekData &&
                    week4.weekData[0] &&
                    week4.weekData[0].description !== "" ? (
                        <Placeholder
                        key={3}
                        day={week4.weekData[0].day}
                        description= {week4.weekData[0].description}
                        tasks={week4.weekData[0].tasks}
                        resources={week4.weekData[0].resources}
                        dueDate={week4.weekData[0].dueDate}
                        />
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
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
                    {week5 !== null &&
                    week5 !== undefined &&
                    week5.weekData &&
                    week5.weekData[0] &&
                    week5.weekData[0].description !== "" ? (
                     
                      <Placeholder
                      key={4}
                      day={week5.weekData[0].day}
                      description= {week5.weekData[0].description}
                      tasks={week5.weekData[0].tasks}
                      resources={week5.weekData[0].resources}
                      dueDate={week5.weekData[0].dueDate}
                    />
               
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
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
                      index={6}
                    />

                    {loginUser === true || login === true ? (
                      capstone_project.length !== 0 ? (
                        capstone_project.map((item, index) => (
                          <CapstoneItem
                            key={index}
                            link={
                              item.formData === null ? "" : item.formData.link
                            }
                            deadline={
                              item.formData === null
                                ? ""
                                : item.formData.deadline
                            }
                            instruction={
                              item.formData === null
                                ? ""
                                : item.formData.instruction
                            }
                            id={item._id}
                            isAdmin={login}
                            onDelete={handleDeleteCap}
                          />
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Content for {sections[5].title} is not available yet.
                        </div>
                      )
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Login to view Content .
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
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"  
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
                      index={7}
                    />

                    {/* Data hard coded inside AssessmentItem
                        Remove during prod and add relevant props
                    */}

                    
                    {loginUser === true || login === true ? (
                      assessment.length !== 0 ? (
                        assessment.map((item, index) => (
                          <AssessmentItem
                            key={index}
                            link={
                              item.formData === null ? "" : item.formData.link
                            }
                            deadline={
                              item.formData === null
                                ? "" 
                                : item.formData.deadline
                            }
                            instruction={
                              item.formData === null
                                ? ""
                                : item.formData.instruction
                            }
                            id={item._id}
                            isAdmin={login}
                            onDelete={handleDeleteAss}
                          />
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Content for {sections[6].title} is not available yet.
                        </div>
                      )
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Login to view Content .
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

export default Dashboard;
