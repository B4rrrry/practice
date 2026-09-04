import type { ButtonHTMLAttributes, FC } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode
}

const CustomButton : FC<CustomButtonProps> = ({children, ...props}) => {

  return <button {...props} className={`p-2.5 bg-gray-200 rounded-l cursor-pointer ${props.className}`}>{children}</button>;
};
export default CustomButton;
