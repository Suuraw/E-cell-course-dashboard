import React, { useState } from 'react';

const CourseAnnouncement: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);

  const cross = <img width="25" height="25" src="https://img.icons8.com/windows/50/cancel.png" alt="cancel" />;

  const handleClose = () => {
    setIsMounted(false);
  };

  return (
    isMounted && (
      <div className="bg-[#cff4fc] p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold mb-2 text-[#0F4C52]">E-Cell:</h2>
          <button 
            onClick={handleClose}
            className="hover:opacity-75 transition-opacity"
          >
            {cross}
          </button>
        </div>
        <p className="text-[#0F4C52] text-sm leading-7 mb-6">
          Dear Learners,<br />
          Get ready to embark on an exciting journey into Consulting, Economics, and Product and Business Analytics! Start with the Week 1 tab for daily tasks. Each week includes 5 days of Learning, followed by 2 days for quizzes and assignments. Check the Schedule tab for the course timelines. Leaderboard rankings will be updated weekly. Join the discord server for all the updates and discussions. Happy learning.
        </p>
      </div>
    )
  );
}

export default CourseAnnouncement;