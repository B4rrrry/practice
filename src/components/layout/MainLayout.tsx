import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="p-[15px] h-screen w-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
