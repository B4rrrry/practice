import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, className } = props;
  return (
    <button
      {...props}
      className={`${className} bg-gray-300 p-2 rounded-sm text-white hover:bg-black  transition  duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
