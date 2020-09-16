export interface TaskRecord {
  [P: string]: Task;
}

export interface Task {
  taskId: string;
  taskName: string;
}
