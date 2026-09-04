import { useNavigate, useParams } from "react-router";
import Title from "../../components/Title/Title";
import CustomButton from "../../components/CustomButton/CustomButton";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  return (
    <div>
      <Title className="mb-5">Users Name{id}</Title>
      <p className="text-3xl font-bold mb-3">Information</p>
      <div className="mb-4 flex">
        <p className="text-2xl font-bold mr-1">Email:</p>
        <p className="text-2xl ">Email:</p>
      </div>
      <div className="mb-4 flex">
        <p className="text-2xl font-bold mr-1">Role:</p>
        <p className="text-2xl ">Role:</p>
      </div>
      <div className="mb-4 flex">
        <p className="text-2xl font-bold mr-1">Status:</p>
        <p className="text-2xl ">Status:</p>
      </div>
      <CustomButton onClick={() => navigate(-1)}>Back to Users</CustomButton>
    </div>
  );
};
export default UserPage;
