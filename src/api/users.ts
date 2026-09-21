import type { User } from "../types/user";
import { api } from "./apiConfig";

export const fetchUsers = async () => {
  const { data } = await api.get<User[]>("/users").then((res) => res);

  return data;
};

export const fetchUserById = async (id: string) => {
  const { data } = await api.get<User>(`/users/${id}`).then((res) => res);

  return data;
};

export const fetchUserByEmailPassword = async (
  email: string,
  password: string,
) => {
  const { data } = await api
    .get<User[]>(`/users/`, {
      params: {
        email,
        password,
      },
    })
    .then((res) => res);

  return data;
};

export const createUser = async (newUser: Omit<User, "id">) => {
  const { data } = await api.post<User>("/users", newUser);

  return data;
};

export const editUser = async ({
  id,
  newUser,
}: {
  id: string;
  newUser: Omit<User, "id">;
}) => {
  const { data } = await api.patch<User>(`/users/${id}`, newUser);

  return data;
};
