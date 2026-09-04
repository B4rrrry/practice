import { useMemo, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import TasksTable from "../../components/TasksTable/TasksTable";
import Title from "../../components/Title/Title";
import { tasks } from "../../mockData/tasks";
import type { TaskStatus } from "../../types/task";

type TaskFilter = "all" | TaskStatus;
type SortDirection = "asc" | "desc";

const TasksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLocaleLowerCase();

    return tasks
      .filter((task) => filter === "all" || task.status === filter)
      .filter(
        (task) =>
          !normalizedSearch ||
          task.title.toLocaleLowerCase().includes(normalizedSearch) ||
          task.assignee.toLocaleLowerCase().includes(normalizedSearch),
      )
      .toSorted((a, b) =>
        sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );
  }, [filter, searchValue, sortDirection]);

  return (
    <div>
      <Title className="mb-5">Tasks</Title>

      <div className="mb-3 flex">
        <div className="mr-5">
          <p className="text-xl font-bold mb-3">Search</p>
          <CustomSearch
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search..."
            className="mb-2.5 w-65"
          />
        </div>

        <div className="mr-5">
          <p className="text-xl font-bold mb-3">Filters</p>
          <div className="flex">
            <CustomButton onClick={() => setFilter("all")} className="mr-2.5">
              All
            </CustomButton>
            <CustomButton onClick={() => setFilter("todo")} className="mr-2.5">
              To do
            </CustomButton>
            <CustomButton
              onClick={() => setFilter("in-progress")}
              className="mr-2.5"
            >
              In progress
            </CustomButton>
            <CustomButton onClick={() => setFilter("done")}>
              Done
            </CustomButton>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold mb-3">Sort</p>
          <div className="flex">
            <CustomButton
              onClick={() => setSortDirection("asc")}
              className="mr-2.5"
            >
              A - Z
            </CustomButton>
            <CustomButton onClick={() => setSortDirection("desc")}>
              Z - A
            </CustomButton>
          </div>
        </div>
      </div>

      <TasksTable tasks={visibleTasks} />
    </div>
  );
};
export default TasksPage;
