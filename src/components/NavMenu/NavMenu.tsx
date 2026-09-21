import CustomLink from "../CustomLink/CustomLink";

const NavMenu = () => {
  return (
    <div className="flex flex-col ml-2 mt-2">
      <CustomLink to="/" className="mb-2.5">
        Dashboard
      </CustomLink>
      <CustomLink to="/users" className="mb-2.5">
        Users
      </CustomLink>
      <CustomLink to="/users/register" className="mb-2.5">
        Register user
      </CustomLink>
      <CustomLink to="/users/edit" className="mb-2.5">
        Edit user
      </CustomLink>
      <CustomLink to="/tasks" className="mb-2.5">
        Tasks
      </CustomLink>
      <CustomLink to="/auth" className="mb-2.5">
        Auth
      </CustomLink>
    </div>
  );
};
export default NavMenu;
