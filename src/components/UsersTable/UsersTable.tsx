  import type { FC } from "react";
import type { User } from "../../types/user";

import cls from "./UsersTable.module.scss";
import CustomLink from "../CustomLink/CustomLink";

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  return (
    <div className={cls.wrapper}>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th className={cls.actionsHeading}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={cls.user}>
                  <span className={cls.avatar} aria-hidden="true">
                    {user.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className={cls.name}>{user.name}</span>
                </div>
              </td>
              <td className={cls.email}>{user.email}</td>
              <td className={cls.role}>{user.role}</td>
              <td>
                <span className={`${cls.status} ${cls[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <div className={cls.actions}>
                  <CustomLink to={`/users/${user.id}`}>View</CustomLink>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && <p className={cls.empty}>No users found</p>}
    </div>
  );
};

export default UsersTable;
