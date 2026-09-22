import { useState, type FC } from "react";
import type { User } from "../../types/user";

import cls from "./UsersTable.module.scss";
import CustomLink from "../CustomLink/CustomLink";
import CustomButton from "../CustomButton/CustomButton";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/users";
import Preloader from "../Preloader/Preloader";

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<null | User>(null);
  const modalContainer = document.getElementById("modal-root");

  const onCloseHandler = () => {
    setIsShowModal((prev) => !prev);
    modalContainer!.style.display = "none";
    setSelectedDeleteUser(null);
  };

  const queryClient = useQueryClient();
  const mutationUserDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <div className={cls.wrapper}>
      <table data-testid="users-table" className={cls.table}>
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
            <tr key={user.id} data-testid="table-row">
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
                  <CustomLink to={`/users/${user.id}/edit`}>Edit</CustomLink>
                  <CustomButton
                    onClick={() => {
                      setIsShowModal(true);
                      setSelectedDeleteUser(user);
                    }}
                  >
                    Delete
                  </CustomButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowModal && (
        <Modal
          className={"w-150 bg-gray-300 p-10 rounded-2xl "}
          setIsShow={setIsShowModal}
        >
          <Title className="mb-4">Удаление пользователя</Title>
          <p className="mb-2.5">
            Вы действительно хотите удалить пользователя
            <span className="text-xl font-bold">{selectedDeleteUser?.name}</span>?
          </p>
          <div className="flex">
            <CustomButton
              disabled={mutationUserDelete.isPending}
              className="mr-4"
              onClick={() => {mutationUserDelete.mutate(selectedDeleteUser!)}}
            >
              Delete
            </CustomButton>
            <CustomButton
              disabled={mutationUserDelete.isPending}
              onClick={onCloseHandler}
            >
              Close
            </CustomButton>
            {mutationUserDelete.isPending && <Preloader />}
            {mutationUserDelete.isSuccess && <p>Пользователь успешно удален!</p>}
            {mutationUserDelete.isError && <p>Пользователь не был удален, возникла ошибка.</p>}
          </div>
        </Modal>
      )}
      {users.length === 0 && <p className={cls.empty}>No users found</p>}
    </div>
  );
};

export default UsersTable;
