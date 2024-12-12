import React,{useEffect,useState} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Placeholder } from "./Placeholder";
import CourseNav from "./CourseNav";
import { sections } from "../data/courseData";
import axios from "axios";
const API_URL="http://localhost:3000/api/weekData";
interface DashboardProps {
  openSection: number | null;
  toggleSection: (index: number) => void;
  login:boolean;
  editState:boolean;
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
export const Dashboard: React.FC<DashboardProps> = ({ openSection, toggleSection, login,editState,updateEditState }) => {
  const [data, setData] = useState<{ weekData: DayData[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
       
        setData(response.data.weekData);
      } catch (error) {
        alert("ERROR");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border rounded-lg overflow-hidden">
        {sections.map((section, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
                openSection === index
                  ? "text-blue-600 bg-blue-50"
                  : "text-black hover:bg-gray-100"
              }`}
              onClick={() => toggleSection(index)}
            >
              <span className="flex items-center font-bold pl-2">
                {section.title}
              </span>
              {openSection === index ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            <AnimatePresence>
              {openSection === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-gray-100 bg-white p-4">
                    <div className="overflow-x-auto sm:overflow-x-hidden">
                      <CourseNav login={login} 
                      editState={editState}
                      updateEditState={updateEditState}
                      />
                      {index === 0 ? (
                        data &&
                        data.weekData.map((day, idx) => (
                          <Placeholder
                            key={idx}
                            day={day.day}
                            description={day.description}
                            tasks={day.tasks}
                          />
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Content for {section.title} is not available yet.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
