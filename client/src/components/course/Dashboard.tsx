import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Placeholder } from "./Placeholder";
import CourseNav from "./CourseNav";
import { sections, weekData } from '../data/courseData';

const Dashboard: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border rounded-lg overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border-b last:border-b-0"
          >
            <button
              className={` flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
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
                    <div className="overflow-y-auto">
                      <CourseNav />
                      {index === 0 ? (
                        weekData.map((day, idx) => (
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

export default Dashboard;