import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(async (config) => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });

  return config;
});