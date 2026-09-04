export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  status: "active" | "blocked";
};
