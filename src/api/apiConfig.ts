import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000" });

// Искусственная задержка
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

api.interceptors.response.use(
  async (response) => {
    await delay(3000);
    return response;
  },
  async (error) => {
    await delay(3000);
    return Promise.reject(error);
  },
);
