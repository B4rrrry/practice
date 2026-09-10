import type { Stats } from "../types/stats";
import { api } from "./apiConfig";

export const fetchStats = async () => {
  const { data } = await api.get<Stats>("/stats");
  return data;
};
