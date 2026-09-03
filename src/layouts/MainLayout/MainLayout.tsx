import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-2.5 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
