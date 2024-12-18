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
  index:number;
}
