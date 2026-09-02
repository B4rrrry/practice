import type { FC } from 'react';
import cls from './NavLink.module.scss';
import { Link } from 'react-router';

export interface NavLinkProps {
  children: React.ReactNode
  className?: string
  to: string
}

const NavLink : FC<NavLinkProps> = (props) => {
  const {children, className, to} = props;
  return <Link className={`${cls.NavLink} ${className} text-white text-xl font-bold`} to={to}>{children}</Link>;
};
export default NavLink;
