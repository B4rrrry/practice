import type { User } from "../types/user";

export const users: User[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "manager",
    status: "active",
  },
  {
    id: "3",
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    role: "user",
    status: "blocked",
  },
  {
    id: "4",
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    role: "manager",
    status: "blocked",
  },
];
