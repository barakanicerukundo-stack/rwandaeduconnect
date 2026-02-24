import type { UserRole } from "@/types";
import DashboardSidebar from "./DashboardSidebar";

interface Props {
  role: UserRole;
  userName: string;
  children: React.ReactNode;
}

const DashboardLayout = ({ role, userName, children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={role} userName={userName} />
      <main className="flex-1 bg-background overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
