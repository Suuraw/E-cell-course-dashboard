import React from "react";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskBoxProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskBox({ task, onToggle, onDelete }: TaskBoxProps) {
  return (
    <div className="group flex items-center justify-between bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 hover:text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-gray-500" />
          )}
        </button>
        <span
          className={`text-gray-700 truncate ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
      </button>
    </div>
  );
}
