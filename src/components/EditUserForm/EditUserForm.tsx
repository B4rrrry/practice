import { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUser, fetchUsers } from "../../api/users";
import CustomButton from "../CustomButton/CustomButton";
import Preloader from "../Preloader/Preloader";

const zodSchemaEdit = z.object({
  name: z.string().min(4, "Минимум 4 символа"),
  email: z.email({ error: "Некорректный email" }),
  role: z.enum(["user", "admin", "manager"]),
  status: z.enum(["active", "blocked"]),
});

type EditUserValues = z.infer<typeof zodSchemaEdit>;

const EditUserForm = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const inputClass = "border rounded-sm p-2 w-full";
  const labelClass = "flex flex-col gap-1 mb-4 max-w-md";
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserValues>({
    resolver: zodResolver(zodSchemaEdit),
  });

  const { isPending, data: users, error, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const selectedUser = users?.find((user) => user.id === selectedUserId);

  const mutateEditUser = useMutation({
    mutationFn: editUser,
    onSuccess: (updatedUser) => {
      reset({
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    const user = users?.find((item) => item.id === userId);

    setSelectedUserId(userId || null);
    mutateEditUser.reset();

    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  };

  const onSubmit: SubmitHandler<EditUserValues> = (formData) => {
    if (!selectedUserId) return;
    mutateEditUser.mutate({ id: selectedUserId, newUser: formData });
  };

  return (
    <>
      {isPending && <Preloader />}
      {!isPending && (
        <label className={labelClass}>
          User
          <select
            className={inputClass}
            value={selectedUserId ?? ""}
            onChange={handleSelectUser}
          >
            <option value="" disabled>
              Выберите пользователя
            </option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.email}
              </option>
            ))}
          </select>
        </label>
      )}
      {isError && (
        <p>При получении пользователей возникла ошибка: {error.message}</p>
      )}
      {selectedUser && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={labelClass}>
            Name
            <input className={inputClass} {...register("name")} type="text" />
            {errors.name && <p>{errors.name.message}</p>}
          </label>
          <label className={labelClass}>
            Email
            <input className={inputClass} {...register("email")} type="email" />
            {errors.email && <p>{errors.email.message}</p>}
          </label>
          <label className={labelClass}>
            Role
            <select className={inputClass} {...register("role")}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
          </label>
          <label className={labelClass}>
            Status
            <select className={inputClass} {...register("status")}>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            {errors.status && <p>{errors.status.message}</p>}
          </label>
          <CustomButton disabled={mutateEditUser.isPending} type="submit">
            Edit user
          </CustomButton>
          {mutateEditUser.isError && <p>{mutateEditUser.error.message}</p>}
          {mutateEditUser.isSuccess && <p>Пользователь отредактирован</p>}
        </form>
      )}
    </>
  );
};

export default EditUserForm;
