import { useNavigate, useParams } from "react-router";
import Title from "../../components/Title/Title";
import CustomButton from "../../components/CustomButton/CustomButton";
import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../api/users";
import Preloader from "../../components/Preloader/Preloader";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: id ? () => fetchUserById(id) : skipToken,
  });

  return (
    <div>
      {isPending && <Preloader />}
      {isError && <p className="font-bold text-3xl">Error</p>}
      {data && (
        <>
          <Title className="mb-5">Users Name <span className="font-light">{data.name}</span></Title>
          <p className="text-3xl font-bold mb-3">Information</p>
          <div className="mb-4 flex">
            <p className="text-2xl font-bold mr-1">Email:</p>
            <p className="text-2xl ">{data.email}</p>
          </div>
          <div className="mb-4 flex">
            <p className="text-2xl font-bold mr-1">Role:</p>
            <p className="text-2xl ">{data.role}</p>
          </div>
          <div className="mb-4 flex">
            <p className="text-2xl font-bold mr-1">Status:</p>
            <p className="text-2xl ">{data.status}</p>
          </div>
        </>
      )}
      <CustomButton onClick={() => navigate(-1)}>Back to Users</CustomButton>
    </div>
  );
};
export default UserPage;
