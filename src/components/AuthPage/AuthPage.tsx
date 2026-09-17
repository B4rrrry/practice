import { useForm, type SubmitHandler } from "react-hook-form";
import cls from "./AuthPage.module.scss";
import { fetchUserByEmailPassword } from "../../api/users";

interface Input {
  fName: string;
  password: string;
}

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<Input>({
    defaultValues: {
      fName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log(data);
    const user = await fetchUserByEmailPassword(data.fName, data.password);
    if (user.length > 0) {
      console.log(user, "user");
      reset();
    }
  };

  return (
    <div className={cls.AuthPage}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          className="border w-fit mb-2.5 rounded-sm"
          {...register("fName", { required: "Email is required" })}
          aria-invalid={errors.fName ? true : false}
        />
        {errors.fName && <p>{errors.fName.message}</p>}
        <input
          className="border w-fit mb-2.5 rounded-sm"
          {...register("password", { required: "Password  is required" })}
          aria-invalid={errors.password ? true : false}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
        <input
          type="submit"
          value="Send"
          disabled={isDirty ? false : true}
          className="bg-gray-300 p-1 rounded-sm w-30"
        />
      </form>
    </div>
  );
};
export default AuthPage;
