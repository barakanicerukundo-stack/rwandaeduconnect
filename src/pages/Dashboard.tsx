import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import FreeDashboard from "./FreeDashboard";
import PremiumDashboard from "./PremiumDashboard";

const Dashboard = () => {
  const { profile, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAdmin) return <Navigate to="/admin" replace />;

  if (profile?.account_type === "premium") return <PremiumDashboard />;
  return <FreeDashboard />;
};

export default Dashboard;
