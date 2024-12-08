import React from "react";
interface CourseUpdateProps {
  courseUpdateBtn:boolean
  updateCourseBtn: React.Dispatch<React.SetStateAction<boolean>>;
}
const CourseUpdateDiaglogBox:React.FC<CourseUpdateProps>=({courseUpdateBtn,updateCourseBtn})=> {




  return (
    <>
      {/* Dialog box */}
      {courseUpdateBtn && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 "
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
        >
          <div className="bg-white rounded-lg shadow-lg md:w-4/6 ">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-2xl  font-semibold text-gray-800">Course Updates</h3>
              <button
                onClick={()=>updateCourseBtn((prev)=>!prev)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none  text-3xl"
              >
                &times; {/* Cross button */}
              </button>
            </div>
            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {/* Content goes here */}
            
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CourseUpdateDiaglogBox;
