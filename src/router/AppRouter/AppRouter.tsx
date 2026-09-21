import { Route, Routes } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import TasksPage from "../../pages/TasksPage/TasksPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import UserPage from "../../pages/UserPage/UserPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import TaskPage from "../../pages/TaskPage/TaskPage";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";
import AuthPage from "../../pages/AuthPage/AuthPage";
import RegisterUserPage from "../../pages/RegisterUserPage/RegisterUserPage";
import EditUserPage from "../../pages/EditUserPage/EditUserPage";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<DashboardPage />} />
          <Route element={<TasksPage />} path="tasks" />
          <Route
            element={
              <ErrorBoundary fallback={"Errorr"}>
                <TaskPage />
              </ErrorBoundary>
            }
            path="tasks/:id"
          />
          <Route element={<UsersPage />} path="users" />
          <Route element={<RegisterUserPage />} path="users/register" />
          <Route element={<EditUserPage />} path="users/edit" />
          <Route element={<EditUserPage />} path="users/:id/edit" />
          <Route element={<UserPage />} path="users/:id" />
          <Route element={<AuthPage />} path="auth" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;
