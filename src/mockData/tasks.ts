import type { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Prepare monthly report",
    assignee: "Alex Morgan",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Update user documentation",
    assignee: "Emma Wilson",
    priority: "medium",
    status: "todo",
  },
  {
    id: "3",
    title: "Fix dashboard layout",
    assignee: "Daniel Kim",
    priority: "high",
    status: "done",
  },
  {
    id: "4",
    title: "Review access permissions",
    assignee: "Sophia Brown",
    priority: "low",
    status: "todo",
  },
];
