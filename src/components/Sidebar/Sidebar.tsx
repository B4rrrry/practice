import NavMenu from "../NavMenu/NavMenu";
import cls from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={`${cls.Sidebar} w-40 bg-gray-200 `}>
      <NavMenu />
    </div>
  );
};
export default Sidebar;
