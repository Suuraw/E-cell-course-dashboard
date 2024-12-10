import React from 'react';
interface CourseNavProps{
  login:boolean;
}
const CourseNav: React.FC<CourseNavProps> = ({login}) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center space-x-8 rounded-t-lg ">
      <div className="font-bold ">WEEK 1</div>
      <div className="flex-1 flex justify-around">
      <div className="font-semibold">WHAT'S IN THERE</div>
        <div className="font-semibold">TASK 1</div>
        <div className="font-semibold">TASK 2</div>
        <div className="font-semibold">TASK 3</div>
      </div>
      {login&&<button>✏️</button>}
    </nav>
  );
};

export default CourseNav;