import React from 'react';
import { Task } from '../types/course';

interface PlaceholderProps {
  day: string;
  description: string;
  tasks: Task[];
}

export const Placeholder: React.FC<PlaceholderProps> = ({ day, description, tasks }) => {
  return (
    <div className="border border-gray-300 rounded-lg my-4 p-4">
      <div className="flex flex-col md:flex-row my-4">
        <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
          <span className="font-bold">{day}</span>
        </div>
        <div className="w-full md:w-60 md:pl-10 mb-4 md:mb-0">
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap">
          {tasks.map((task, index) => (
            <div key={index} className="w-full md:flex-1">
              {task.items.map((item, idx) => (
                <div key={idx} className="mx-2 md:pl-10 mb-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};