import React from 'react';

interface Task {
  name: string;
  topics: { name: string; link: string }[];
}
interface Resource {
  name: string;
  topics: { name: string; link: string }[];
}

interface PlaceholderProps {
  day: string;
  description: string;
  tasks: Task[];
  resources:Resource[];
  dueDate:string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ description, tasks,resources ,dueDate}) => {
  console.log(resources)
  return (
    <div>
      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0 ml-1 text-center md:text-left">
            <span className="font-bold ">Description</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm font-semibold">{description}</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0 text-center md:text-left">
            <span className="font-bold">Resources</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <div className="text-sm">
            {resources[0].topics.map((topic, index) => (
                <div key={index}>
                  <a 
                  href={topic.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-800 font-semibold'
                  >
                  {topic.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0 text-center md:text-left">
            <span className="font-bold">Tasks</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <div className="text-sm">
              {/* Currently only using the first item of the array for testing
                Use entire array in prod
              */}
              {tasks[0].topics.map((topic, index) => (
                <div key={index}>
                  <a 
                  href={topic.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-800 ml-1 font-semibold'
                  >
                  {topic.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className='mt-4'/>
        <p className='px-1 mt-3 ml-1 text-[0.85rem] font-semibold'>Due By: {dueDate}</p>
      </div>
    </div>
  );
};
