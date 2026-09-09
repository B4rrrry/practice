import { useNavigate, useParams } from "react-router";
import CustomButton from "../../components/CustomButton/CustomButton";
import Title from "../../components/Title/Title";

import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "../../api/tasks";
import Preloader from "../../components/Preloader/Preloader";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: task,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: id ? () => fetchTaskById(id) : skipToken,
  });

  if (!task && !isPending) {
    return (
      <div>
        <Title className="mb-5">Task not found</Title>
        <CustomButton onClick={() => navigate("/tasks")}>
          Back to Tasks
        </CustomButton>
      </div>
    );
  }

  return (
    <div>
      {isPending && <Preloader />}
      {isError && <p className="font-bold text-3xl">Error</p>}
      {task && (
        <>
          <Title className="mb-5">
            Task <span className="font-light">{task.title}</span>
          </Title>
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
            <p className="text-2xl capitalize">
              {task.status.replace("-", " ")}
            </p>
          </div>
        </>
      )}
      <CustomButton onClick={() => navigate("/tasks")}>
        Back to Tasks
      </CustomButton>
    </div>
  );
};

export default TaskPage;
