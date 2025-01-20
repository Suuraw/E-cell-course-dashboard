import React from 'react';

interface Task {
  name: string;
  topics: { name: string; link: string }[];
}

interface PlaceholderProps {
  day: string;
  description: string;
  tasks: Task[];
}

export const Placeholder: React.FC<PlaceholderProps> = ({ day, description, tasks }) => {
  return (
    <div>
      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
            <span className="font-bold">Description</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
            <span className="font-bold">Resources</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm">Some Resources</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
            <span className="font-bold">Tasks</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm">
              {/* Currently only using the first item of the array for testing
                Use entire array in prod
              */}
              {tasks[0].topics.map((topic, index) => (
                <div key={index}>
                  <a 
                  href={topic.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-800'
                  >
                  {topic.name}
                  </a>
                </div>
              ))}
            </p>
          </div>
        </div>
        <hr className='mt-4'/>
        <p className='px-1 mt-2 text-[0.85rem] font-semibold'>Due By: 24th Jan</p>
      </div>
    </div>
  );
};
