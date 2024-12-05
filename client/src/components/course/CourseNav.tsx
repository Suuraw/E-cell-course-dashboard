import React from 'react';

const CourseNav: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center space-x-8 rounded-t-lg">
      <div className="font-bold">WEEK 1</div>
      <div className="font-semibold">WHAT'S IN THERE</div>
      <div className="flex-1 flex justify-around">
        <div className="font-semibold">TASK 1</div>
        <div className="font-semibold">TASK 2</div>
        <div className="font-semibold">TASK 3</div>
      </div>
    </nav>
  );
};

export default CourseNav;