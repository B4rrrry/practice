import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../api/users";
import type { User } from "../../types/user";
import CustomButton from "../CustomButton/CustomButton";
import Preloader from "../Preloader/Preloader";

const zodSchemaRegister = z.object({
  name: z.string().min(4, "Минимум 4 символа"),
  email: z.email({ error: "Некорректный email" }),
  password: z.string().min(5, "Минимум 5 символов"),
  role: z.enum(["user", "admin", "manager"]),
});

type RegisterUserValues = z.infer<typeof zodSchemaRegister>;

const RegisterUserForm = () => {
  const inputClass = "border rounded-sm p-2 w-full";
  const labelClass = "flex flex-col gap-1 mb-4 max-w-md";
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserValues>({
    resolver: zodResolver(zodSchemaRegister),
  });

  const mutationCreateUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      reset();
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit: SubmitHandler<RegisterUserValues> = (data) => {
    const newUser: Omit<User, "id"> = { ...data, status: "active" };
    mutationCreateUser.mutate(newUser);
  };

  return (
    <>
      {mutationCreateUser.isPending && <Preloader />}
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
          Password
          <input className={inputClass} {...register("password")} type="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <label className={labelClass}>
          Role
          <select className={inputClass} {...register("role")} defaultValue="user">
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p>{errors.role.message}</p>}
        </label>
        <CustomButton disabled={mutationCreateUser.isPending} type="submit">
          Register user
        </CustomButton>
        {mutationCreateUser.isSuccess && <p>Пользователь создан успешно!</p>}
        {mutationCreateUser.isError && (
          <p>Возникла ошибка: {mutationCreateUser.error.message}</p>
        )}
      </form>
    </>
  );
};

export default RegisterUserForm;
