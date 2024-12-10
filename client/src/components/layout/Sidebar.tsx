import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { menuItems, courseContents } from "../data/sidebarData";
import CourseUpdateDiaglogBox from "../dialogbox/CourseUpdate";
import ScheduleDialog from "../dialogbox/Schedule";
import Leaderboard from "../dialogbox/LeaderboardDialog";
import LoginDialog from "../dialogbox/Login";
interface SidebarProps {
  openSection: number | null;
  toggleSection: (index: number) => void;
  updateLoginStatus:(status: boolean) => void;
  login:boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ openSection, toggleSection,updateLoginStatus,login }) => {
  const [courseUpdateBtn, updateCourseBtn] = useState(false);
  const [scheduleBtn, updateScheduleBtn] = useState(false);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [isOpen,setOpenClose]=useState(false);
  const handleClickForCourseUpdate = () => {
    updateCourseBtn((prev) => !prev);
  };
  const handleClickForSchedule = () => {
    updateScheduleBtn((prev) => !prev);
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <aside className="bg-gray-100 h-full border-r border-gray-200 flex flex-col ">
      <div className="p-4 flex-shrink-0">
        <Button className="w-full mb-4 mt-5 bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors"
         onClick={()=>setOpenClose((prev)=>!prev)}>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
            className="mr-2"
          />
          Login as Admin
        </Button>
        {isOpen&&<LoginDialog
        setOpenClose={setOpenClose}
        updateLoginStatus={updateLoginStatus}
        login={login}
        />}
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <nav className="p-4 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center  p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors">
              <span className="text-xl p-1 rounded-md bg-white shadow-sm">
                {menuItems[0].icon}
              </span>
              <button
                className="text-sm font-semibold"
                onClick={handleClickForCourseUpdate}
              >
                {menuItems[0].label}
              </button>
              <CourseUpdateDiaglogBox
                courseUpdateBtn={courseUpdateBtn}
                updateCourseBtn={updateCourseBtn}
              />
            </div>
            <div className="flex items-center  p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors">
              <span className="text-xl p-1 rounded-md bg-white shadow-sm">
                {menuItems[1].icon}
              </span>
              <button
                className="text-sm font-semibold"
                onClick={handleClickForSchedule}
              >
                {menuItems[1].label}
              </button>
              <ScheduleDialog
                scheduleBtn={scheduleBtn}
                updateScheduleBtn={updateScheduleBtn}
              />
            </div>
            <div>
              <div className="flex items-center  p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors">
                <span className="text-xl p-1 rounded-md bg-white shadow-sm">
                  {menuItems[2].icon}
                </span>
                <button
                  className="text-sm font-semibold"
                  onClick={handleToggleModal}
                >
                  {menuItems[2].label}
                </button>
                <Leaderboard
                  isModelOpen={isModelOpen}
                  setIsModelOpen={setIsModalOpen}
                />
              </div>
            </div>
            <div className="flex items-center  p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors" onClick={()=>toggleSection(6)}>
              <span className="text-xl p-1 rounded-md bg-white shadow-sm">
                {menuItems[3].icon}
              </span>
              <button className="text-sm font-semibold">
                {menuItems[3].label}
              </button>
            </div>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">
              Course Contents
            </h3>
            <div className="space-y-1 mb-12">
              {courseContents.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center ">
                    <span className="text-lg bg-white p-1 rounded-md shadow-sm">
                      {content.icon}
                    </span>
                    <button className="text-sm font-semibold">
                      {content.label}
                    </button>
                  </div>
                  {openSection === index ? (
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
