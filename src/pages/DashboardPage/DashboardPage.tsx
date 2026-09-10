import { useQuery } from "@tanstack/react-query";
import KPICard from "../../components/KPICard/KPICard";
import Title from "../../components/Title/Title";
import { fetchStats } from "../../api/dashboard";
import Preloader from "../../components/Preloader/Preloader";
import type { Stats } from "../../types/stats";
import TasksTable from "../../components/TasksTable/TasksTable";
import { fetchLatestTasks } from "../../api/tasks";

const DashboardPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
  const {
    data: tasks,
    isPending: isPendingTasks,
    isError: isErrorTasks,
  } = useQuery({
    queryKey: ["tasksLatest"],
    queryFn: fetchLatestTasks,
  });
  console.log(tasks);
  return (
    <div>
      <Title className="mb-3.5 ">Dashboard Statistic</Title>
      {isPending && <Preloader />}
      {isError && <p className="font-bold text-3xl">Error</p>}
      <div className="flex gap-3.5">
        {data &&
          (Object.keys(data) as Array<keyof Stats>).map((key) => (
            <KPICard key={key} title={key} value={data[key]} />
          ))}
      </div>
      <Title className="mb-3.5 mt-3.5">Recent tasks</Title>
      {isPendingTasks && <Preloader />}
      {isErrorTasks && <p className="font-bold text-3xl">Error</p>}
      {tasks && <TasksTable tasks={tasks} />}
    </div>
  );
};
export default DashboardPage;
