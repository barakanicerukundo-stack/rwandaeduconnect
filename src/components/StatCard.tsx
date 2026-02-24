import { TrendingUp } from "lucide-react";

interface Props {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent";
}

const variantStyles = {
  default: "bg-card border",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

const StatCard = ({ label, value, change, icon, variant = "default" }: Props) => {
  return (
    <div className={`rounded-xl p-5 shadow-sm transition-transform hover:scale-[1.02] ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${variant === "default" ? "text-muted-foreground" : "opacity-80"}`}>
            {label}
          </p>
          <p className="text-2xl font-display font-bold mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              {change}
            </div>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${variant === "default" ? "bg-muted" : "bg-white/10"}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
