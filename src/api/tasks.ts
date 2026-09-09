

import type { Task } from "../types/task";
import { api } from "./apiConfig";

export const fetchTasks = async () => {
  const {data} = await api.get<Task[]>('/tasks').then(res => res);

  return data;
}

export const fetchTaskById = async (id: string) => {
  const {data} = await api.get<Task>(`/tasks/${id}`).then(res => res);

  return data;
}