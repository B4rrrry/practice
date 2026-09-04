import { useNavigate, useParams } from "react-router";
import CustomButton from "../../components/CustomButton/CustomButton";
import Title from "../../components/Title/Title";
import { tasks } from "../../mockData/tasks";
import cls from "./TaskPage.module.scss";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return (
      <div className={cls.TaskPage}>
        <Title className="mb-5">Task not found</Title>
        <CustomButton onClick={() => navigate("/tasks")}>
          Back to Tasks
        </CustomButton>
      </div>
    );
  }

  return (
    <div className={cls.TaskPage}>
      <Title className="mb-5">{task.title}</Title>
      <p className="text-3xl font-bold mb-3">Information</p>
      <div className="mb-4 flex">
        <p className="text-2xl font-bold mr-1">Assignee:</p>
        <p className="text-2xl">{task.assignee}</p>
      </div>
      <div className="mb-4 flex">
        <p className="text-2xl font-bold mr-1">Priority:</p>
        <p className="text-2xl capitalize">{task.priority}</p>
      </div>
      <div className="mb-4 flex">
        <p className="text-2xl font-bold mr-1">Status:</p>
        <p className="text-2xl capitalize">{task.status.replace("-", " ")}</p>
      </div>
      <CustomButton onClick={() => navigate("/tasks")}>
        Back to Tasks
      </CustomButton>
    </div>
  );
};

export default TaskPage;
