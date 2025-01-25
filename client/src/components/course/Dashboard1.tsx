import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Placeholder } from "./Placeholder";
import CourseNav from "./CourseNav";
import { sections,sections2 } from "../data/courseData";
import {
  getWeek1Data,
  getWeek2Data,
  getWeek3Data,
  getWeek4Data,
  getWeek5Data,
  getWeek6Data,
  getWeek7Data,
  getWeek8Data,
  getWeek9Data,
  getWeek10Data,
  getWeek11Data,

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
  resources: Resource[];
  dueDate: string;
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
  const [week6, setWeek6Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week7, setWeek7Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week8, setWeek8Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week9, setWeek9Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week10, setWeek10Data] = useState<{ weekData: DayData[] } | null>(null);
  const [week11, setWeek11Data] = useState<{ weekData: DayData[] } | null>(null);



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
        const week2Data = await getWeek2Data();
        const week3Data = await getWeek3Data();
        const week4Data = await getWeek4Data();
        const week5Data = await getWeek5Data();
        const week6Data = await getWeek6Data();
        const week7Data = await getWeek7Data();
        const week8Data = await getWeek8Data();
        const week9Data = await getWeek9Data();
        const week10Data = await getWeek10Data();
        const week11Data = await getWeek11Data();

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
        if (week6Data === null) {
            // alert("Database is empty");
          } else {
            setWeek6Data(week6Data.data.weekData);
          }
          if (week7Data === null) {
            // alert("Database is empty");
          } else {
            setWeek7Data(week7Data.data.weekData);
          }
          if (week8Data === null) {
            // alert("Database is empty");
          } else {
            setWeek8Data(week8Data.data.weekData);
          }
          if (week9Data === null) {
            // alert("Database is empty");
          } else {
            setWeek9Data(week9Data.data.weekData);
          }
          if (week10Data === null) {
            // alert("Database is empty");
          } else {
            setWeek10Data(week10Data.data.weekData);
          }
          if (week11Data === null) {
            // alert("Database is empty");
          } else {
            setWeek11Data(week11Data.data.weekData);
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
  const week=[
    week1,week2,week3,week4,week5,week6,week7,week8,week9,week10,week11
]
//   console.log(week);
console.log(week[2]?.weekData[0].day);
  // Function to handle section toggle and update query parameter
  const handleToggleSection = (index: number) => {
    console.log(index);
    toggleSection(index); // Toggle the section's visibility

    const newWeek = (index + 1).toString(); // Map section index to week number
    setSelectedWeek(newWeek); // Update the query parameter
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border rounded-lg overflow-hidden">
        {/* Week Sections */}
        {sections.map((section,ind) => (
          
          <div className="border-b last:border-b-0" key={ind}>
            <button
              className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
                openSection === ind
                  ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
                  : "text-black hover:bg-gray-100"
              }`}
              onClick={() => handleToggleSection(ind)}
            >
              <span className="flex items-center font-bold pl-2">
                {section.title}
              </span>
              {openSection === ind ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            <AnimatePresence>
              {openSection === ind && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-gray-100 bg-white py-2 px-4">
                    <div className="overflow-x-auto sm:overflow-x-hidden">
                      <CourseNav
                        key={ind}
                        login={login}
                        editState={editState}
                        updateEditState={updateEditState}
                        index={openSection}
                      />
                      
                      {week[ind] !== null &&
                      week[ind] !== undefined &&
                      week[ind].weekData &&
                      week[ind].weekData[0] &&
                      week[ind].weekData[0].description !== "" ? (
                        <Placeholder
                          key={ind+1}
                          day={week[ind].weekData[0].day}
                          description={week[ind].weekData[0].description}
                          tasks={week[ind].weekData[0].tasks}
                          resources={week[ind].weekData[0].resources}
                          dueDate={week[ind].weekData[0].dueDate}
                        />
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Content for {sections[ind].title} is not available
                          yet.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Section 6 */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 11
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(11)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections2[0].title}
            </span>
            {openSection === 11 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 11 && (
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
                      index={11}
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
                          Content for {sections2[0].title} is not available yet.
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
        {/* Assessments Section */}
        <div className="border-b last:border-b-0">
          <button
            className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
              openSection === 12
                ? "text-blue-50 bg-gradient-to-r from-indigo-800 to-[#2865e0]"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => handleToggleSection(12)}
          >
            <span className="flex items-center font-bold pl-2">
              {sections2[1].title}
            </span>
            {openSection === 12 ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <AnimatePresence>
            {openSection === 12 && (
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
                      index={12}
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
                          Content for {sections2[1].title} is not available yet.
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
