import type { FC } from "react";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const Title: FC<TitleProps> = (props) => {
  const { className, children } = props;
  return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
};
export default Title;
