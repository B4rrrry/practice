import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import NavMenu from "../NavMenu/NavMenu";
import { useMainStore } from "../../store/store";

const Sidebar = () => {
  const isShowSidebarInitValue = useMainStore((s) => s.isShowSidebar);
  const toggleSibebar = useMainStore((s) => s.toggleSidebar);

  const [showSidebar, setShowSidebar] = useState<boolean>(
    isShowSidebarInitValue,
  );

  const isShowSidebar = showSidebar ? "w-40" : "w-20";
  const onHide = () => {
    setShowSidebar((prev) => !prev);
    toggleSibebar(!showSidebar);
  };

  return (
    <div
      className={`${isShowSidebar} bg-gray-200 overflow-hidden transition-[width] duration-300 ease-in flex flex-col`}
    >
      <NavMenu />
      <CustomButton
        className="mt-auto mb-5 bg-gray-300 rounded-xl mr-auto ml-auto block  w-30"
        onClick={onHide}
      >
        Hide
      </CustomButton>
    </div>
  );
};
export default Sidebar;
