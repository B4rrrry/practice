import { Route, Routes } from "react-router";
import cls from "./AppRouter.module.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import TasksPage from "../../pages/TasksPage/TasksPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import UserPage from "../../pages/UserPage/UserPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const AppRouter = () => {
  return (
    <div className={cls.AppRouter}>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<DashboardPage />} />
          <Route element={<SettingsPage />} path="settings" />
          <Route element={<TasksPage />} path="tasks" />
          <Route element={<UsersPage />} path="users" />
          <Route element={<UserPage />} path="user/:id" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;
