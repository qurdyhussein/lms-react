import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = "purple" }) => {
  const bg = {
    purple: "from-purple-600 to-fuchsia-600",
    green: "from-green-600 to-emerald-600",
    rose: "from-rose-600 to-pink-600",
  }[color];

  return (
    <div className={`bg-gradient-to-r ${bg} text-white rounded-lg shadow-md p-4 hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon && <div className="text-3xl opacity-70">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;