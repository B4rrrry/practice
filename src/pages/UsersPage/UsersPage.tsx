import Title from "../../components/Title/Title";
import UsersTable from "../../components/UsersTable/UsersTable";
import { users } from "../../mockData/users";
import cls from "./UsersPage.module.scss";

const UsersPage = () => {
  return (
    <div className={cls.UsersPage}>
      <Title className="mb-5">Users</Title>
      <UsersTable users={users} />
    </div>
  );
};
export default UsersPage;
