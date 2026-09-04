import { Route, Routes } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import TasksPage from "../../pages/TasksPage/TasksPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import UserPage from "../../pages/UserPage/UserPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import TaskPage from "../../pages/TaskPage/TaskPage";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<DashboardPage />} />
          <Route element={<TasksPage />} path="tasks" />
          <Route element={<TaskPage />} path="tasks/:id" />
          <Route element={<UsersPage />} path="users" />
          <Route element={<UserPage />} path="users/:id" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;
