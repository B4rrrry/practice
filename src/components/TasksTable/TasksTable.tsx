import type { FC } from "react";
import type { Task } from "../../types/task";
import CustomLink from "../CustomLink/CustomLink";
import cls from "./TasksTable.module.scss";

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable: FC<TasksTableProps> = ({ tasks }) => {
  return (
    <div className={cls.wrapper}>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignee</th>
            <th>Priority</th>
            <th>Status</th>
            <th className={cls.actionsHeading}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className={cls.title}>{task.title}</td>
              <td>{task.assignee}</td>
              <td>
                <span className={`${cls.badge} ${cls[task.priority]}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                <span
                  className={`${cls.badge} ${cls[task.status.replace("-", "")]}`}
                >
                  {task.status.replace("-", " ")}
                </span>
              </td>
              <td>
                <div className={cls.actions}>
                  <CustomLink to={`/tasks/${task.id}`}>View</CustomLink>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tasks.length === 0 && <p className={cls.empty}>No tasks found</p>}
    </div>
  );
};

export default TasksTable;
