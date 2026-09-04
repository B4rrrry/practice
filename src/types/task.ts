export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
};
