import type { FC } from "react";

interface KPICardProps {
  title: string;
  value: number;
  className?: string;
}

const KPICard: FC<KPICardProps> = (props) => {
  const { title, value, className } = props;
  return (
    <div className={className}>
      <div className="flex p-3 rounded-xl bg-gray-200 w-fit" key={title}>
        <p className="text-xl ">{title}:</p>
        <p className="text-xl ">{value}</p>
      </div>
    </div>
  );
};
export default KPICard;
