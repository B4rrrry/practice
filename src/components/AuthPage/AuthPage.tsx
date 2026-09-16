import { useForm, type SubmitHandler } from "react-hook-form";
import cls from "./AuthPage.module.scss";

interface Input {
  fName: string;
  password: string;
}

const AuthPage = () => {
  const { register, handleSubmit, formState:{errors, isDirty} } = useForm<Input>({
    defaultValues:{
      fName:'kek',
      password:'lol'
    },
  });

  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <div className={cls.AuthPage}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input className="border w-fit mb-2.5 rounded-sm" {...register("fName",{required:"Email vvedi daun"})} aria-invalid={errors.fName ? true : false  } />
        {errors.fName && <p>{errors.fName.message}</p>}
        <input className="border w-fit mb-2.5 rounded-sm"  {...register("password",{required:'Password  is required'})} aria-invalid={errors.password ? true : false  } />
        {errors.password && <p role="alert">{errors.password.message}</p>}
        <input type="submit" value="Send" disabled={isDirty ? false : true} className="bg-gray-300 p-1 rounded-sm w-30"/>
      </form>
      
    </div>
  );
};
export default AuthPage;
