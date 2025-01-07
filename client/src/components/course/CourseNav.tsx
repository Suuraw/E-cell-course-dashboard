import React from 'react';
import WeeklyForm from '../dialogboxAndForms/WeekDataForm';
import { Pencil } from 'lucide-react'

interface CourseNavProps {
  login: boolean;
  editState: boolean;
  updateEditState: (newState: boolean) => void;
  index:number;

}

const CourseNav: React.FC<CourseNavProps> = ({ login, editState, updateEditState,index }) => {
  var endpoint=`week${index+1}`
  return (
    <>
    {editState===true?<WeeklyForm
    updateEditState={updateEditState}
    editState={editState}
    endpoint={endpoint}
    />:null}
    <nav className="bg-blue-600 text-white p-4 flex items-center space-x-8 rounded-t-lg">
      <div className="font-bold">WEEK {index+1}</div>
      <div className="flex-1 flex justify-around">
        <div className="font-semibold">WHAT'S IN THERE</div>
        <div className="font-semibold">TASK 1</div>
        <div className="font-semibold">TASK 2</div>
        <div className="font-semibold">TASK 3</div>
      </div>
      {login && (
        <button onClick={() => updateEditState(!editState)}><Pencil className="w-5 h-4" /></button>
      )}
    </nav>
    </>
  );
};

export default CourseNav;
