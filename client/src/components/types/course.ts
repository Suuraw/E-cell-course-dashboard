export interface TaskItem {
  name: string;
  link: string;
}

export interface Task {
  title: string;
  items: TaskItem[];
}

export interface Section {
  title: string;
  icon: string;
}

export interface WeekData {
  day: string;
  description: string;
  tasks: Task[];
}