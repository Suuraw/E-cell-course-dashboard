import React, { useState } from "react";
import { TaskBox, Task } from "./Taskbox";
import { Plus } from "lucide-react";

function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete project documentation", completed: false },
    { id: "2", title: "Review pull requests", completed: true },
    { id: "3", title: "Plan next sprint", completed: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleToggle = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
      };
      setTasks([newTask, ...tasks]);
      setNewTaskTitle("");
    }
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </form>

        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="space-x-4">
            <span>{activeTasks} active tasks</span>
            <span>{completedTasks} completed</span>
          </div>
          {completedTasks > 0 && (
            <button
              onClick={handleClearCompleted}
              className="text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              Clear completed
            </button>
          )}
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskBox
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tasks yet. Add one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
