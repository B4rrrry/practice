import { Link } from "react-router";
import NavLink from "../NavLink/NavLink";

const NavMenu = () => {
  return (
    <div className="flex flex-col ">
      <NavLink to="/" className=" ml-auto mr-auto mb-[10px]">
        Home
      </NavLink>

      <NavLink to="/products" className="m-auto  mb-[10px]">
        Products
      </NavLink>

      <NavLink to="/products/create" className="m-auto  mb-[10px]">
        Create Product
      </NavLink>
      <NavLink to="/products/edit" className="m-auto  mb-[10px]">
        Edit Product
      </NavLink>
      <NavLink to="/favorites" className=" ml-auto mr-auto ">
        Favorites
      </NavLink>
    </div>
  );
};
export default NavMenu;
