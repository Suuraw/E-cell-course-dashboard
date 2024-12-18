import React from 'react';
import WeeklyForm from '../dialogbox/Form';

interface CourseNavProps {
  login: boolean;
  editState: boolean;
  updateEditState: (newState: boolean) => void;
  index:number;
}

const CourseNav1: React.FC<CourseNavProps> = ({ login, editState, updateEditState,index }) => {
  var endpoint=`week${index+1}`
//   console.log(endpoint)
  return (
    <>
    {editState===true?<WeeklyForm
    updateEditState={updateEditState}
    editState={editState}
    endpoint={endpoint}
    />:null}
    <nav className="bg-blue-600 text-white p-4 flex items-center space-x-8 rounded-t-lg">
      <div className="font-bold">LINK</div>
      <div className="flex-1 flex justify-around">
        <div className="font-semibold">DEADLINE</div>
        <div className="font-semibold">INSTRUCTION</div>
      </div>
      {login && (
        <button onClick={() => updateEditState(!editState)}>✏️</button>
      )}
    </nav>
    </>
  );
};

export default CourseNav1;
