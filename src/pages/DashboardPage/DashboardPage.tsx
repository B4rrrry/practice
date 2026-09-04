import KPICard from "../../components/KPICard/KPICard";
import Title from "../../components/Title/Title";

const DashboardPage = () => {
  return (
    <div>
      <Title className="mb-3.5 ">Dashboard Statistic</Title>
      <div className="flex">
        <KPICard
          KPIInfo={[{ title: "Users", value: 120 }]}
          className="mr-3.5"
        />
        <KPICard
          KPIInfo={[{ title: "Active users", value: 87 }]}
          className="mr-3.5"
        />
        <KPICard KPIInfo={[{ title: "Tasks", value: 43 }]} className="mr-3.5" />
        <KPICard KPIInfo={[{ title: "Completed tasks", value: 25 }]} />
      </div>
    </div>
  );
};
export default DashboardPage;
