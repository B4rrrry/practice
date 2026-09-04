import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import NavMenu from "../NavMenu/NavMenu";
import cls from "./Sidebar.module.scss";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const isShowSidebar = showSidebar ? "w-40" : "w-20";
  const onHide = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div
      className={`${cls.Sidebar} ${isShowSidebar} bg-gray-200 overflow-hidden transition-[width]  duration-300 ease-in flex flex-col`}
    >
      <NavMenu />
      <CustomButton className="mt-auto mb-5 bg-gray-300 rounded-xl mr-auto ml-auto block  w-30" onClick={onHide}>Hide</CustomButton>
    </div>
  );
};
export default Sidebar;
