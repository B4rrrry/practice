import type { FC } from "react";

interface KPICardProps {
  KPIInfo: { title: string; value: number }[];
  className?: string;
}

const KPICard: FC<KPICardProps> = (props) => {
  const { KPIInfo, className } = props;
  return (
    <div className={className}>
      {KPIInfo.map((kpi) => (
        <div className="flex p-3 rounded-xl bg-gray-200 w-fit" key={kpi.title}>
          <p className="text-xl ">{kpi.title}:</p>
          <p className="text-xl ">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};
export default KPICard;
