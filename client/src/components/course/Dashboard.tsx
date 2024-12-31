import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import {Placeholder} from "./Placeholder"; // Assumes you have a Placeholder component
import { getWeek1Data, getWeek2Data, getWeek3Data, getWeek4Data, getWeek5Data, getCapstoneProjects, getAssessments } from "../api/dataApi";

interface Task {
  title: string;
  description: string;
}

interface DayData {
  day: string;
  description: string;
  tasks: Task[];
}

interface CapstoneProject {
  id: number;
  title: string;
}

interface Assessment {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [weeks, setWeeks] = useState<{ [key: string]: { weekData: DayData[] } | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const [capstoneProjects, setCapstoneProjects] = useState<CapstoneProject[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const [week1, week2, week3, week4, week5, projects, assessments] = await Promise.all([
        getWeek1Data(),
        getWeek2Data(),
        getWeek3Data(),
        getWeek4Data(),
        getWeek5Data(),
        getCapstoneProjects(),
        getAssessments(),
      ]);

      setWeeks({
        1: week1?.data || null,
        2: week2?.data || null,
        3: week3?.data || null,
        4: week4?.data || null,
        5: week5?.data || null,
      });
      setCapstoneProjects(projects?.data || []);
      setAssessments(assessments?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("ERROR: Unable to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {[1, 2, 3, 4, 5].map((weekIndex) => (
        <WeekSection
          key={weekIndex}
          index={weekIndex}
          title={`Week ${weekIndex}`}
          data={weeks[weekIndex]}
          openSection={openSection}
          toggleSection={handleToggleSection}
        />
      ))}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Capstone Projects</h2>
        {capstoneProjects.length > 0 ? (
          <ul>
            {capstoneProjects.map((project) => (
              <li key={project.id} className="mb-2">
                {project.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No capstone projects available.</p>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Assessments</h2>
        {assessments.length > 0 ? (
          <ul>
            {assessments.map((assessment) => (
              <li key={assessment.id} className="mb-2">
                {assessment.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No assessments available.</p>
        )}
      </div>
    </div>
  );
};

const WeekSection: React.FC<{
  index: number;
  title: string;
  data: { weekData: DayData[] } | null;
  openSection: number | null;
  toggleSection: (index: number) => void;
}> = ({ index, title, data, openSection, toggleSection }) => (
  <div className="border-b last:border-b-0">
    <button
      className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
        openSection === index
          ? "text-blue-600 bg-blue-50"
          : "text-black hover:bg-gray-100"
      }`}
      onClick={() => toggleSection(index)}
    >
      <span className="flex items-center font-bold pl-2">{title}</span>
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
              {data && data.weekData[0].description !== "" ? (
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
                  Content for {title} is not available yet.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Dashboard;
