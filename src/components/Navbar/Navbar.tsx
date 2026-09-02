import type { FC } from 'react';
import NavMenu from '../NavMenu/NavMenu';

export interface NavbarProps {
  className?: string
}

const Navbar : FC<NavbarProps> = (props) => {
  const {className} = props;
  return <div className={`h-screen w-[300px] bg-blue-300 pt-[30px] ${className}`}>
    <NavMenu />
  </div>;
};
export default Navbar;
